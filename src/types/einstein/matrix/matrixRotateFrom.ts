import { Point } from '../point/Point';
import { matrixMultiply } from './matrixMultiply';
import { matrixRotate } from './matrixRotate';
import { matrixTranslate } from './matrixTranslate';

export function matrixRotateFrom(p: Point, angle: number) {
  return matrixMultiply(
    matrixTranslate(p.x, p.y),
    matrixMultiply(matrixRotate(angle), matrixTranslate(-p.x, -p.y))
  );
}
