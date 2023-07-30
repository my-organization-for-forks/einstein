import { AppContext } from '../../AppContext';

export function getSVGId(context: AppContext) {
  return `svgId${++context.autoIncrementId}`;
}
