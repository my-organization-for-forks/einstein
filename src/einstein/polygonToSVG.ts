import p5 from 'p5';

import { Point } from '../types/einstein/point/Point';

export function polygonToSVG(
  p5: p5,
  shape: Point[],
  id: string | null,
  f: p5.Color | null,
  s: p5.Color | null,
  w: number
) {
  let verts = '';
  for (let p of shape) {
    if (verts.length > 0) {
      verts = verts + ' ';
    }
    verts = verts + p.x + ',' + p.y;
  }

  let ids = '';
  if (id !== null) {
    ids = ` id="${id}"`;
  }

  let str = ' stroke="none"';
  if (s != null) {
    str = ` stroke="rgb(${p5.red(s)},${p5.green(s)},${p5.blue(
      s
    )})" stroke-width="${w}"`;
  }

  let fil = ' fill="none"';
  if (f != null) {
    fil = ` fill="rgb(${p5.red(f)},${p5.green(f)},${p5.blue(f)})"`;
  }

  return `    <polygon${ids} points="${verts}"${str}${fil}/>`;
}
