import { Point } from '../point/Point';
import { Matrix } from './Matrix';

// Match unit interval to line segment p->q, assume |q->p| == 1
export function matrixMatchSegment(p: Point, q: Point): Matrix {
  // const d = pointSubtract(q, p);
  // const matRotate: Matrix = [d.x, -d.y, 0, d.y, d.x, 0];
  // const matTranslate = matrixTranslate(p.x, p.y);
  // return matrixMultiply(matTranslate, matRotate);
  return [q.x - p.x, p.y - q.y, p.x, q.y - p.y, q.x - p.x, p.y];
}
