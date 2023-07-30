import { Matrix } from './Matrix';

export function matrixTranslate(tx: number, ty: number): Matrix {
  return [1, 0, tx, 0, 1, ty];
}
