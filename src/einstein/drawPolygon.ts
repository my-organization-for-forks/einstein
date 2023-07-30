import p5 from 'p5';

import { Matrix } from '../types/einstein/matrix/Matrix';
import { matrixMultiplyVector } from '../types/einstein/matrix/matrixMultiplyVector';
import { Point } from '../types/einstein/point/Point';
import { AppContext } from '../AppContext';

export function drawPolygon(
  context: AppContext,
  p5: p5,
  shape: Point[],
  T: Matrix,
  f: p5.Color | null,
  s: p5.Color | null,
  w: number
) {
  if (f != null) {
    p5.fill(f);
  } else {
    p5.noFill();
  }
  if (s != null) {
    p5.stroke(s);
    p5.strokeWeight(w * context.lw_scale);
  } else {
    p5.noStroke();
  }
  p5.beginShape();
  for (let p of shape) {
    const tp = matrixMultiplyVector(T, p);
    p5.vertex(tp.x, tp.y);
  }
  p5.endShape(p5.CLOSE);
}
