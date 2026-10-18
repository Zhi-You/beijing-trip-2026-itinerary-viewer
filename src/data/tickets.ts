export interface TicketFile {
  id: string;
  /** Path under public/, with folder names as stored on disk. */
  path: string;
  en: string;
  zh: string;
}

export interface TicketGroup {
  id: string;
  en: string;
  zh: string;
  blurbEn: string;
  blurbZh: string;
  files: TicketFile[];
}

export const TICKET_GROUPS: TicketGroup[] = [
  {
    id: 'inbox',
    en: 'Your tickets',
    zh: '你的票据',
    blurbEn: 'Nothing is uploaded yet. The note below is only a marker for the folder.',
    blurbZh: '还没有上传票据。下面这份说明只是用来标出文件夹的位置。',
    files: [
      {
        id: 'placeholder',
        path: 'tickets/put-tickets-here.txt',
        en: 'Where to put ticket files',
        zh: '票据文件放哪里',
      },
    ],
  },
];

export function ticketUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return prefix + path.split('/').map((segment) => encodeURIComponent(segment)).join('/');
}

export function isImagePath(path: string): boolean {
  return /\.(png|jpe?g|webp|gif)$/i.test(path);
}

export function isPdfPath(path: string): boolean {
  return /\.pdf$/i.test(path);
}
