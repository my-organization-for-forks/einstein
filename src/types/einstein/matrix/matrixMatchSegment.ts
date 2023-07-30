import { Point } from '../point/Point';
import { Matrix } from './Matrix';

// Match unit interval to line segment p->q
export function matrixMatchSegment(p: Point, q: Point): Matrix {
  return [q.x - p.x, p.y - q.y, p.x, q.y - p.y, q.x - p.x, p.y];
}
