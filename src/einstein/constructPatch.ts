import { TileType } from '../types/einstein/TileType';
import { MetaTile } from '../types/einstein/MetaTile';
import { IDENT } from '../constants/IDENT';
import { AppContext } from '../AppContext';
import { matrixMultiplyVector } from '../types/einstein/matrix/matrixMultiplyVector';
import { matrixMatchTwoSegment } from '../types/einstein/matrix/matrixMatchTwoSegment';

export function constructPatch(
  context: AppContext,
  H: MetaTile,
  T: MetaTile,
  P: MetaTile,
  F: MetaTile
): MetaTile {
  const rules: (
    | [TileType]
    | [number, number, TileType, number]
    | [number, number, number, number, TileType, number]
  )[] = [
    ['H'],
    [0, 0, 'P', 2],
    [1, 0, 'H', 2],
    [2, 0, 'P', 2],
    [3, 0, 'H', 2],
    [4, 4, 'P', 2],
    [0, 4, 'F', 3],
    [2, 4, 'F', 3],
    [4, 1, 3, 2, 'F', 0],
    [8, 3, 'H', 0],
    [9, 2, 'P', 0],
    [10, 2, 'H', 0],
    [11, 4, 'P', 2],
    [12, 0, 'H', 2],
    [13, 0, 'F', 3],
    [14, 2, 'F', 1],
    [15, 3, 'H', 4],
    [8, 2, 'F', 1],
    [17, 3, 'H', 0],
    [18, 2, 'P', 0],
    [19, 2, 'H', 2],
    [20, 4, 'F', 3],
    [20, 0, 'P', 2],
    [22, 0, 'H', 2],
    [23, 4, 'F', 3],
    [23, 0, 'F', 3],
    [16, 0, 'P', 2],
    [9, 4, 0, 2, 'T', 2],
    [4, 0, 'F', 3],
  ];

  const result = new MetaTile(context, [], H.width);
  const shapes = { H, T, P, F };

  for (let r of rules) {
    if (r.length == 1) {
      result.addChild(IDENT, shapes[r[0]]);
    } else if (r.length == 4) {
      const poly = (result.children[r[0]].geom as MetaTile).shape;
      const T = result.children[r[0]].T;
      const P = matrixMultiplyVector(T, poly[(r[1] + 1) % poly.length]);
      const Q = matrixMultiplyVector(T, poly[r[1]]);
      const nshp = shapes[r[2]];
      const npoly = nshp.shape;

      result.addChild(
        matrixMatchTwoSegment(
          npoly[r[3]],
          npoly[(r[3] + 1) % npoly.length],
          P,
          Q
        ),
        nshp
      );
    } else {
      const chP = result.children[r[0]];
      const chQ = result.children[r[2]];

      const P = matrixMultiplyVector(chQ.T, (chQ.geom as MetaTile).shape[r[3]]);
      const Q = matrixMultiplyVector(chP.T, (chP.geom as MetaTile).shape[r[1]]);
      const nshp = shapes[r[4]];
      const npoly = nshp.shape;

      result.addChild(
        matrixMatchTwoSegment(
          npoly[r[5]],
          npoly[(r[5] + 1) % npoly.length],
          P,
          Q
        ),
        nshp
      );
    }
  }

  return result;
}
