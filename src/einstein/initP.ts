import { AppContext } from '../AppContext';
import { HR3 } from '../constants/HR3';
import { HatTile } from '../types/einstein/HatTile';
import { MetaTile } from '../types/einstein/MetaTile';
import { matrixMultiply } from '../types/einstein/matrix/matrixMultiply';
import { matrixTranslate } from '../types/einstein/matrix/matrixTranslate';

export function initP(context: AppContext) {
  const P_hat = new HatTile(context, 'P');

  const P_outline = [
    { x: 0, y: 0 },
    { x: 4, y: 0 },
    { x: 3, y: 2 * HR3 },
    { x: -1, y: 2 * HR3 },
  ];
  const meta = new MetaTile(context, P_outline, 2);

  meta.addChild([0.5, 0, 1.5, 0, 0.5, HR3], P_hat);
  meta.addChild(
    matrixMultiply(
      matrixTranslate(0, 2 * HR3),
      matrixMultiply(
        [0.5, HR3, 0, -HR3, 0.5, 0],
        [0.5, 0.0, 0.0, 0.0, 0.5, 0.0]
      )
    ),
    P_hat
  );

  return meta;
}
