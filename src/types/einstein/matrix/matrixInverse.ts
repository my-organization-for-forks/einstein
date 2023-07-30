import { Matrix } from './Matrix';

export function matrixInverse(t: Matrix): Matrix {
  const det = t[0] * t[4] - t[1] * t[3];
  return [
    t[4] / det,
    -t[1] / det,
    (t[1] * t[5] - t[2] * t[4]) / det,
    -t[3] / det,
    t[0] / det,
    (t[2] * t[3] - t[0] * t[5]) / det,
  ];
}
