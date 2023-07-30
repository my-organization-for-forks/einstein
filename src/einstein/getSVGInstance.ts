import { Matrix } from '../types/einstein/matrix/Matrix';

export function getSVGInstance(id: string, T: Matrix) {
  return `    <use xlink:href="#${id}" transform="matrix(${T[0]} ${T[3]} ${T[1]} ${T[4]} ${T[2]} ${T[5]})"/>`;
}
