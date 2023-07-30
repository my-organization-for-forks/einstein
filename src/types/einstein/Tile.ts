import p5 from 'p5';

import { Matrix } from './matrix/Matrix';

export interface Tile {
  draw(p5: p5, S: Matrix, level: number): void;
  resetSVG(): void;
  buildSVGDefs(p5: p5, stream: string[], scale: number): void;
  getSVGFillID(): string | null;
  getSVGStrokeID(): string | null;
  getText(stream: string[], T: Matrix): void;
}
