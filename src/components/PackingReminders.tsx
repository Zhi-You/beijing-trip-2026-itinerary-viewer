import { useTranslation } from 'react-i18next';
import type { PackingReminder } from '../types/itinerary';

interface PackingRemindersProps {
  items: PackingReminder[];
}

export function PackingReminders({ items }: PackingRemindersProps) {
  const { t } = useTranslation();

  return (
    <section id="packing" className="border-y border-washi-dark bg-surface py-10 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">{t('nav.packing')}</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-light/70">{t('packing.subtitle')}</p>

        <ul className="mt-6 space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-gold/30 bg-gold/5 px-5 py-4 sm:px-6"
            >
              <p className="font-serif text-lg font-semibold text-ink">{item.item}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-light">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
