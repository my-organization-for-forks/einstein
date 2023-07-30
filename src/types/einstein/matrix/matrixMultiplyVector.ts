import { Point } from '../point/Point';
import { Matrix } from './Matrix';

export function matrixMultiplyVector(M: Matrix, P: Point): Point {
  return {
    x: M[0] * P.x + M[1] * P.y + M[2],
    y: M[3] * P.x + M[4] * P.y + M[5],
  };
}
