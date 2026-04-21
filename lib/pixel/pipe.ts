import { PAL } from './palette';

export interface Pipe {
  x: number;
  gY: number;
  animating?: boolean;
  animT?: number;
}

export function drawPipe(ctx: CanvasRenderingContext2D, x: number, gY: number, hideTop = false) {
  const w = 32, cap = 8;
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillRect(x + 4, gY - 100, w, 104);
  ctx.fillStyle = PAL.pipeMain;
  ctx.fillRect(x, gY - 100, w, 100);
  ctx.fillStyle = PAL.pipeDark;
  ctx.fillRect(x + w - 8, gY - 100, 8, 100);
  ctx.fillStyle = PAL.pipeLight;
  ctx.fillRect(x, gY - 100, 6, 100);
  if (!hideTop) {
    ctx.fillStyle = PAL.pipeLight;
    ctx.fillRect(x - cap, gY - 116, w + cap * 2, 18);
    ctx.fillStyle = PAL.pipeGlow;
    ctx.fillRect(x - cap, gY - 116, w + cap * 2, 5);
    ctx.fillStyle = PAL.pipeDark;
    ctx.fillRect(x - cap, gY - 102, w + cap * 2, 4);
  }
}
