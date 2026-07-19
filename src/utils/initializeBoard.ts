import type { DayPlan } from '../types/itinerary';
import type { BoardState, DayBoard, TimelineCard } from '../types/board';
import { createFlightTimelineCard, getDefaultFlightCardIds, mergeFlightTimelineCards } from './flightBoard';

function createPokemonCenterCard(day: DayPlan): TimelineCard | null {
  if (!day.pokemonCenter) return null;
  const id = `${day.id}-pokemon-center`;
  return {
    id,
    kind: 'pokemon-center',
    pokemonCenter: day.pokemonCenter,
  };
}

function findPokemonCenterInsertIndex(day: DayPlan, dayBoard: DayBoard): number {
  const flightIds = getDefaultFlightCardIds(day);
  for (let i = flightIds.length - 1; i >= 0; i -= 1) {
    const idx = dayBoard.cardIds.indexOf(flightIds[i]!);
    if (idx >= 0) return idx + 1;
  }

  const firstPlaceId = day.places[0]?.id;
  if (firstPlaceId) {
    const placeIdx = dayBoard.cardIds.indexOf(firstPlaceId);
    if (placeIdx >= 0) return placeIdx;
  }

  return 0;
}

/** Ensure Pokemon Center card matches itinerary; strip invalid meal schedules. */
export function repairDayBoard(day: DayPlan, dayBoard: DayBoard): void {
  const pcId = `${day.id}-pokemon-center`;
  const removed = new Set(dayBoard.removedCardIds ?? []);

  if (day.pokemonCenter) {
    dayBoard.cards[pcId] = createPokemonCenterCard(day)!;

    if (!dayBoard.cardIds.includes(pcId) && !removed.has(pcId)) {
      const insertIndex = findPokemonCenterInsertIndex(day, dayBoard);
      dayBoard.cardIds.splice(insertIndex, 0, pcId);
    }
  } else if (dayBoard.cards[pcId] || dayBoard.cardIds.includes(pcId)) {
    const { [pcId]: _removed, ...cards } = dayBoard.cards;
    const { [pcId]: _note, ...notes } = dayBoard.notes;
    dayBoard.cards = cards;
    dayBoard.notes = notes;
    dayBoard.cardIds = dayBoard.cardIds.filter((id) => id !== pcId);
  }

  mergeFlightTimelineCards(day, dayBoard);

  for (const id of Object.keys(dayBoard.cards)) {
    const card = dayBoard.cards[id];
    if (!card) continue;
    if (card.kind === 'meal' || card.kind === 'custom-meal') {
      if (card.schedule) {
        const { schedule: _removed, ...rest } = card;
        dayBoard.cards[id] = rest as TimelineCard;
      }
    }
  }
}

export function repairBoardState(state: BoardState, days: DayPlan[]): BoardState {
  const next: BoardState = {
    version: state.version,
    days: {},
  };

  for (const day of days) {
    const dayBoard = state.days[day.id] ?? initializeDayBoard(day);
    next.days[day.id] = {
      ...dayBoard,
      cardIds: [...dayBoard.cardIds],
      cards: { ...dayBoard.cards },
      notes: { ...dayBoard.notes },
      removedCardIds: [...(dayBoard.removedCardIds ?? [])],
    };
    repairDayBoard(day, next.days[day.id]);
  }

  return next;
}

export function initializeDayBoard(day: DayPlan): DayBoard {
  const cards: Record<string, TimelineCard> = {};
  const cardIds: string[] = [];

  const flightCards = (day.flightTimeline ?? []).map((item) => createFlightTimelineCard(item));

  const pushCard = (card: TimelineCard) => {
    cards[card.id] = card;
    cardIds.push(card.id);
  };

  const addFlightCards = () => {
    for (const card of flightCards) pushCard(card);
  };

  const addPlaceCards = () => {
    for (const place of day.places) {
      pushCard({ id: place.id, kind: 'place', place });
    }
  };

  const pcCard = createPokemonCenterCard(day);

  if (day.flightTimelineAfterPlaces) {
    addPlaceCards();
    addFlightCards();
  } else {
    addFlightCards();
    if (pcCard) pushCard(pcCard);
    addPlaceCards();
  }

  day.food.forEach((meal, index) => {
    const id = `${day.id}-meal-${index}`;
    pushCard({ id, kind: 'meal', meal });
  });

  return { dayId: day.id, cardIds, cards, notes: {}, removedCardIds: [] };
}

export function initializeBoardState(days: DayPlan[]): BoardState {
  const boardDays: Record<string, DayBoard> = {};
  for (const day of days) {
    boardDays[day.id] = initializeDayBoard(day);
  }
  return { version: 1, days: boardDays };
}

function insertIdAfterAnchor(cardIds: string[], id: string, anchorId: string | null): void {
  if (cardIds.includes(id)) return;
  if (anchorId) {
    const anchorIdx = cardIds.indexOf(anchorId);
    if (anchorIdx >= 0) {
      cardIds.splice(anchorIdx + 1, 0, id);
      return;
    }
  }
  cardIds.push(id);
}

/**
 * Merge a saved customize board with the current itinerary.
 * - Preserves card order, custom cards, notes, schedules, and user deletions
 * - Always refreshes place/meal/pokemon content from itinerary (source of truth)
 * - Inserts new itinerary stops only if the user has not previously deleted them
 */
export function mergeBoardWithDefaults(
  saved: BoardState,
  defaultDays: DayPlan[],
): BoardState {
  const merged = initializeBoardState(defaultDays);

  for (const day of defaultDays) {
    const savedDay = saved.days[day.id];
    if (!savedDay) continue;

    const defaultDay = merged.days[day.id];
    const fresh = initializeDayBoard(day);
    const removed = new Set(savedDay.removedCardIds ?? []);
    const itineraryPlaceIds = new Set(day.places.map((p) => p.id));
    const itineraryMealIds = new Set(day.food.map((_, index) => `${day.id}-meal-${index}`));
    const pcId = day.pokemonCenter ? `${day.id}-pokemon-center` : null;

    // Start from saved order, drop stale itinerary place/meal cards that no longer exist
    const cardIds = savedDay.cardIds.filter((id) => {
      if (removed.has(id)) return false;
      const card = savedDay.cards[id] ?? fresh.cards[id];
      if (!card) return false;
      if (card.kind === 'place') return itineraryPlaceIds.has(id);
      if (card.kind === 'meal') return itineraryMealIds.has(id);
      if (card.kind === 'pokemon-center') return Boolean(pcId);
      return true;
    });

    const cards: Record<string, TimelineCard> = {};

    // Keep custom / flight / airport cards from saved (with fallback to fresh)
    for (const id of Object.keys(savedDay.cards)) {
      const savedCard = savedDay.cards[id]!;
      if (savedCard.kind === 'place' || savedCard.kind === 'meal' || savedCard.kind === 'pokemon-center') {
        continue;
      }
      if (removed.has(id)) continue;
      cards[id] = savedCard;
    }

    // Refresh canonical itinerary cards; preserve per-card schedule overrides
    for (const place of day.places) {
      const savedCard = savedDay.cards[place.id];
      cards[place.id] = {
        id: place.id,
        kind: 'place',
        place,
        ...(savedCard?.schedule ? { schedule: savedCard.schedule } : {}),
      };
    }

    day.food.forEach((meal, index) => {
      const id = `${day.id}-meal-${index}`;
      const savedCard = savedDay.cards[id];
      cards[id] = {
        id,
        kind: 'meal',
        meal,
        ...(savedCard?.schedule ? { schedule: savedCard.schedule } : {}),
      };
    });

    if (pcId && fresh.cards[pcId]) {
      const savedCard = savedDay.cards[pcId];
      cards[pcId] = {
        ...fresh.cards[pcId],
        ...(savedCard?.schedule ? { schedule: savedCard.schedule } : {}),
      };
    }

    // Insert missing itinerary places only if not user-deleted
    let previousPlaceId: string | null = null;
    for (const place of day.places) {
      if (!removed.has(place.id)) {
        insertIdAfterAnchor(cardIds, place.id, previousPlaceId);
      }
      if (cardIds.includes(place.id)) previousPlaceId = place.id;
    }

    if (pcId && !removed.has(pcId)) {
      const firstPlaceId = day.places.find((p) => cardIds.includes(p.id))?.id ?? null;
      const insertBefore = firstPlaceId ? cardIds.indexOf(firstPlaceId) : -1;
      if (!cardIds.includes(pcId)) {
        if (insertBefore >= 0) cardIds.splice(insertBefore, 0, pcId);
        else cardIds.push(pcId);
      }
    }

    // Insert missing meals only if not user-deleted
    let previousMealId: string | null =
      [...cardIds].reverse().find((id) => cards[id]?.kind === 'meal') ?? null;
    day.food.forEach((_, index) => {
      const id = `${day.id}-meal-${index}`;
      if (removed.has(id)) return;
      if (!cardIds.includes(id)) {
        insertIdAfterAnchor(cardIds, id, previousMealId);
      }
      previousMealId = id;
    });

    // Bring in any fresh flight/airport cards not present in saved
    for (const id of fresh.cardIds) {
      const freshCard = fresh.cards[id];
      if (!freshCard) continue;
      if (freshCard.kind !== 'flight' && freshCard.kind !== 'airport-process') continue;
      if (removed.has(id)) continue;
      if (!cards[id]) cards[id] = freshCard;
      if (!cardIds.includes(id)) {
        const freshIdx = fresh.cardIds.indexOf(id);
        const beforeId = fresh.cardIds.slice(0, freshIdx).reverse().find((fid) => cardIds.includes(fid));
        insertIdAfterAnchor(cardIds, id, beforeId ?? null);
      }
    }

    // Drop card payloads for ids that stay removed (keeps storage tidy)
    for (const id of removed) {
      delete cards[id];
    }

    defaultDay.cardIds = cardIds.length > 0 ? cardIds : [...fresh.cardIds.filter((id) => !removed.has(id))];
    defaultDay.cards = Object.keys(cards).length > 0 ? cards : { ...fresh.cards };
    defaultDay.notes = savedDay.notes ?? {};
    defaultDay.removedCardIds = [...removed];

    // If filtering removed everything useful, fall back to a fresh day board but keep notes + removals
    if (defaultDay.cardIds.length === 0) {
      defaultDay.cardIds = fresh.cardIds.filter((id) => !removed.has(id));
      defaultDay.cards = { ...fresh.cards };
      for (const id of removed) {
        delete defaultDay.cards[id];
      }
    }

    mergeFlightTimelineCards(day, defaultDay);
  }

  return repairBoardState(merged, defaultDays);
}
