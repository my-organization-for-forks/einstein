import { Matrix } from './Matrix';

export function matrixRotate(angle: number): Matrix {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [c, -s, 0, s, c, 0];
}
