import { AppContext } from '../AppContext';
import { HR3 } from '../constants/HR3';
import { HatTile } from '../types/einstein/HatTile';
import { MetaTile } from '../types/einstein/MetaTile';

export function initT(context: AppContext) {
  const T_hat = new HatTile(context, 'T');

  const T_outline = [
    { x: 0, y: 0 },
    { x: 3, y: 0 },
    { x: 1.5, y: 3 * HR3 },
  ];
  const meta = new MetaTile(context, T_outline, 2);

  meta.addChild([0.5, 0, 0.5, 0, 0.5, HR3], T_hat);

  return meta;
}
