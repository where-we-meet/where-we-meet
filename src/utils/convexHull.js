function ccw(a, b, c) {
  return (b.lat - a.lat) * (c.lng - a.lng) - (c.lat - a.lat) * (b.lng - a.lng);
}

export default function convexHull(points) {
  // 가장 아래에 있는 점을 찾음
  const lowestPoint = points.reduce((lowest, point) => {
    return point.lng < lowest.lng ? point : lowest;
  });

  // lowestPoint를 기준으로 점들을 각도순으로 정렬
  points.sort((a, b) => {
    const angleA = Math.atan2(a.lng - lowestPoint.lng, a.lat - lowestPoint.lat);
    const angleB = Math.atan2(b.lng - lowestPoint.lng, b.lat - lowestPoint.lat);
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
