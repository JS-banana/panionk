import { PAL } from './palette';

export function drawHills(ctx: CanvasRenderingContext2D, W: number, gY: number, mouseParallax = 0) {
  const hills = [
    [0.05, gY * 0.88, 90],
    [0.32, gY * 0.90, 70],
    [0.62, gY * 0.89, 110],
    [0.88, gY * 0.91, 60],
  ] as [number, number, number][];

  hills.forEach(([xf, cy, r], i) => {
    const parallaxOffset = i < 2 ? mouseParallax * 0.15 : 0;
    ctx.fillStyle = PAL.hillDark;
    ctx.beginPath();
    ctx.arc(W * xf + parallaxOffset, cy, r, Math.PI, 0);
    ctx.fill();
    ctx.fillStyle = PAL.hillLight;
    ctx.beginPath();
    ctx.arc(W * xf + parallaxOffset, cy, r * 0.6, Math.PI, 0);
    ctx.fill();
  });
}
