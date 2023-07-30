import { AppContext } from '../../AppContext';
import { drawPolygon } from '../../einstein/drawPolygon';
import { HAT_OUTLINE } from '../../constants/HAT_OUTLINE';
import { polygonToSVG } from '../../einstein/polygonToSVG';
import { Matrix } from './matrix/Matrix';
import { Tile } from './Tile';
import { getSVGId } from '../../einstein/util/getSVGId';
import p5 from 'p5';

// The base level of the scene, a single hat tile, including a label for colouring
export class HatTile implements Tile {
  private readonly context: AppContext;
  private readonly label: string;
  public svgId: string | undefined;

  constructor(context: AppContext, label: string) {
    this.context = context;
    this.label = label;
  }

  draw(p5: p5, S: Matrix, _level: number) {
    drawPolygon(
      this.context,
      p5,
      HAT_OUTLINE,
      S,
      this.context.colors.get(this.label) ?? null,
      this.context.black,
      1
    );
  }

  resetSVG() {
    this.svgId = undefined;
  }

  buildSVGDefs(p5: p5, stream: string[], scale: number) {
    if (this.svgId != null) {
      return;
    }

    this.svgId = getSVGId(this.context);
    stream.push(
      polygonToSVG(
        p5,
        HAT_OUTLINE,
        this.svgId,
        this.context.colors.get(this.label) ?? null,
        this.context.black,
        this.context.lw_scale / scale
      )
    );
  }

  getSVGStrokeID(): null {
    return null;
  }

  getSVGFillID(): string | null {
    return this.svgId ?? null;
  }

  getText(stream: string[], T: Matrix): void {
    // Write out the top two rows of an affine transformation matrix
    // giving the location of this hat, together with the type of
    // this tile.
    stream.push(
      `${this.label} ${T[0]} ${T[1]} ${T[2]} ${T[3]} ${T[4]} ${T[5]}`
    );
  }
}
