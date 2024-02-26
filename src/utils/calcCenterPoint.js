export default function calcCenterPoint(points) {
  let x = 0;
  let y = 0;
  let s = 0;

  if (points.length === 2) {
    const lat = (points[0].lat + points[1].lat) / 2;
    const lng = (points[0].lng + points[1].lng) / 2;
    return { lat, lng };
  }

  for (let i = 0; i < points.length; i++) {
    let j = (i + 1) % points.length;

    x += (points[i].lat + points[j].lat) * (points[i].lat * points[j].lng - points[j].lat * points[i].lng);
    y += (points[i].lng + points[j].lng) * (points[i].lat * points[j].lng - points[j].lat * points[i].lng);
    s += points[i].lat * points[j].lng - points[j].lat * points[i].lng;
  }
  s /= 2;
  x = x / (6 * s);
  y = y / (6 * s);
  return { lat: x, lng: y };
}
