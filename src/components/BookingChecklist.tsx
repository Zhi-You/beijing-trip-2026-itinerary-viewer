import { useTranslation } from 'react-i18next';
import type { BookingItem } from '../types/itinerary';
import { getDayNumberFromId } from '../utils/tripDay';
import { CollapsibleSection } from './CollapsibleSection';

interface BookingChecklistProps {
  items: BookingItem[];
}

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

export function BookingChecklist({ items }: BookingChecklistProps) {
  const { t } = useTranslation();

  return (
    <CollapsibleSection
      id="bookings"
      title={t('bookings.title')}
      className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10"
    >
      <div className="overflow-x-auto rounded-lg border border-washi-dark">
        <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-washi-dark">
              <th className="px-3 py-2.5 font-semibold text-ink">{t('bookings.colWhen')}</th>
              <th className="px-3 py-2.5 font-semibold text-ink">{t('bookings.colWhat')}</th>
              <th className="px-3 py-2.5 font-semibold text-ink">{t('bookings.colLink')}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const dayLabels = (item.dayIds ?? [])
                .map((id) => getDayNumberFromId(id))
                .filter((n): n is number => n !== null)
                .map((n) => t('labels.dayNumber', { n }));
              const icon = item.link ? faviconSrc(item.link) : undefined;

              return (
                <tr key={item.id} className="border-b border-washi-dark last:border-b-0">
                  <td className="max-w-[16rem] px-3 py-2.5 align-top text-ink">{item.when}</td>
                  <td className="px-3 py-2.5 align-top text-ink">
                    {dayLabels.length > 0 && (
                      <span className="font-medium">{dayLabels.join(' + ')} — </span>
                    )}
                    {item.what}
                  </td>
                  <td className="px-3 py-2.5 align-top">
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-indigo hover:underline"
                      >
                        {icon && (
                          <img src={icon} alt="" width={16} height={16} className="h-4 w-4 shrink-0 rounded-sm" />
                        )}
                        <span className="whitespace-nowrap">{item.linkLabel ?? hostnameOf(item.link)}</span>
                      </a>
                    ) : (
                      <span className="text-ink-light/50">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </CollapsibleSection>
  );
}
