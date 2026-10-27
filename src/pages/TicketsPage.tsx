import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Header, Footer } from '../components/Layout';
import { TICKET_GROUPS, isImagePath, isPdfPath, ticketUrl } from '../data/tickets';

export function TicketsPage() {
  const { t, i18n } = useTranslation();
  const zh = i18n.language.startsWith('zh');
  const [openId, setOpenId] = useState<string | null>(TICKET_GROUPS[0]?.id ?? null);
  const [pdfId, setPdfId] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8 pb-28 sm:px-6 md:pb-10">
        <h1 className="font-serif text-3xl font-bold text-ink">{t('tickets.title')}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-light/80">{t('tickets.subtitle')}</p>

        <div className="mt-6 space-y-3">
          {TICKET_GROUPS.map((group) => {
            const open = openId === group.id;
            return (
              <section key={group.id} className="overflow-hidden rounded-xl border border-washi-dark bg-surface">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : group.id)}
                  aria-expanded={open}
                  className="flex min-h-11 w-full items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <span>
                    <span className="font-serif text-lg font-bold text-ink">{zh ? group.zh : group.en}</span>
                    <span className="mt-0.5 block text-xs text-ink-light/70">{zh ? group.blurbZh : group.blurbEn}</span>
                  </span>
                  <span className="shrink-0 text-xs text-ink-light/60">{open ? t('board.hide') : t('board.show')}</span>
                </button>
                {open && (
                  <div className="space-y-3 border-t border-washi-dark px-4 py-4">
                    {(group.entryEn || group.entryZh) && (
                      <p className="rounded-lg border border-gold/50 bg-gold/15 px-3 py-3 text-sm leading-relaxed text-ink">
                        {zh ? group.entryZh : group.entryEn}
                      </p>
                    )}
                    {group.files.length > 0 && (
                  <ul className="space-y-3">
                    {group.files.map((file) => {
                      const href = ticketUrl(file.path);
                      const name = zh ? file.zh : file.en;
                      const pdfOpen = pdfId === file.id;
                      return (
                        <li key={file.id} className="rounded-lg border border-washi-dark bg-washi/40 p-3">
                          <p className="font-medium text-ink">{name}</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {isPdfPath(file.path) && (
                              <button
                                type="button"
                                onClick={() => setPdfId(pdfOpen ? null : file.id)}
                                className="min-h-9 rounded-md border border-washi-dark bg-surface px-3 text-xs font-medium text-ink"
                              >
                                {t('tickets.view')}
                              </button>
                            )}
                            <a
                              href={href}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex min-h-9 items-center rounded-md border border-washi-dark bg-surface px-3 text-xs font-medium text-ink"
                            >
                              {t('tickets.openTab')}
                            </a>
                            <a
                              href={href}
                              download
                              className="inline-flex min-h-9 items-center rounded-md bg-indigo px-3 text-xs font-medium text-white"
                            >
                              {t('tickets.download')}
                            </a>
                          </div>
                          {isImagePath(file.path) && (
                            <a href={href} target="_blank" rel="noreferrer">
                              <img src={href} alt={name} className="mt-3 max-h-[70vh] w-full rounded-lg object-contain" />
                            </a>
                          )}
                          {isPdfPath(file.path) && pdfOpen && (
                            <iframe title={name} src={href} className="mt-3 h-[70vh] w-full rounded-lg border border-washi-dark bg-white" />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                    )}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
