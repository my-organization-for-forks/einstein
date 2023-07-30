import p5 from 'p5';
import { createContext } from 'react';

import { Matrix } from './types/einstein/matrix/Matrix';
import { Point } from './types/einstein/point/Point';
import { TileType } from './types/einstein/TileType';
import { ControlMode } from './types/einstein/ControlMode';
import { MetaTile } from './types/einstein/MetaTile';

export interface AppContext {
  toScreen: Matrix;
  lw_scale: number;
  tiles: [H: MetaTile, T: MetaTile, P: MetaTile, F: MetaTile];
  level: number;

  scale:
    | {
        center: Point;
        start: Point;
        ts: Matrix;
      }
    | undefined;

  controlMode: ControlMode;
  drawHats: boolean;
  drawSuper: boolean;
  radio: TileType;

  dragging: boolean;

  autoIncrementId: number;

  colors: Map<string, p5.Color>;
  black: p5.Color;
}

export const AppContext = createContext<AppContext>(
  undefined as unknown as AppContext
);
