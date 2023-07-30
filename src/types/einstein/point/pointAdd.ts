import { Point } from './Point';

export function pointAdd(p: Point, q: Point): Point {
  return { x: p.x + q.x, y: p.y + q.y };
}
