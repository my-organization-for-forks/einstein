import p5 from 'p5';
import { AppContext } from '../AppContext';
import { matrixInverse } from '../types/einstein/matrix/matrixInverse';
import { matrixMultiply } from '../types/einstein/matrix/matrixMultiply';
import { matrixMultiplyVector } from '../types/einstein/matrix/matrixMultiplyVector';
import { matrixTranslate } from '../types/einstein/matrix/matrixTranslate';

function windowResized(p5: p5) {
  p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
}

function mousePressed(context: AppContext, p5: p5) {
  context.dragging = true;
  if (context.controlMode === 'scale') {
    context.scale = {
      center: matrixMultiplyVector(matrixInverse(context.toScreen), {
        x: p5.width / 2,
        y: p5.height / 2,
      }),
      start: { x: p5.mouseX, y: p5.mouseY },
      ts: [...context.toScreen],
    };
  }
  p5.loop();
}

function mouseDragged(context: AppContext, p5: p5) {
  if (context.dragging) {
    if (context.controlMode === 'translate') {
      context.toScreen = matrixMultiply(
        matrixTranslate(p5.mouseX - p5.pmouseX, p5.mouseY - p5.pmouseY),
        context.toScreen
      );
    } else {
      let sc =
        p5.dist(p5.mouseX, p5.mouseY, p5.width / 2, p5.height / 2) /
        p5.dist(
          context.scale!.start.x,
          context.scale!.start.y,
          p5.width / 2,
          p5.height / 2
        );
      context.toScreen = matrixMultiply(
        matrixMultiply(
          matrixTranslate(context.scale!.center.x, context.scale!.center.y),
          matrixMultiply(
            [sc, 0, 0, 0, sc, 0],
            matrixTranslate(-context.scale!.center.x, -context.scale!.center.y)
          )
        ),
        context.scale!.ts
      );
      context.lw_scale =
        p5.mag(context.toScreen[0], context.toScreen[1]) / 20.0;
    }
    p5.loop();
    return false;
  }
}
