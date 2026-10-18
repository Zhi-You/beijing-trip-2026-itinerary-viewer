import { useTranslation } from 'react-i18next';
import type { BookingItem, DayPlan } from '../types/itinerary';
import { getDayNumberFromId } from '../utils/tripDay';
import { CollapsibleSection } from './CollapsibleSection';

interface BookingChecklistProps {
  items: BookingItem[];
  days: DayPlan[];
}

const PHASES: BookingItem['phase'][] = ['now', 'release', 'later', 'dayof'];

const PHASE_TITLE: Record<BookingItem['phase'], string> = {
  now: 'bookings.phaseNow',
  release: 'bookings.phaseRelease',
  later: 'bookings.phaseLater',
  dayof: 'bookings.phaseDayof',
};

const PHASE_HINT: Record<BookingItem['phase'], string> = {
  now: 'bookings.phaseNowHint',
  release: 'bookings.phaseReleaseHint',
  later: 'bookings.phaseLaterHint',
  dayof: 'bookings.phaseDayofHint',
};

function hostnameOf(href: string): string {
  try {
    return new URL(href).hostname.replace(/^www\./, '');
  } catch {
    return href;
  }
}

function faviconSrc(href: string): string | undefined {
  try {
    return `https://www.google.com/s2/favicons?domain=${new URL(href).hostname}&sz=32`;
  } catch {
    return undefined;
  }
}

export function BookingChecklist({ items, days }: BookingChecklistProps) {
  const { t } = useTranslation();

  const dayLabel = (item: BookingItem) =>
    (item.dayIds ?? [])
      .map((id) => {
        const day = days.find((d) => d.id === id);
        const n = getDayNumberFromId(id);
        if (!day || n === null) return null;
        return `${t('labels.dayNumber', { n })} · ${day.weekday} ${day.date}`;
      })
      .filter((label): label is string => Boolean(label))
      .join(' · ');

  return (
    <CollapsibleSection
      id="bookings"
      title={t('bookings.title')}
      subtitle={t('bookings.subtitle')}
      className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10"
    >
      <div className="overflow-x-auto rounded-lg border border-washi-dark">
        <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-washi-dark bg-surface">
              <th className="w-[13rem] px-3 py-2.5 font-semibold text-ink">{t('bookings.colWhen')}</th>
              <th className="w-[11rem] px-3 py-2.5 font-semibold text-ink">{t('bookings.colDay')}</th>
              <th className="w-[16rem] px-3 py-2.5 font-semibold text-ink">{t('bookings.colTicket')}</th>
              <th className="px-3 py-2.5 font-semibold text-ink">{t('bookings.colDetail')}</th>
            </tr>
          </thead>
          <tbody>
            {PHASES.map((phase) => {
              const rows = items.filter((item) => item.phase === phase);
              if (rows.length === 0) return null;
              return (
                <PhaseRows
                  key={phase}
                  rows={rows}
                  dayLabel={dayLabel}
                  title={t(PHASE_TITLE[phase])}
                  hint={t(PHASE_HINT[phase])}
                  nextLabel={t('bookings.next')}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </CollapsibleSection>
  );
}

function PhaseRows({
  rows,
  dayLabel,
  title,
  hint,
  nextLabel,
}: {
  rows: BookingItem[];
  dayLabel: (item: BookingItem) => string;
  title: string;
  hint: string;
  nextLabel: string;
}) {
  return (
    <>
      <tr className="border-b border-washi-dark bg-indigo/10">
        <td colSpan={4} className="px-3 py-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo">{title}</p>
          <p className="text-xs text-ink-light/70">{hint}</p>
        </td>
      </tr>
      {rows.map((item) => {
        const icon = item.link ? faviconSrc(item.link) : undefined;
        return (
          <tr
            key={item.id}
            className={`border-b border-washi-dark last:border-b-0 ${
              item.next ? 'bg-gold/15' : 'bg-surface'
            }`}
          >
            <td className={`px-3 py-3 align-top font-semibold text-ink ${item.next ? 'border-l-4 border-vermillion' : ''}`}>
              {item.next && (
                <span className="mb-1 inline-block rounded-full bg-vermillion px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  {nextLabel}
                </span>
              )}
              <p className={item.next ? 'mt-1' : ''}>{item.when}</p>
            </td>
            <td className="px-3 py-3 align-top text-ink">{dayLabel(item) || '—'}</td>
            <td className="px-3 py-3 align-top font-medium text-ink">{item.what}</td>
            <td className="px-3 py-3 align-top text-ink-light">
              <p className="leading-relaxed">{item.notes}</p>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-indigo hover:underline"
                >
                  {icon && (
                    <img src={icon} alt="" width={16} height={16} className="h-4 w-4 shrink-0 rounded-sm" />
                  )}
                  <span>{item.linkLabel ?? hostnameOf(item.link)}</span>
                </a>
              )}
            </td>
          </tr>
        );
      })}
    </>
  );
}
