import { AppContext } from '../AppContext';
import { MetaTile } from '../types/einstein/MetaTile';
import { matrixMultiplyVector } from '../types/einstein/matrix/matrixMultiplyVector';
import { matrixRotate } from '../types/einstein/matrix/matrixRotate';
import { matrixRotateFrom } from '../types/einstein/matrix/matrixRotateFrom';
import { lineIntersection } from '../types/einstein/point/lineIntersection';
import { pointAdd } from '../types/einstein/point/pointAdd';
import { pointSubtract } from '../types/einstein/point/pointSubtract';

export function constructMetatiles(
  context: AppContext,
  patch: MetaTile
): [H: MetaTile, T: MetaTile, P: MetaTile, F: MetaTile] {
  const bps1 = patch.evalChild(8, 2);
  const bps2 = patch.evalChild(21, 2);
  const rbps = matrixMultiplyVector(
    matrixRotateFrom(bps1, (-2.0 * Math.PI) / 3.0),
    bps2
  );

  const p72 = patch.evalChild(7, 2);
  const p252 = patch.evalChild(25, 2);

  const llc = lineIntersection(bps1, rbps, patch.evalChild(6, 2), p72);
  let w = pointSubtract(patch.evalChild(6, 2), llc);

  const new_H_outline = [llc, bps1];
  w = matrixMultiplyVector(matrixRotate(-Math.PI / 3), w);
  new_H_outline.push(pointAdd(new_H_outline[1], w));
  new_H_outline.push(patch.evalChild(14, 2));
  w = matrixMultiplyVector(matrixRotate(-Math.PI / 3), w);
  new_H_outline.push(pointSubtract(new_H_outline[3], w));
  new_H_outline.push(patch.evalChild(6, 2));

  const new_H = new MetaTile(context, new_H_outline, patch.width * 2);
  for (let ch of [0, 9, 16, 27, 26, 6, 1, 8, 10, 15]) {
    new_H.addChild(patch.children[ch].T, patch.children[ch].geom);
  }

  const new_P_outline = [
    p72,
    pointAdd(p72, pointSubtract(bps1, llc)),
    bps1,
    llc,
  ];
  const new_P = new MetaTile(context, new_P_outline, patch.width * 2);
  for (let ch of [7, 2, 3, 4, 28]) {
    new_P.addChild(patch.children[ch].T, patch.children[ch].geom);
  }

  const new_F_outline = [
    bps2,
    patch.evalChild(24, 2),
    patch.evalChild(25, 0),
    p252,
    pointAdd(p252, pointSubtract(llc, bps1)),
  ];
  const new_F = new MetaTile(context, new_F_outline, patch.width * 2);
  for (let ch of [21, 20, 22, 23, 24, 25]) {
    new_F.addChild(patch.children[ch].T, patch.children[ch].geom);
  }

  const AAA = new_H_outline[2];
  const BBB = pointAdd(
    new_H_outline[1],
    pointSubtract(new_H_outline[4], new_H_outline[5])
  );
  const CCC = matrixMultiplyVector(matrixRotateFrom(BBB, -Math.PI / 3), AAA);
  const new_T_outline = [BBB, CCC, AAA];
  const new_T = new MetaTile(context, new_T_outline, patch.width * 2);
  new_T.addChild(patch.children[11].T, patch.children[11].geom);

  new_H.recenter();
  new_P.recenter();
  new_F.recenter();
  new_T.recenter();

  return [new_H, new_T, new_P, new_F];
}
