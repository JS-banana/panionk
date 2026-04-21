import { PAL } from './palette';

export interface Coin {
  x: number;
  y: number;
  phase: number;
  collected?: boolean;
  flyToX?: number;
  flyToY?: number;
  flyProgress?: number;
  respawnAt?: number;
}

export function makeCoins(W: number, H: number, count = 8): Coin[] {
  const gY = H * 0.88;
  return Array.from({ length: count }, () => ({
    x: W * 0.2 + Math.random() * (W * 0.6),
    y: gY - 80 - Math.random() * 100,
    phase: Math.random() * Math.PI * 2,
  }));
}

export function drawCoin(
  ctx: CanvasRenderingContext2D,
  coin: Coin,
  t: number,
) {
  if (coin.collected) return;
  let { x, y } = coin;

  if (coin.flyProgress !== undefined) {
    const p = coin.flyProgress;
    x = x + ((coin.flyToX ?? x) - x) * p;
    y = y + ((coin.flyToY ?? y) - y) * p;
    ctx.globalAlpha = 1 - p;
  } else {
    const bob = Math.sin(t * 0.05 + coin.phase) * 4;
    y += bob;
  }

  const width = Math.abs(Math.cos(t * 0.06 + coin.phase)) * 8 + 2;
  ctx.fillStyle = PAL.coinGlow;
  ctx.fillRect(Math.round(x - 8), Math.round(y - 8), 24, 24);
  ctx.fillStyle = PAL.coinBody;
  ctx.fillRect(Math.round(x + (10 - width) / 2), Math.round(y), Math.round(width), 12);
  if (width > 6) {
    ctx.fillStyle = PAL.coinShine;
    ctx.fillRect(Math.round(x + (10 - width) / 2 + 1), Math.round(y + 1), 2, 4);
  }
  ctx.globalAlpha = 1;
}

export function collectCoin(coin: Coin, hudX: number, hudY: number) {
  coin.flyToX = hudX;
  coin.flyToY = hudY;
  coin.flyProgress = 0;
}

export function updateCoin(coin: Coin, now: number) {
  if (coin.flyProgress !== undefined) {
    coin.flyProgress += 0.06;
    if (coin.flyProgress >= 1) {
      coin.collected = true;
      coin.flyProgress = undefined;
      coin.respawnAt = now + 5000;
    }
  }
  if (coin.collected && coin.respawnAt && now >= coin.respawnAt) {
    coin.collected = false;
    coin.respawnAt = undefined;
  }
}
