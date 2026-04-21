import { PAL } from './palette';

export interface Cloud {
  x: number;
  y: number;
  size: number;
  sp: number;
}

export function makeClouds(W: number, H: number): Cloud[] {
  return [
    { x: W * 0.25, y: H * 0.12, size: 3.5, sp: 0.22 },
    { x: W * 0.72, y: H * 0.09, size: 4, sp: 0.16 },
  ];
}

export function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const s = size * 8;
  ctx.fillStyle = PAL.white;
  ctx.fillRect(Math.round(x + s * 0.2), Math.round(y + s * 0.6), Math.round(s * 2.6), Math.round(s * 0.5));
  ([[0.4, 0.4, 0.7], [1.2, 0.2, 0.9], [2.0, 0.35, 0.7]] as [number, number, number][]).forEach(([ox, oy, r]) => {
    const cr = (s * r * 0.5);
    ctx.beginPath();
    ctx.arc(x + s * ox + cr, y + s * oy + cr, cr, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = PAL.cloudShadow;
  ctx.fillRect(Math.round(x + s * 0.2), Math.round(y + s * 0.6), Math.round(s * 2.6), 2);
}
