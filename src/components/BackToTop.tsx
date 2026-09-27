import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function BackToTop() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      }}
      aria-label={t('nav.backToTop')}
      title={t('nav.backToTop')}
      className="fixed right-3 z-40 flex h-8 w-8 items-center justify-center rounded-full border border-washi-dark bg-surface/95 text-ink shadow-md backdrop-blur-md bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:bottom-6 md:right-6 md:h-11 md:w-11"
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true">
        <path
          d="M5 12.5 10 7.5 15 12.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
