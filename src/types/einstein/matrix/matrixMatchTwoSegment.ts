import { Point } from '../point/Point';
import { Matrix } from './Matrix';
import { matrixInverse } from './matrixInverse';
import { matrixMatchSegment } from './matrixMatchSegment';
import { matrixMultiply } from './matrixMultiply';

// Match line segment p1->q1 to line segment p2->q2
export function matrixMatchTwoSegment(
  p1: Point,
  q1: Point,
  p2: Point,
  q2: Point
): Matrix {
  return matrixMultiply(
    matrixMatchSegment(p2, q2),
    matrixInverse(matrixMatchSegment(p1, q1))
  );
}
