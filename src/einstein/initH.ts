import { MetaTile } from '../types/einstein/MetaTile';
import { HR3 } from '../constants/HR3';
import { AppContext } from '../AppContext';
import { matrixMatchTwoSegment } from '../types/einstein/matrix/matrixMatchTwoSegment';
import { HAT_OUTLINE } from '../constants/HAT_OUTLINE';
import { matrixMultiply } from '../types/einstein/matrix/matrixMultiply';
import { matrixTranslate } from '../types/einstein/matrix/matrixTranslate';
import { HatTile } from '../types/einstein/HatTile';

export function initH(context: AppContext) {
  const H_hat = new HatTile(context, 'H');
  const H1_hat = new HatTile(context, 'H1');

  const H_outline = [
    { x: 0, y: 0 },
    { x: 4, y: 0 },
    { x: 4.5, y: HR3 },
    { x: 2.5, y: 5 * HR3 },
    { x: 1.5, y: 5 * HR3 },
    { x: -0.5, y: HR3 },
  ];
  const meta = new MetaTile(context, H_outline, 2);

  meta.addChild(
    matrixMatchTwoSegment(
      HAT_OUTLINE[5],
      HAT_OUTLINE[7],
      H_outline[5],
      H_outline[0]
    ),
    H_hat
  );
  meta.addChild(
    matrixMatchTwoSegment(
      HAT_OUTLINE[9],
      HAT_OUTLINE[11],
      H_outline[1],
      H_outline[2]
    ),
    H_hat
  );
  meta.addChild(
    matrixMatchTwoSegment(
      HAT_OUTLINE[5],
      HAT_OUTLINE[7],
      H_outline[3],
      H_outline[4]
    ),
    H_hat
  );
  meta.addChild(
    matrixMultiply(
      matrixTranslate(2.5, HR3),
      matrixMultiply([-0.5, -HR3, 0, HR3, -0.5, 0], [0.5, 0, 0, 0, -0.5, 0])
    ),
    H1_hat
  );

  return meta;
}
