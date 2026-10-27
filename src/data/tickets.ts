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
  /** Shown as soon as the section is opened. Used when entry is a passport or a live code, not a saved file. */
  entryEn?: string;
  entryZh?: string;
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
  {
    id: 'summer-palace',
    en: 'Summer Palace',
    zh: '颐和园',
    blurbEn: 'Mon 2 Nov, 12:00–15:00. Two paid tickets. The other two use a passport.',
    blurbZh: '11月2日周一 12:00–15:00。两张付费票。另外两位凭护照。',
    entryEn:
      'Afternoon gate tickets, ¥40 for two full-price passport tickets. The QR below is for Ji Xinyu and Tang Zhi You. The other two are not on this order — they enter free with their passports. 佛香阁 and the other inner gardens are closed this Monday, so this is the gate ticket, not the through ticket.',
    entryZh:
      '下午场大门票，两张护照全价票共 ¥40。下面的二维码是 Ji Xinyu 和 Tang Zhi You 的。另外两位不在这一单上，凭护照免费进入。这个周一佛香阁等园中园关闭，所以买的是大门票，不是联票。',
    files: [
      {
        id: 'summer-palace-zy-xy',
        path: 'tickets/Summer Palace/zy&xy.jpg',
        en: 'Gate ticket · 2 Nov 12:00–15:00 · Ji Xinyu, Tang Zhi You',
        zh: '大门票 · 11月2日 12:00–15:00 · Ji Xinyu、Tang Zhi You',
      },
    ],
  },
  {
    id: 'tiananmen-flag',
    en: 'Tiananmen flag-raising',
    zh: '天安门升旗',
    blurbEn: 'Tue 3 Nov. No paper ticket — passport at 安检口 3.',
    blurbZh: '11月3日周二。没有纸质票 — 护照走 3 号安检口。',
    entryEn:
      'There is no ticket to show and no QR to save. All 4 enter with the passport on the reservation. Use 安检口 3 for the flag-raising.',
    entryZh: '不用出示门票，也没有二维码可存。4 人都凭预约上的护照进入。升旗走 3 号安检口。',
    files: [],
  },
  {
    id: 'forbidden-city',
    en: 'Forbidden City',
    zh: '故宫',
    blurbEn: 'Morning slot bought. Passport at 午门.',
    blurbZh: '上午场已买。护照从午门进。',
    entryEn:
      'The Tue 3 Nov morning slot is already bought for all 4. There is no paper ticket and no QR to screenshot. Bring the passports on the booking and enter at 午门. The morning slot is scanned by 12:00.',
    entryZh:
      '11月3日周二上午场，4 人已买好。没有纸质票，也不用截二维码。带订单上的护照，从午门进。上午场 12:00 前检票。',
    files: [],
  },
  {
    id: 'hetou-gate',
    en: '河头老街 gate',
    zh: '河头老街大门',
    blurbEn: 'Wed 4 Nov. Live QR from the mini program, at the gate.',
    blurbZh: '11月4日周三。门口用小程序的动态二维码。',
    entryEn:
      'Do not rely on a screenshot. On the day, open the 河头老街旅游 or 河头老街票务 mini program and show the live QR at the gate. A code saved earlier will not scan.',
    entryZh:
      '不要靠截图。当天打开微信小程序「河头老街旅游」或「河头老街票务」，在门口出示当时的动态二维码。提前保存的码刷不了。',
    files: [],
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
