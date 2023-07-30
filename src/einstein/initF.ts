import { AppContext } from '../AppContext';
import { HR3 } from '../constants/HR3';
import { HatTile } from '../types/einstein/HatTile';
import { MetaTile } from '../types/einstein/MetaTile';
import { matrixMultiply } from '../types/einstein/matrix/matrixMultiply';
import { matrixTranslate } from '../types/einstein/matrix/matrixTranslate';

export function initF(context: AppContext) {
  const F_hat = new HatTile(context, 'F');

  const F_outline = [
    { x: 0, y: 0 },
    { x: 3, y: 0 },
    { x: 3.5, y: HR3 },
    { x: 3, y: 2 * HR3 },
    { x: -1, y: 2 * HR3 },
  ];
  const meta = new MetaTile(context, F_outline, 2);

  meta.addChild([0.5, 0, 1.5, 0, 0.5, HR3], F_hat);
  meta.addChild(
    matrixMultiply(
      matrixTranslate(0, 2 * HR3),
      matrixMultiply(
        [0.5, HR3, 0, -HR3, 0.5, 0],
        [0.5, 0.0, 0.0, 0.0, 0.5, 0.0]
      )
    ),
    F_hat
  );

  return meta;
}
