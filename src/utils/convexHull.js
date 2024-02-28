function ccw(a, b, c) {
  return (
    (b.location.lat - a.location.lat) * (c.location.lng - a.location.lng) -
    (c.location.lat - a.location.lat) * (b.location.lng - a.location.lng)
  );
}

export default function convexHull(points) {
  // 가장 아래에 있는 점을 찾음
  if (points.length <= 1) return;

  const lowestPoint = points.reduce((lowest, { location: point }) => {
    return point.lng < lowest.lng ? point : lowest;
  });

  // lowestPoint를 기준으로 점들을 각도순으로 정렬
  points.sort(({ location: a }, { location: b }) => {
    const angleA = Math.atan2(a.lng - lowestPoint.location.lng, a.lat - lowestPoint.location.lat);
    const angleB = Math.atan2(b.lng - lowestPoint.location.lng, b.lat - lowestPoint.location.lat);
    return angleA - angleB;
  });
  const stack = [points[0], points[1]];

  for (let i = 2; i < points.length; i++) {
    let top = stack.pop();
    while (ccw(stack[stack.length - 1], top, points[i]) <= 0) {
      top = stack.pop();
    }
    stack.push(top, points[i]);
  }
  return stack;
}
