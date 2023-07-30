import P5 from 'p5';
import React, { useCallback, useContext } from 'react';
import Sketch from 'react-p5';

import { AppContext } from '../AppContext';
import { constructPatch } from '../einstein/constructPatch';
import { constructMetatiles } from '../einstein/constructMetatiles';

export function App() {
  const context = useContext(AppContext);
  const setup = useCallback(
    (p5: P5) => {
      context.black = p5.color('black');
      p5.createCanvas(p5.windowWidth, p5.windowHeight);

      const colorPalette: Record<string, [number, number, number]> = {
        H1: [0, 137, 212],
        H: [148, 205, 235],
        T: [251, 251, 251],
        P: [250, 250, 250],
        F: [191, 191, 191],
      };

      for (let [name, col] of Object.entries(colorPalette)) {
        context.colors.set(name, p5.color(...col));
      }
    },
    [context]
  );

  const draw = useCallback(
    (p5: P5) => {
      p5.background(255);

      p5.translate(p5.width / 2, p5.height / 2);
      const idx = { H: 0, T: 1, P: 2, F: 3 }[context.radio];

      if (context.drawHats) {
        context.tiles[idx].draw(p5, context.toScreen, context.level);
      }

      if (context.drawSuper) {
        for (let lev = context.level - 1; lev >= 0; --lev) {
          context.tiles[idx].draw(p5, context.toScreen, lev);
        }
      }
    },
    [context]
  );

  const buildSuperTiles = useCallback(
    (p5: P5) => {
      const patch = constructPatch(context, ...context.tiles);
      context.tiles = constructMetatiles(context, patch);
      context.level++;
      p5.loop();
    },
    [context]
  );

  return <Sketch setup={setup} draw={draw} mouseClicked={buildSuperTiles} />;
}
