import p5 from 'p5';
import { AppContext } from '../../AppContext';
import { drawPolygon } from '../../einstein/drawPolygon';
import { getSVGInstance } from '../../einstein/getSVGInstance';
import { polygonToSVG } from '../../einstein/polygonToSVG';
import { getSVGId } from '../../einstein/util/getSVGId';
import { Matrix } from './matrix/Matrix';
import { matrixMultiply } from './matrix/matrixMultiply';
import { matrixMultiplyVector } from './matrix/matrixMultiplyVector';
import { matrixTranslate } from './matrix/matrixTranslate';
import { Point } from './point/Point';
import { pointAdd } from './point/pointAdd';
import { Tile } from './Tile';

// A group that collects a list of transformed children and an outline
export class MetaTile implements Tile {
  private readonly context: AppContext;
  public readonly shape: Point[];
  public readonly width: number;
  public readonly children: { T: Matrix; geom: Tile }[];
  public svgId: string | undefined;

  constructor(context: AppContext, shape: Point[], width: number) {
    this.context = context;
    this.shape = shape;
    this.children = [];
    this.width = width;
  }

  addChild(T: Matrix, geom: Tile) {
    this.children.push({ T, geom });
  }

  evalChild(n: number, i: number): Point {
    return matrixMultiplyVector(
      this.children[n].T,
      (this.children[n].geom as MetaTile).shape[i]
    );
  }

  draw(p5: p5, S: Matrix, level: number): void {
    if (level > 0) {
      for (let g of this.children) {
        g.geom.draw(p5, matrixMultiply(S, g.T), level - 1);
      }
    } else {
      drawPolygon(
        this.context,
        p5,
        this.shape,
        S,
        null,
        this.context.black,
        this.width
      );
    }
  }

  recenter() {
    let cx = 0;
    let cy = 0;
    for (let p of this.shape) {
      cx += p.x;
      cy += p.y;
    }
    cx /= this.shape.length;
    cy /= this.shape.length;
    const tr: Point = { x: -cx, y: -cy };

    for (let idx = 0; idx < this.shape.length; ++idx) {
      this.shape[idx] = pointAdd(this.shape[idx], tr);
    }

    const M = matrixTranslate(-cx, -cy);
    for (let ch of this.children) {
      ch.T = matrixMultiply(M, ch.T);
    }
  }

  resetSVG() {
    for (let ch of this.children) {
      ch.geom.resetSVG();
    }
    this.svgId = undefined;
  }

  buildSVGDefs(p5: p5, stream: string[], scale: number) {
    if (this.svgId != null) {
      return;
    }

    this.svgId = getSVGId(this.context);

    for (let ch of this.children) {
      ch.geom.buildSVGDefs(p5, stream, scale);
    }

    // Construct a fill group that must live at a logical lowest
    // layer in the draw order.

    stream.push(`  <g id="${this.getSVGFillID()}">`);
    for (let ch of this.children) {
      const fid = ch.geom.getSVGFillID();
      if (fid != null) {
        stream.push(getSVGInstance(fid, ch.T));
      }
    }
    stream.push('  </g>');

    // Construct a stroke group that must live above all fill groups.

    stream.push(`  <g id="${this.getSVGStrokeID()}">`);
    for (let ch of this.children) {
      const sid = ch.geom.getSVGStrokeID();
      if (sid != null) {
        stream.push(getSVGInstance(sid, ch.T));
      }
    }
    stream.push(
      polygonToSVG(
        p5,
        this.shape,
        null,
        null,
        this.context.black,
        (this.width * this.context.lw_scale) / scale
      )
    );

    stream.push('  </g>');
  }

  getSVGStrokeID(): string {
    return `${this.svgId}s`;
  }

  getSVGFillID(): string {
    return `${this.svgId}f`;
  }

  getText(stream: string[], T: Matrix): void {
    for (let g of this.children) {
      g.geom.getText(stream, matrixMultiply(T, g.T));
    }
  }
}
