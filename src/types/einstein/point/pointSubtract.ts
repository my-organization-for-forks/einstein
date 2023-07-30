import { Point } from './Point';

export function pointSubtract(p: Point, q: Point): Point {
  return { x: p.x - q.x, y: p.y - q.y };
}
