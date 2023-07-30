import { HR3 } from './HR3';
import { Point } from '../types/einstein/point/Point';

function hexPt(x: number, y: number): Point {
  return { x: x + 0.5 * y, y: HR3 * y };
}

export const HAT_OUTLINE = [
  hexPt(0, 0),
  hexPt(-1, -1),
  hexPt(0, -2),
  hexPt(2, -2),
  hexPt(2, -1),
  hexPt(4, -2),
  hexPt(5, -1),
  hexPt(4, 0),
  hexPt(3, 0),
  hexPt(2, 2),
  hexPt(0, 3),
  hexPt(0, 2),
  hexPt(-1, 2),
];
