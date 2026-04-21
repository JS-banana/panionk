'use client';
import { useCallback, useEffect, useRef } from 'react';
import { makeClouds, drawCloud, type Cloud } from '@/lib/pixel/cloud';
import { drawHills } from '@/lib/pixel/hill';
import { drawGround, getSkyColors } from '@/lib/pixel/sky';
import { drawPipe } from '@/lib/pixel/pipe';
import {
  makeQBlocks, drawQBlock, hitQBlock, updateQBlock, type QBlock,
} from '@/lib/pixel/qblock';
import { makeCoins, drawCoin, collectCoin, updateCoin, type Coin } from '@/lib/pixel/coin';
import { drawMario, MARIO_H } from '@/lib/pixel/mario';
import { useSound } from '@/components/system/SoundProvider';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Props {
  onScoreAdd: (n: number) => void;
  onCoinAdd: (n: number) => void;
  isMobile: boolean;
}

export function PixelScene({ onScoreAdd, onCoinAdd, isMobile }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { play } = useSound();
  const reduced = useReducedMotion();

  const state = useRef({
    t: 0,
    W: 0, H: 0,
    clouds: [] as Cloud[],
    qblocks: [] as QBlock[],
    coins: [] as Coin[],
    marioX: 80,
    marioY: 0,
    marioVY: 0,
    marioJumping: false,
    marioJumpTimer: 300,
    marioFrame: 0 as 0 | 1,
    marioFrameTimer: 0,
    marioFacingRight: true,
    marioManual: false,
    marioManualTimer: 0,
    marioInput: { left: false, right: false, jump: false, crouch: false },
    mouseX: -1,
    mouseParallax: 0,
    rafId: 0,
    onScoreAdd: onScoreAdd,
    onCoinAdd: onCoinAdd,
    play: play,
    pipeAnimating: [false, false],
    pipeAnimT: [0, 0],
  });

  const init = useCallback(() => {
    const s = state.current;
    s.clouds = makeClouds(s.W, s.H);
    s.qblocks = makeQBlocks(s.W, s.H);
    s.coins = makeCoins(s.W, s.H, isMobile ? 4 : 8);
  }, [isMobile]);

  // keyboard control
  useEffect(() => {
    if (isMobile) return;
    const s = state.current;
    const down = (e: KeyboardEvent) => {
      if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(e.key)) e.preventDefault();
      if (e.key === 'ArrowLeft') { s.marioInput.left = true; s.marioManual = true; s.marioManualTimer = 180; }
      if (e.key === 'ArrowRight') { s.marioInput.right = true; s.marioManual = true; s.marioManualTimer = 180; }
      if (e.key === ' ' || e.key === 'ArrowUp') { s.marioInput.jump = true; s.marioManual = true; s.marioManualTimer = 180; }
      if (e.key === 'ArrowDown') { s.marioInput.crouch = true; s.marioManual = true; s.marioManualTimer = 180; }
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') s.marioInput.left = false;
      if (e.key === 'ArrowRight') s.marioInput.right = false;
      if (e.key === ' ' || e.key === 'ArrowUp') s.marioInput.jump = false;
      if (e.key === 'ArrowDown') s.marioInput.crouch = false;
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, [isMobile]);

  // mouse parallax
  useEffect(() => {
    if (isMobile || reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const move = (e: MouseEvent) => {
      const s = state.current;
      s.mouseX = e.clientX;
      s.mouseParallax = (e.clientX - s.W / 2);
      s.marioManual = true;
      s.marioManualTimer = 60;
    };
    canvas.addEventListener('mousemove', move);
    return () => canvas.removeEventListener('mousemove', move);
  }, [isMobile, reduced]);

  // canvas click for blocks/coins/pipes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const click = (e: MouseEvent) => {
      const s = state.current;
      const rect = canvas.getBoundingClientRect();
      const scaleX = s.W / rect.width;
      const scaleY = s.H / rect.height;
      const cx = (e.clientX - rect.left) * scaleX;
      const cy = (e.clientY - rect.top) * scaleY;
      const gY = s.H * 0.88;

      // Check qblocks
      s.qblocks.forEach(b => {
        const bx = b.x, by = b.baseY;
        if (cx >= bx && cx <= bx + 24 && cy >= by - 6 && cy <= by + 24) {
          hitQBlock(b);
          s.play('bump');
          s.onScoreAdd(100);
          s.onCoinAdd(1);
        }
      });

      // Check coins
      if (!isMobile) {
        s.coins.forEach(c => {
          if (c.collected) return;
          if (Math.abs(cx - c.x) < 14 && Math.abs(cy - c.y) < 16) {
            collectCoin(c, s.W / 2, 60);
            s.play('coin');
            s.onCoinAdd(50);
            s.onScoreAdd(50);
          }
        });
      }

      // Check pipes
      const pipeXs = [s.W * 0.22 - 20, s.W * 0.78 - 20];
      pipeXs.forEach((px, i) => {
        if (cx >= px - 8 && cx <= px + 40 && cy >= gY - 116 && cy <= gY) {
          if (!s.pipeAnimating[i]) {
            s.pipeAnimating[i] = true;
            s.pipeAnimT[i] = 0;
            s.play('pipe');
            // Mario teleport
            const otherX = pipeXs[1 - i] + 10;
            setTimeout(() => {
              s.marioX = otherX;
            }, 800);
            setTimeout(() => { s.pipeAnimating[i] = false; }, 1600);
          }
        }
      });
    };
    canvas.addEventListener('click', click);
    return () => canvas.removeEventListener('click', click);
  }, [isMobile]);

  // main loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const s = state.current;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = false;
      s.W = w;
      s.H = h;
      init();
    };

    resize();
    window.addEventListener('resize', resize);

    const visibility = () => {
      if (document.hidden) cancelAnimationFrame(state.current.rafId);
      else loop();
    };
    document.addEventListener('visibilitychange', visibility);

    let heroVisible = true;
    const obs = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      if (!heroVisible) cancelAnimationFrame(state.current.rafId);
      else loop();
    });
    obs.observe(canvas);

    function loop() {
      const s = state.current;
      if (!heroVisible || document.hidden || reduced) return;
      s.rafId = requestAnimationFrame(loop);

      s.t++;
      ctx!.clearRect(0, 0, s.W, s.H);

      const gY = s.H * 0.88;
      const { top } = getSkyColors(s.t);
      ctx!.fillStyle = top;
      ctx!.fillRect(0, 0, s.W, s.H);

      // clouds with parallax
      s.clouds.forEach(c => {
        c.x -= c.sp;
        if (c.x + c.size * 40 < 0) c.x = s.W + 20;
        drawCloud(ctx!, c.x + (isMobile ? 0 : s.mouseParallax * 0.05), c.y, c.size);
      });

      drawHills(ctx!, s.W, gY, isMobile ? 0 : s.mouseParallax);
      drawGround(ctx!, s.W, gY);

      // pipes
      [s.W * 0.22 - 20, s.W * 0.78 - 20].forEach(px => {
        drawPipe(ctx!, px, gY);
      });

      // qblocks
      s.qblocks.forEach(b => {
        updateQBlock(b);
        drawQBlock(ctx!, b, s.t);
      });

      // coins
      if (!isMobile) {
        const now = Date.now();
        s.coins.forEach(c => {
          updateCoin(c, now);
          drawCoin(ctx!, c, s.t);
        });
      }

      // Mario logic
      const groundY = gY - MARIO_H;
      let frame: 0 | 1 | 2 = s.marioFrame;

      if (s.marioManual) {
        s.marioManualTimer--;
        if (s.marioManualTimer <= 0) { s.marioManual = false; }

        const inp = s.marioInput;
        if (inp.crouch && !s.marioJumping) {
          frame = 2;
        }
        if (inp.right) { s.marioX += 2; s.marioFacingRight = true; }
        if (inp.left) { s.marioX -= 2; s.marioFacingRight = false; }
        if ((inp.jump || inp.right || inp.left) && !s.marioJumping && !inp.crouch) {
          s.marioJumping = true; s.marioVY = -8;
        }
      } else {
        // auto-patrol toward mouse or just run
        const targetX = isMobile ? s.marioX + 0.9 : (s.mouseX > 0 ? s.mouseX * (s.W / window.innerWidth) : s.marioX + 0.9);
        const dx = targetX - s.marioX;
        if (Math.abs(dx) > 2) {
          s.marioX += Math.sign(dx) * Math.min(Math.abs(dx) * 0.05 + 0.9, 2);
          s.marioFacingRight = dx > 0;
        } else {
          s.marioX += 0.9;
        }

        s.marioJumpTimer--;
        if (s.marioJumpTimer < 0 && !s.marioJumping) {
          s.marioJumping = true;
          s.marioVY = -8;
          s.marioJumpTimer = 200 + Math.random() * 200;
          s.play('jump');
        }
      }

      if (s.marioX > s.W * 0.85) s.marioX = s.W * 0.05;
      if (s.marioX < 0) s.marioX = s.W * 0.85;

      if (s.marioJumping) {
        s.marioY += s.marioVY;
        s.marioVY += 0.4;
        if (s.marioY >= 0) { s.marioY = 0; s.marioJumping = false; }
        if (frame !== 2) frame = 0;
      }

      s.marioFrameTimer++;
      if (s.marioFrameTimer > 12 && frame !== 2) {
        s.marioFrameTimer = 0;
        s.marioFrame = s.marioFrame === 0 ? 1 : 0;
        frame = s.marioFrame;
      }

      drawMario(ctx!, s.marioX, groundY + s.marioY, frame, s.marioFacingRight);
    }

    loop();

    return () => {
      cancelAnimationFrame(state.current.rafId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', visibility);
      obs.disconnect();
    };
  }, [init, isMobile, play, reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
