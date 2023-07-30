import p5 from 'p5';

import { AppContext } from '../AppContext';
import { ControlMode } from '../types/einstein/ControlMode';
import { MetaTile } from '../types/einstein/MetaTile';
import { TileType } from '../types/einstein/TileType';
import { Matrix } from '../types/einstein/matrix/Matrix';
import { Point } from '../types/einstein/point/Point';
import { initH } from './initH';
import { initT } from './initT';
import { initP } from './initP';
import { initF } from './initF';

export class AppContextImpl implements AppContext {
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

  black!: p5.Color;

  constructor() {
    this.toScreen = [20, 0, 0, 0, -20, 0];
    this.lw_scale = 1;
    this.tiles = [initH(this), initT(this), initP(this), initF(this)];
    this.level = 1;

    this.controlMode = 'translate';
    this.drawHats = true;
    this.drawSuper = true;
    this.radio = 'H';

    this.dragging = false;
    this.autoIncrementId = 0;
    this.colors = new Map();
  }
}
