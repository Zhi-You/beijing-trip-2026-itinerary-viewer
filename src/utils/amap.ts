import type { Coordinates } from '../data/locationCoordinates';

const PI = Math.PI;
const EARTH_A = 6378245.0;
const EE = 0.00669342162296594323;

function outOfChina(lng: number, lat: number): boolean {
  return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271;
}

function transformLat(lng: number, lat: number): number {
  let ret =
    -100.0 +
    2.0 * lng +
    3.0 * lat +
    0.2 * lat * lat +
    0.1 * lng * lat +
    0.2 * Math.sqrt(Math.abs(lng));
  ret += ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0) / 3.0;
  ret += ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) * 2.0) / 3.0;
  ret +=
    ((160.0 * Math.sin((lat / 12.0) * PI) + 320 * Math.sin((lat * PI) / 30.0)) * 2.0) / 3.0;
  return ret;
}

function transformLng(lng: number, lat: number): number {
  let ret =
    300.0 +
    lng +
    2.0 * lat +
    0.1 * lng * lng +
    0.1 * lng * lat +
    0.1 * Math.sqrt(Math.abs(lng));
  ret += ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0) / 3.0;
  ret += ((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) * 2.0) / 3.0;
  ret +=
    ((150.0 * Math.sin((lng / 12.0) * PI) + 300.0 * Math.sin((lng / 30.0) * PI)) * 2.0) / 3.0;
  return ret;
}

/**
 * Pins in this app are WGS-84, same as the OpenStreetMap view.
 * Amap navigation expects GCJ-02. Locations outside China are left unchanged.
 */
export function wgs84ToGcj02(coordinates: Coordinates): Coordinates {
  const { lng, lat } = coordinates;
  if (outOfChina(lng, lat)) return { lng, lat };

  let dLat = transformLat(lng - 105.0, lat - 35.0);
  let dLng = transformLng(lng - 105.0, lat - 35.0);
  const radLat = (lat / 180.0) * PI;
  let magic = Math.sin(radLat);
  magic = 1 - EE * magic * magic;
  const sqrtMagic = Math.sqrt(magic);
  dLat = (dLat * 180.0) / (((EARTH_A * (1 - EE)) / (magic * sqrtMagic)) * PI);
  dLng = (dLng * 180.0) / ((EARTH_A / sqrtMagic) * Math.cos(radLat) * PI);
  return { lat: lat + dLat, lng: lng + dLng };
}

function stopName(title: string, locationLabel?: string): string {
  if (locationLabel && locationLabel !== '—' && locationLabel !== title) {
    return `${title} ${locationLabel}`;
  }
  return title;
}

/** Turn-by-turn in Amap. On a phone with the app installed, the app opens. */
export function amapUrlForStop(
  coordinates: Coordinates | null | undefined,
  title: string,
  locationLabel?: string,
): string {
  const name = stopName(title, locationLabel);
  if (coordinates) {
    const gcj = wgs84ToGcj02(coordinates);
    const to = `${gcj.lng.toFixed(6)},${gcj.lat.toFixed(6)},${encodeURIComponent(name)}`;
    return `https://uri.amap.com/navigation?to=${to}&mode=car&src=beijing-trip&callnative=1`;
  }

  const keyword =
    locationLabel && locationLabel !== '—' ? `${title} ${locationLabel}` : `${title} 北京`;
  return `https://uri.amap.com/search?keyword=${encodeURIComponent(keyword)}&src=beijing-trip&callnative=1`;
}
