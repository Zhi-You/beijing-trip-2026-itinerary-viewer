import { useTranslation } from 'react-i18next';

const base = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const NAV_ITEMS = [
  { href: `${base}#itinerary`, key: 'itinerary' as const },
  { href: `${base}#pokemon`, key: 'pokemon' as const },
  { href: `${base}day`, key: 'today' as const },
  { href: `${base}tickets`, key: 'tickets' as const },
];

export function MobileBottomNav() {
  const { t } = useTranslation();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-washi-dark/80 bg-washi/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="Section navigation"
    >
      <div className="grid grid-cols-4">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex min-h-11 items-center justify-center px-1 py-2 text-center text-[11px] font-medium leading-tight text-ink-light transition active:bg-vermillion/10 active:text-vermillion"
          >
            {t(`nav.${item.key}`)}
          </a>
        ))}
      </div>
    </nav>
  );
}
