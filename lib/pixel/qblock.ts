import { PAL } from './palette';

export interface QBlock {
  x: number;
  baseY: number;
  phase: number;
  hitAnim?: number;
  coinBurst?: { y: number; vy: number; alpha: number }[];
}

export function makeQBlocks(W: number, H: number): QBlock[] {
  const gY = H * 0.88;
  return [
    { x: W * 0.35, baseY: gY - 160, phase: 0 },
    { x: W * 0.48, baseY: gY - 200, phase: 1.3 },
    { x: W * 0.61, baseY: gY - 160, phase: 2.6 },
  ];
}

export function drawQBlock(
  ctx: CanvasRenderingContext2D,
  block: QBlock,
  t: number,
) {
  const s = 4, n = 6;
  const hitOffset = block.hitAnim ? -Math.sin((block.hitAnim / 12) * Math.PI) * 8 : 0;
  const bob = Math.sin(t * 0.04 + block.phase) * 3;
  const x = block.x;
  const y = block.baseY + bob + hitOffset;

  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillRect(Math.round(x + 2), Math.round(y + n * s + 2), n * s, 4);
  ctx.fillStyle = PAL.qBlockBody;
  ctx.fillRect(Math.round(x), Math.round(y), n * s, n * s);
  ctx.fillStyle = PAL.qBlockTop;
  ctx.fillRect(Math.round(x), Math.round(y), n * s, s);
  ctx.fillStyle = PAL.qBlockLeft;
  ctx.fillRect(Math.round(x), Math.round(y), s, n * s);
  ctx.fillStyle = PAL.qBlockShadow;
  ctx.fillRect(Math.round(x + n * s - s), Math.round(y), s, n * s);
  ctx.fillRect(Math.round(x), Math.round(y + n * s - s), n * s, s);

  ctx.fillStyle = PAL.white;
  const qx = Math.round(x + (n * s) / 2 - s * 0.5);
  const qy = Math.round(y + (n * s) / 2 - s);
  ctx.fillRect(qx, qy - s, s * 2, s);
  ctx.fillRect(qx + s, qy - s, s, s);
  ctx.fillRect(qx + s, qy, s, s);
  ctx.fillRect(qx, qy + s, s * 2, s);
  ctx.fillRect(qx, qy + s * 3, s * 2, s);

  // coin burst particles from block hit
  if (block.coinBurst) {
    block.coinBurst.forEach(p => {
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = PAL.coinBody;
      ctx.fillRect(Math.round(x + n * s / 2 - 4), Math.round(p.y), 8, 10);
      ctx.globalAlpha = 1;
    });
  }
}

export function hitQBlock(block: QBlock) {
  block.hitAnim = 12;
  block.coinBurst = [{ y: block.baseY - 20, vy: -5, alpha: 1 }];
}

export function updateQBlock(block: QBlock) {
  if (block.hitAnim && block.hitAnim > 0) block.hitAnim--;
  if (block.coinBurst) {
    block.coinBurst.forEach(p => {
      p.y += p.vy;
      p.vy += 0.4;
      p.alpha = Math.max(0, p.alpha - 0.04);
    });
    block.coinBurst = block.coinBurst.filter(p => p.alpha > 0);
    if (block.coinBurst.length === 0) block.coinBurst = undefined;
  }
}
