export interface Coordinates {
  lat: number;
  lng: number;
}

export const AIRPORT_COORDINATES: Record<string, Coordinates> = {
  SIN: { lat: 1.3644, lng: 103.9915 },
  PKX: { lat: 39.5098, lng: 116.4105 },
  PEK: { lat: 40.0799, lng: 116.6031 },
};

export const PLACE_COORDINATES: Record<string, Coordinates> = {
  'tiananmen-square': { lat: 39.9055, lng: 116.3976 },
  'mao-memorial': { lat: 39.9025, lng: 116.3974 },
  'forbidden-city': { lat: 39.9163, lng: 116.3972 },
  'jingshan-park': { lat: 39.9238, lng: 116.3969 },
  'temple-of-heaven': { lat: 39.8822, lng: 116.4066 },
  'national-museum': { lat: 39.9053, lng: 116.4014 },
  guozijian: { lat: 39.9465, lng: 116.4128 },
  'summer-palace': { lat: 39.9999, lng: 116.2755 },
  'mutianyu-great-wall': { lat: 40.4319, lng: 116.5704 },
  'beihai-park': { lat: 39.9244, lng: 116.3892 },
  'qianmen-street': { lat: 39.8977, lng: 116.3963 },
  'nanluoguxiang': { lat: 39.9375, lng: 116.4031 },
  'yonghegong': { lat: 39.9473, lng: 116.4175 },
  'xidan-joy-city': { lat: 39.9097, lng: 116.3738 },
  'zhongguancun-pokemon-gym': { lat: 39.9836, lng: 116.3135 },
  'wangjing-capitalmall': { lat: 39.9945, lng: 116.4738 },
  'beixinqiao': { lat: 39.9408, lng: 116.417 },
};

export const AREA_COORDINATES: Record<string, Coordinates> = {
  Beixinqiao: { lat: 39.9408, lng: 116.417 },
  '北新桥': { lat: 39.9408, lng: 116.417 },
  Dongcheng: { lat: 39.9289, lng: 116.4164 },
  Tiananmen: { lat: 39.9055, lng: 116.3976 },
  Qianmen: { lat: 39.8977, lng: 116.3963 },
  Tiantan: { lat: 39.8822, lng: 116.4066 },
  'Temple of Heaven': { lat: 39.8822, lng: 116.4066 },
  Jingshan: { lat: 39.9238, lng: 116.3969 },
  Guozijian: { lat: 39.9465, lng: 116.4128 },
  Nanluoguxiang: { lat: 39.9375, lng: 116.4031 },
  Gulou: { lat: 39.9403, lng: 116.3965 },
  Houhai: { lat: 39.9408, lng: 116.385 },
  Beihai: { lat: 39.9244, lng: 116.3892 },
  Haidian: { lat: 39.9599, lng: 116.298 },
  'Summer Palace': { lat: 39.9999, lng: 116.2755 },
  Mutianyu: { lat: 40.4319, lng: 116.5704 },
  Xidan: { lat: 39.9097, lng: 116.3738 },
  Zhongguancun: { lat: 39.9836, lng: 116.3135 },
  Wangjing: { lat: 39.9945, lng: 116.4738 },
  Guijie: { lat: 39.9405, lng: 116.422 },
  'Ghost Street': { lat: 39.9405, lng: 116.422 },
  Dongsi: { lat: 39.928, lng: 116.4175 },
  Andingmen: { lat: 39.949, lng: 116.403 },
  Sanlitun: { lat: 39.933, lng: 116.455 },
  PKX: { lat: 39.5098, lng: 116.4105 },
  PEK: { lat: 40.0799, lng: 116.6031 },
  Daxing: { lat: 39.5098, lng: 116.4105 },
};

export const VENUE_COORDINATES: Record<string, Coordinates> = {
  '陈记卤煮小肠 · 廊房二条店': { lat: 39.8965, lng: 116.3945 },
  'Chenji Luzhu Xiaochang': { lat: 39.8965, lng: 116.3945 },
  '沣元春饼馆 · 幸福大街店': { lat: 39.888, lng: 116.425 },
  '京东程记肉饼店': { lat: 39.889, lng: 116.424 },
  '味多美 · 天坛店': { lat: 39.8795, lng: 116.417 },
  '巧蜀娘私厨': { lat: 39.891, lng: 116.42 },
  '刘阿妹 · 重庆鸡公煲 · 北新桥店': { lat: 39.9385, lng: 116.4178 },
  '酸正正奶制品集合店 · 簋街店': { lat: 39.9408, lng: 116.4225 },
  '烘焙町面包店 · 北新桥总店': { lat: 39.941, lng: 116.4228 },
  '大兴胡同面茶': { lat: 39.937, lng: 116.41 },
  '郭通天宫院小吃 · 簋街店': { lat: 39.9412, lng: 116.422 },
  '穆羽斋清真包子铺': { lat: 39.935, lng: 116.42 },
  '池记串吧 · 鼓楼2店': { lat: 39.948, lng: 116.396 },
  '刘记炙子烤肉 · 虎坊桥店': { lat: 39.892, lng: 116.382 },
  '紫光园酸奶站 · 南锣鼓巷店': { lat: 39.9378, lng: 116.403 },
  '吴裕泰茶庄 · 北新桥总店': { lat: 39.9395, lng: 116.4172 },
  '七寻八找胡同菜 · 雍和宫店': { lat: 39.9455, lng: 116.416 },
  '鼎香润': { lat: 39.9485, lng: 116.378 },
  '三元梅园 · 地安门东大街店': { lat: 39.9335, lng: 116.396 },
  '茶饼斋 · 北新桥店': { lat: 39.9415, lng: 116.4165 },
  '茶饼斋 · 鼓楼店': { lat: 39.9405, lng: 116.3968 },
  '佬婆超级隆江猪脚饭': { lat: 39.941, lng: 116.422 },
  '恭敬李烤鸭 · 天坛路店': { lat: 39.881, lng: 116.405 },
  '仿膳茶社 · 宫廷糕点': { lat: 39.928, lng: 116.389 },
  '南门涮肉 · 后海店': { lat: 39.9415, lng: 116.3855 },
  '尹记门钉肉饼 · 天坛店': { lat: 39.878, lng: 116.408 },
  '京天红炸糕 · 东四十条店': { lat: 39.9338, lng: 116.42 },
  '贰柒松针包子': { lat: 39.922, lng: 116.417 },
  '无韵诗咖啡BlankVerse · 东四店': { lat: 39.924, lng: 116.417 },
  '晓莉肉饼 · 安定门店': { lat: 39.9485, lng: 116.4035 },
  '奇葩奶奶的烧鱼': { lat: 39.939, lng: 116.401 },
};

export const POKEMON_CENTER_COORDINATES: Record<string, Coordinates> = {
  'Pokemon Pop-up · Xidan Joy City': { lat: 39.9097, lng: 116.3738 },
  'Pokemon Relax Party · Xidan Joy City': { lat: 39.9097, lng: 116.3738 },
  'Pokemon Official TCG Gym · Zhongguancun': { lat: 39.9836, lng: 116.3135 },
  'Pokemon Pop-up · CapitaMall Wangjing': { lat: 39.9945, lng: 116.4738 },
  'Pokemon Pop-up · Longfor Paradise Walk': { lat: 39.923, lng: 116.518 },
  'Pokemon Official TCG Gym · Xihongmen (Onix)': { lat: 39.788, lng: 116.328 },
};

export function resolveAreaCoordinates(label?: string): Coordinates | null {
  if (!label?.trim()) return null;
  const exact = AREA_COORDINATES[label.trim()];
  if (exact) return exact;

  const lower = label.toLowerCase();
  for (const [key, coords] of Object.entries(AREA_COORDINATES)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      return coords;
    }
  }
  return null;
}

export function resolveVenueCoordinates(name?: string): Coordinates | null {
  if (!name?.trim()) return null;
  if (VENUE_COORDINATES[name]) return VENUE_COORDINATES[name];

  for (const [key, coords] of Object.entries(VENUE_COORDINATES)) {
    if (name.includes(key) || key.includes(name)) return coords;
  }
  return null;
}
