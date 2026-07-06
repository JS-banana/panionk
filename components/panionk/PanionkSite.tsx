'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Bot,
  Box,
  BrainCircuit,
  Crosshair,
  FileText,
  Github,
  Globe2,
  MessageCircle,
  Network,
  PenLine,
  Sparkles,
} from 'lucide-react';
import { projects } from '@/data/projects';

const navItems = [
  { label: 'Work', href: '#projects' },
  { label: 'Notes', href: '#learning' },
  { label: 'Elsewhere', href: '#elsewhere' },
];

const identityChips = [
  { label: 'AI Applications', icon: BrainCircuit },
  { label: 'Agent Workflows', icon: Network },
  { label: 'Product Thinking', icon: Box },
  { label: 'Creative Execution', icon: Sparkles },
];

const trailCards = [
  {
    title: '博客',
    meta: 'blog.laifuyou.com',
    text: '后续主要沉淀 AI、Agent、全栈应用和产品实践，也记录长期技术思考。',
    href: 'https://blog.laifuyou.com',
    items: ['AI 应用', 'Agent 实践', '全栈产品'],
  },
  {
    title: '公众号',
    meta: '孙小帅 kk',
    text: '用更易懂的大白话，记录 AI 应用开发、产品思维、生活体验和创造者视角。',
    href: '/wechat.png',
    items: ['生活感悟', '技术大白话', '创造者视角'],
  },
  {
    title: '掘金',
    meta: 'juejin.cn',
    text: '在掘金记录技术分析、实践拆解和社区交流。',
    href: 'https://juejin.cn/user/1204720476890477',
    items: ['技术分析', '实践复盘', '社区交流'],
  },
  {
    title: '项目实践',
    meta: 'github.com/JS-banana',
    text: '把想法做成可运行的产品和工具，在真实使用里继续迭代。',
    href: 'https://github.com/JS-banana',
    items: ['AI Tools', 'Product Systems', 'Real-world Test'],
  },
];

const finalLinks = [
  { label: 'GitHub', hint: 'JS-banana', href: 'https://github.com/JS-banana', icon: Github },
  { label: 'Blog', hint: 'blog.laifuyou.com', href: 'https://blog.laifuyou.com', icon: FileText },
  { label: 'WeChat', hint: '孙小帅 kk', href: '/wechat.png', icon: MessageCircle },
  { label: 'Juejin', hint: '技术分析与实践复盘', href: 'https://juejin.cn/user/1204720476890477', icon: PenLine },
  { label: 'X', hint: '@pandionkk', href: 'https://x.com/pandionkk', icon: Globe2 },
];

function useScrollHud() {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const stopProgress = scrollYProgress.on('change', value => setProgress(Math.round(value * 100)));

    return () => stopProgress();
  }, [scrollYProgress]);

  useEffect(() => {
    let lastY = window.scrollY;
    let lastAt = performance.now();
    let idleTimer: number | undefined;

    const updateSpeed = () => {
      const now = performance.now();
      const elapsed = Math.max(16, now - lastAt);
      const value = window.scrollY;
      const nextSpeed = Math.min(80, (Math.abs(value - lastY) / elapsed) * 16);

      lastY = value;
      lastAt = now;
      if (idleTimer) window.clearTimeout(idleTimer);
      setSpeed(nextSpeed);
      idleTimer = window.setTimeout(() => setSpeed(0), 140);
    };

    window.addEventListener('scroll', updateSpeed, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateSpeed);
      if (idleTimer) window.clearTimeout(idleTimer);
    };
  }, []);

  return { progress, speed };
}

function Sprite({
  name,
  className = '',
  style,
}: {
  name: 'coin' | 'sparkle' | 'question' | 'block' | 'robot' | 'robotRun' | 'cursor' | 'bot' | 'redSpark' | 'node' | 'routeDot' | 'particle';
  className?: string;
  style?: React.CSSProperties;
}) {
  return <span aria-hidden="true" className={`sprite sprite-${name} ${className}`} style={style} />;
}

function RunnerSprite({ speed }: { speed: number }) {
  const mode = speed > 18 ? 'run' : speed > 1.5 ? 'walk' : 'idle';
  const duration = mode === 'idle' ? 1.1 : mode === 'run' ? Math.max(0.22, 0.52 - speed / 180) : Math.max(0.38, 0.82 - speed / 60);

  return (
    <span
      aria-label="PANIONK runner"
      className={`runner-sprite runner-${mode}`}
      role="img"
      style={{ '--runner-duration': `${duration}s` } as CSSProperties}
    />
  );
}

function ChromeNav({ progress, speed }: { progress: number; speed: number }) {
  return (
    <header className="site-chrome" aria-label="Primary navigation">
      <a className="brand" href="#hero">PANIONK</a>
      <nav className="nav-links">
        {navItems.map(item => (
          <a key={item.href} href={item.href}>{item.label}</a>
        ))}
      </nav>
      <div className="chrome-status">
        <span>SCROLL PROGRESS</span>
        <span className="progress-rail" style={{ '--progress': `${progress}%` } as CSSProperties} />
        <strong>{progress}%</strong>
        <span className="score">SCORE</span>
        <Sprite name="coin" className="mini-sprite" />
        <strong>{String(126 + progress).padStart(4, '0')}</strong>
        <RunnerSprite speed={speed} />
      </div>
    </header>
  );
}

function HudPill({ icon: Icon, label }: { icon: typeof Bot; label: string }) {
  return (
    <div className="hud-pill">
      <Icon size={27} strokeWidth={1.4} />
      <span>{label}</span>
    </div>
  );
}

function HeroSection({ progress }: { progress: number }) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.22], [0, prefersReducedMotion ? 0 : -64]);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg" />
      <motion.div className="coin-path" style={{ y }}>
        <Sprite name="coin" className="path-coin coin-a" />
        <Sprite name="coin" className="path-coin coin-b" />
        <Sprite name="coin" className="path-coin coin-c" />
        <span className="path-line" />
      </motion.div>
      <div className="hero-content">
        <div className="hero-hud">
          <HudPill icon={Bot} label="AI Maker" />
          <HudPill icon={Network} label="Agent Practice" />
          <HudPill icon={Crosshair} label="HZ - 26" />
          <HudPill icon={FileText} label="Build Log" />
        </div>
        <h1>PANIONK</h1>
        <p className="hero-role">AI BUILDER / AGENT MAKER / PRODUCT-MINDED DEVELOPER</p>
        <p className="hero-copy">关注 AI 与智能体，把想法做成可以运行的应用。</p>
        <p className="hero-copy muted">Building AI tools, agent workflows, and useful small products.</p>
        <div className="hero-actions">
          <a className="primary-cta" href="#projects">
            Explore work
            <Sprite name="redSpark" className="cta-spark" />
          </a>
          <a className="ghost-cta" href="https://github.com/JS-banana" target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="scroll-cue-new">
          <span className="mouse-icon" />
          <span>SCROLL TO COLLECT</span>
          <i />
        </div>
      </div>
      <div className="drag-card">
        <span>DRAG TO BUILD</span>
        <div className="drop-zone">
          <Box size={34} strokeWidth={1.3} />
          <Sprite name="cursor" />
        </div>
      </div>
      <div className="archive-map">
        <span>ARCHIVE MAP</span>
        <div>
          {Array.from({ length: 20 }).map((_, index) => <i key={index} className={index === Math.floor(progress / 5) ? 'active' : ''} />)}
        </div>
      </div>
    </section>
  );
}

function IdentitySection() {
  return (
    <section id="identity" className="identity-section section-frame">
      <div className="section-kicker"><span>02 / 05</span><i />IDENTITY / AI MAKER PROFILE</div>
      <div className="identity-grid">
        <div className="identity-copy">
          <h2><span>AI</span> MAKER,<br />PRODUCT BUILDER</h2>
          <p className="zh">我关注 AI、智能体和应用开发，把学习、想法和问题意识变成可以使用的东西。</p>
          <p>Learning in public. Shipping in small loops.</p>
          <div className="chip-grid">
            {identityChips.map(({ label, icon: Icon }) => (
              <a className="identity-chip" key={label} href="#projects">
                <Icon size={30} strokeWidth={1.3} />
                <span>{label}</span>
              </a>
            ))}
          </div>
          <a className="inline-link" href="#learning">Read the build notes <ArrowUpRight size={18} /></a>
        </div>
        <div className="silhouette-panel">
          <div className="silhouette-img" />
          <AgentLoop />
          <div className="note note-one">问题意识<br />找到真正的需求<br />拆解、验证、解决</div>
          <div className="note note-two">构建有用的东西：<br />解决实际问题<br />创造正向影响<br />长期主义</div>
        </div>
      </div>
      <div className="legend-row">
        <span><i className="red" />BUILDING</span>
        <span><i className="green" />THINKING</span>
        <span><i className="cyan" />SHIPPING</span>
        <span className="interaction-hints">SCROLL: silhouette glow responds · NODES: agent paths pulse · HOVER: chips magnetize</span>
      </div>
    </section>
  );
}

function AgentLoop() {
  const nodes = ['OBSERVE', 'PLAN', 'ACT', 'REFLECT'];
  return (
    <div className="agent-loop" aria-hidden="true">
      <svg viewBox="0 0 300 520">
        <path d="M92 34 C246 83 190 160 240 210 C274 268 139 309 198 376 C235 423 147 466 92 490" />
        {[42, 164, 290, 424].map((y, index) => <circle key={y} cx={index % 2 ? 232 : 112} cy={y} r="7" />)}
      </svg>
      {nodes.map((node, index) => <span key={node} className={`loop-node loop-${index}`}>{node}</span>)}
    </div>
  );
}

function ProjectPreview({ name }: { name: string }) {
  if (name === 'ANYCHAT') {
    return (
      <div className="mock-window chat-preview">
        <div className="window-top"><span /><span /><span /></div>
        {['Claude 3.5 Sonnet', 'GPT-4o', 'Gemini 1.5 Pro'].map((item, index) => (
          <div key={item} className="chat-row">
            <i>{index + 1}</i>
            <span>{item}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mock-window keeper-preview">
      <div className="window-top"><span /><span /><span /></div>
      <div className="vault-row active">My Workspace</div>
      <div className="vault-row">Research Lab</div>
      <div className="keeper-card">meeting-notes.md<br /><small>Key takeaways saved locally.</small></div>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="projects-section">
      <div className="paper-panel">
        <div className="section-kicker dark"><span>03 / 05</span><i />PROJECTS</div>
        <div className="section-heading center">
          <h2>PUBLIC <span>BUILDS</span></h2>
          <p>A growing shelf of tools and systems I actually use.</p>
          <a href="https://github.com/JS-banana" target="_blank" rel="noreferrer">View all on GitHub <ArrowUpRight size={18} /></a>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <a className="project-card" href={project.href} target="_blank" rel="noreferrer" key={project.name}>
              <div className="insert-label">INSERT TO RUN <span>{index + 1}</span></div>
              <div className="project-main">
                <div className="project-copy">
                  <div className="project-title-line">
                    <h3>{project.name}</h3>
                    <span className="public-dot">PUBLIC</span>
                  </div>
                  <p className="project-zh">{project.zh}</p>
                  <p>{project.en}</p>
                  <div className="project-labels">
                    {project.labels.map(label => <span key={label}>{label}</span>)}
                  </div>
                </div>
                <ProjectPreview name={project.name} />
              </div>
              <div className="project-bottom">
                <span><Sprite name="coin" className="tiny-coin" /> COIN × {project.name === 'ANYCHAT' ? 24 : 31}</span>
                <strong>OPEN <ArrowUpRight size={20} /></strong>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function LearningTrailSection({ progress }: { progress: number }) {
  return (
    <section id="learning" className="learning-section">
      <div className="learning-map">
        <div className="section-kicker dark"><span>04 / 05</span><i />WRITING / LEARNING TRAIL</div>
        <div className="route-legend">
          <strong>ROUTE MAP</strong>
          {['Capture', 'Think', 'Write', 'Share'].map((item, index) => <span key={item} className={`dot-${index}`}>{item}</span>)}
        </div>
        <svg className="route-lines" viewBox="0 0 760 560" aria-hidden="true">
          <path d="M188 112 C354 110 298 220 430 210 C566 201 498 350 640 356 C727 370 604 470 700 514" />
          <path d="M96 390 C230 321 285 451 414 385 C530 326 556 446 672 420" />
        </svg>
        {trailCards.map((card, index) => (
          <a href={card.href} className={`trail-card trail-card-${index}`} key={card.title} target={card.href.startsWith('http') || card.href.endsWith('.png') ? '_blank' : undefined} rel="noreferrer">
            <div className="window-top"><span /><span /><span /></div>
            <h3>{card.title}</h3>
            <strong>{card.meta}</strong>
            <p>{card.text}</p>
            <ul>
              {card.items.map(item => <li key={item}>{item}</li>)}
            </ul>
          </a>
        ))}
        <div className="stamp">KEEP BUILDING</div>
      </div>
      <div className="learning-copy">
        <div className="trail-status">
          <span>TRAIL STATUS</span>
          <i style={{ '--progress': `${Math.max(18, Math.min(100, progress))}%` } as CSSProperties} />
          <strong>{Math.max(63, progress)}%</strong>
        </div>
        <h2>LEARNING <span>TRAIL</span></h2>
        <p>AI, agents, products, and the notes left behind while building.</p>
        <p className="zh">把学习过程留下来，也把问题意识做出来。</p>
        <div className="learning-actions">
          <a className="ghost-cta" href="https://blog.laifuyou.com" target="_blank" rel="noreferrer">READ NOTES <ArrowUpRight size={18} /></a>
          <a className="inline-link" href="https://blog.laifuyou.com" target="_blank" rel="noreferrer">BLOG <ArrowUpRight size={18} /></a>
        </div>
        <div className="how-it-works">
          <strong>HOW IT WORKS</strong>
          <span>Capture 记录灵感与问题</span>
          <span>Think 拆解与学习</span>
          <span>Write 整理成文章与笔记</span>
          <span>Share 发布与交流</span>
        </div>
      </div>
    </section>
  );
}

function FooterSection({ progress }: { progress: number }) {
  return (
    <section id="elsewhere" className="footer-section">
      <div className="section-index">05 / 05</div>
      <div className="end-progress">SCROLL {progress}% <i style={{ '--progress': `${progress}%` } as CSSProperties} /></div>
      <div className="portal-frame">
        <div className="portal-top"><span /><span /><span /><strong>PANIONK PORTAL</strong></div>
        <div className="portal-window">
          <div className="portal-glow" />
          <p>THANKS FOR<br />EXPLORING.</p>
          <p>SEE YOU ON<br />THE OTHER SIDE.</p>
        </div>
        <span className="exit-label">EXIT</span>
      </div>
      <h2>FOLLOW <span>THE</span> TRAIL</h2>
      <p className="footer-copy">Work, writing, code, and small signals from PANIONK.</p>
      <div className="final-links">
        {finalLinks.map(({ label, hint, href, icon: Icon }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer">
            <Icon size={38} strokeWidth={1.3} />
            <span><strong>{label}</strong><small>{hint}</small></span>
            <ArrowUpRight size={22} />
          </a>
        ))}
      </div>
      <a className="github-banner" href="https://github.com/JS-banana" target="_blank" rel="noreferrer">
        OPEN GITHUB <ArrowUpRight size={42} />
      </a>
      <footer className="bottom-nav">
        <span>▲ TOP</span>
        <span>01 HERO</span>
        <span>02 ABOUT</span>
        <span>03 WORK</span>
        <span>04 ELSEWHERE</span>
        <span className="active">05 EXIT</span>
        <Sprite name="robotRun" className="footer-robot" />
        <span>Hangzhou · 2026 · PANIONK</span>
      </footer>
    </section>
  );
}

export function PanionkSite() {
  const { progress, speed } = useScrollHud();
  const particles = useMemo(() => Array.from({ length: 18 }, (_, index) => index), []);

  return (
    <div className="panionk-shell">
      <ChromeNav progress={progress} speed={speed} />
      <main>
        <HeroSection progress={progress} />
        <IdentitySection />
        <ProjectsSection />
        <LearningTrailSection progress={progress} />
        <FooterSection progress={progress} />
      </main>
      <div className="ambient-particles" aria-hidden="true">
        {particles.map(index => (
          <span
            key={index}
            style={{
              left: `${(index * 37) % 100}%`,
              top: `${(index * 53) % 100}%`,
              animationDelay: `${index * -0.43}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
