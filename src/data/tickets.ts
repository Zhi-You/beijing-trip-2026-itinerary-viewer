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
    id: 'flight',
    en: 'Flights',
    zh: '机票',
    blurbEn: 'Singapore Airlines, booking DTVXGS. Out on 1 Nov, back on 9 Nov.',
    blurbZh: '新加坡航空，订单 DTVXGS。11月1日去，11月9日回。',
    files: [
      {
        id: 'flight-departure',
        path: 'tickets/Flight/departure.jpg',
        en: 'SQ 810 · SIN T3 00:30 → PKX 06:35 · Sun 1 Nov',
        zh: 'SQ 810 · 樟宜 T3 00:30 → 大兴 06:35 · 11月1日周日',
      },
      {
        id: 'flight-return',
        path: 'tickets/Flight/return.jpg',
        en: 'SQ 805 · PEK T3 08:45 → SIN 15:20 · Mon 9 Nov',
        zh: 'SQ 805 · 首都 T3 08:45 → 樟宜 15:20 · 11月9日周一',
      },
    ],
  },
  {
    id: 'train-tangshan',
    en: 'Trains · Tangshan',
    zh: '火车 · 唐山',
    blurbEn: 'Wed 4 Nov, 4 second-class seats each way. Out on G8807, back on G8826 to 北京站.',
    blurbZh: '11月4日周三，来回各 4 张二等座。去程 G8807，回程 G8826 到北京站。',
    files: [
      {
        id: 'train-to-tangshan',
        path: 'tickets/Train To TangShan/To.jpg',
        en: 'G8807 · 北京 12:36 → 唐山 13:40 · car 04 · waiting room 7',
        zh: 'G8807 · 北京 12:36 → 唐山 13:40 · 04 车 · 第七候车室',
      },
      {
        id: 'train-from-tangshan',
        path: 'tickets/Train To TangShan/From.jpg',
        en: 'G8826 · 唐山 21:35 → 北京 22:45 · car 03 · gate A11',
        zh: 'G8826 · 唐山 21:35 → 北京 22:45 · 03 车 · 检票口 A11',
      },
    ],
  },
  {
    id: 'hotel',
    en: 'Hotels',
    zh: '酒店',
    blurbEn: '汉庭 for 1–8 Nov, then 海友 for the night of 8 Nov. Each booking is two screenshots.',
    blurbZh: '11月1–8日住汉庭，8日晚转海友。每家酒店两张截图。',
    files: [
      {
        id: 'hanting-1',
        path: 'tickets/Hotel/hanting_1.jpg',
        en: '汉庭 · 1–8 Nov · 2 superior king rooms · check-in from 14:00',
        zh: '汉庭 · 11月1–8日 · 高级大床房 2 间 · 14:00 起入住',
      },
      {
        id: 'hanting-2',
        path: 'tickets/Hotel/hanting_2.jpg',
        en: '汉庭 · order details · Tang/Zhi You, Tang/Kiun Ching',
        zh: '汉庭 · 订单信息 · Tang/Zhi You、Tang/Kiun Ching',
      },
      {
        id: 'haiyou-1',
        path: 'tickets/Hotel/haiyou_1.jpg',
        en: '海友南法信 · 8–9 Nov · 2 queen rooms · check-in from 12:00',
        zh: '海友南法信 · 11月8–9日 · 大床房 2 间 · 12:00 起入住',
      },
      {
        id: 'haiyou-2',
        path: 'tickets/Hotel/haiyou_2.jpg',
        en: '海友南法信 · order details · Tang/Zhi You, Tang/Kiun Ching',
        zh: '海友南法信 · 订单信息 · Tang/Zhi You、Tang/Kiun Ching',
      },
    ],
  },
  {
    id: 'insurance',
    en: 'Insurance',
    zh: '保险',
    blurbEn: 'FWD policies, one PDF per pair.',
    blurbZh: 'FWD 保单，每对一份 PDF。',
    files: [
      {
        id: 'insurance-parents',
        path: 'tickets/Insurance/Beijing_FWD_Insurance_Mom&Dad.pdf',
        en: 'FWD · Mom & Dad',
        zh: 'FWD · 爸爸妈妈',
      },
      {
        id: 'insurance-pair',
        path: 'tickets/Insurance/Beijing_FWD_Insurance_Zy&Xy.pdf',
        en: 'FWD · Zy & Xy',
        zh: 'FWD · Zy & Xy',
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
