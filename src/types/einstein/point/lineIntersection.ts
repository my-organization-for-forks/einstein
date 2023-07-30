import { Point } from './Point';

export function lineIntersection(
  p1: Point,
  q1: Point,
  p2: Point,
  q2: Point
): Point {
  const d = (q2.y - p2.y) * (q1.x - p1.x) - (q2.x - p2.x) * (q1.y - p1.y);
  const uA =
    ((q2.x - p2.x) * (p1.y - p2.y) - (q2.y - p2.y) * (p1.x - p2.x)) / d;
  return { x: p1.x + uA * (q1.x - p1.x), y: p1.y + uA * (q1.y - p1.y) };
}
