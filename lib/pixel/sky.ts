// Sky gradient cycles through day/dusk/night phases over 30s
const PHASES = [
  { top: '#5c94fc', bot: '#8ab8fc' }, // day
  { top: '#e87844', bot: '#f8c060' }, // dusk
  { top: '#10203c', bot: '#203060' }, // night
];

export function getSkyColors(t: number): { top: string; bot: string } {
  const cycle = 30 * 60; // 30s at 60fps
  const pos = (t % (cycle * PHASES.length)) / cycle;
  const phaseIdx = Math.floor(pos) % PHASES.length;
  const nextIdx = (phaseIdx + 1) % PHASES.length;
  const blend = pos - Math.floor(pos);

  return {
    top: lerpColor(PHASES[phaseIdx].top, PHASES[nextIdx].top, blend),
    bot: lerpColor(PHASES[phaseIdx].bot, PHASES[nextIdx].bot, blend),
  };
}

function lerpColor(a: string, b: string, t: number): string {
  const ra = parseInt(a.slice(1, 3), 16);
  const ga = parseInt(a.slice(3, 5), 16);
  const ba = parseInt(a.slice(5, 7), 16);
  const rb = parseInt(b.slice(1, 3), 16);
  const gb = parseInt(b.slice(3, 5), 16);
  const bb = parseInt(b.slice(5, 7), 16);
  const r = Math.round(ra + (rb - ra) * t);
  const g = Math.round(ga + (gb - ga) * t);
  const bl = Math.round(ba + (bb - ba) * t);
  return `rgb(${r},${g},${bl})`;
}

export function drawGround(ctx: CanvasRenderingContext2D, W: number, gY: number) {
  ctx.fillStyle = '#c88030';
  ctx.fillRect(0, gY, W, 40);
  ctx.fillStyle = '#48a020';
  ctx.fillRect(0, gY, W, 12);
  ctx.fillStyle = '#a05818';
  for (let x = 0; x < W; x += 20) ctx.fillRect(x, gY + 12, 1, 28);
  for (let y = gY + 12; y < gY + 40; y += 14) ctx.fillRect(0, y, W, 1);
}
