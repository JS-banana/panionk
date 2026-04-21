let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

function tone(
  freq: number,
  duration: number,
  type: OscillatorType = 'square',
  gain = 0.15,
  attack = 0.005,
  decay = 0,
  sustain = 1,
  release = 0.05,
) {
  const ac = getCtx();
  const osc = ac.createOscillator();
  const gainNode = ac.createGain();
  osc.connect(gainNode);
  gainNode.connect(ac.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ac.currentTime);
  gainNode.gain.setValueAtTime(0, ac.currentTime);
  gainNode.gain.linearRampToValueAtTime(gain, ac.currentTime + attack);
  gainNode.gain.setValueAtTime(gain * sustain, ac.currentTime + attack + decay);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration - release);
  osc.start(ac.currentTime);
  osc.stop(ac.currentTime + duration);
}

function sweep(freqs: number[], step: number, type: OscillatorType = 'square', gain = 0.12) {
  freqs.forEach((f, i) => {
    setTimeout(() => tone(f, step * 1.2, type, gain), i * step * 1000);
  });
}

const SFX = {
  coin: () => {
    tone(987, 0.08, 'square', 0.15);
    setTimeout(() => tone(1318, 0.12, 'square', 0.12), 60);
  },
  bump: () => {
    tone(220, 0.05, 'square', 0.2);
    setTimeout(() => tone(110, 0.1, 'square', 0.15), 40);
  },
  jump: () => {
    const ac = getCtx();
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.connect(g); g.connect(ac.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(440, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ac.currentTime + 0.12);
    g.gain.setValueAtTime(0.15, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.15);
    osc.start(); osc.stop(ac.currentTime + 0.15);
  },
  select: () => {
    tone(660, 0.06, 'square', 0.1);
    setTimeout(() => tone(880, 0.06, 'square', 0.1), 55);
  },
  powerup: () => {
    sweep([328, 369, 413, 493, 587, 659, 740, 880], 0.055, 'square', 0.12);
  },
  pipe: () => {
    const ac = getCtx();
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.connect(g); g.connect(ac.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(880, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, ac.currentTime + 0.3);
    g.gain.setValueAtTime(0.15, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.32);
    osc.start(); osc.stop(ac.currentTime + 0.35);
  },
  '1up': () => {
    // classic 1-UP jingle approximation
    sweep([523, 659, 784, 659, 784, 1047], 0.07, 'square', 0.13);
  },
} as const;

export type SoundName = keyof typeof SFX;

class SoundManager {
  private enabled = false;
  private unlocked = false;

  init() {
    if (typeof window === 'undefined') return;
    this.enabled = localStorage.getItem('panionk.sound') === 'on';
  }

  unlock() {
    this.unlocked = true;
    if (ctx?.state === 'suspended') ctx.resume();
  }

  setEnabled(v: boolean) {
    this.enabled = v;
    localStorage.setItem('panionk.sound', v ? 'on' : 'off');
  }

  isEnabled() { return this.enabled; }

  play(name: SoundName) {
    if (!this.enabled || !this.unlocked) return;
    try { SFX[name]?.(); } catch { /* ignore */ }
  }
}

export const soundManager = new SoundManager();
