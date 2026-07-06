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
  type LucideIcon,
} from 'lucide-react';
import { heroContent, heroHudPills } from '@/data/hero';
import { identityContent } from '@/data/identity';
import { footerLinks } from '@/data/links';
import { projects } from '@/data/projects';
import { footerSection, learningSection, projectsSection } from '@/data/sections';
import { identityChips, navItems, siteMeta } from '@/data/site';
import { trailCards } from '@/data/trail';

const identityIconMap = {
  'brain-circuit': BrainCircuit,
  network: Network,
  box: Box,
  sparkles: Sparkles,
} satisfies Record<(typeof identityChips)[number]['icon'], LucideIcon>;

const heroHudIconMap = {
  bot: Bot,
  network: Network,
  crosshair: Crosshair,
  'file-text': FileText,
} satisfies Record<(typeof heroHudPills)[number]['icon'], LucideIcon>;

const footerIconMap = {
  github: Github,
  'file-text': FileText,
  'message-circle': MessageCircle,
  'pen-line': PenLine,
  'globe-2': Globe2,
} satisfies Record<(typeof footerLinks)[number]['icon'], LucideIcon>;

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
      aria-label={`${siteMeta.name} runner`}
      className={`runner-sprite runner-${mode}`}
      role="img"
      style={{ '--runner-duration': `${duration}s` } as CSSProperties}
    />
  );
}

function ChromeNav({ progress, speed }: { progress: number; speed: number }) {
  return (
    <header className="site-chrome" aria-label="Primary navigation">
      <a className="brand" href="#hero">{siteMeta.name}</a>
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

function HudPill({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
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
          {heroHudPills.map(({ label, icon }) => {
            const Icon = heroHudIconMap[icon];
            return <HudPill key={label} icon={Icon} label={label} />;
          })}
        </div>
        <h1>{siteMeta.name}</h1>
        <p className="hero-role">{siteMeta.tagline}</p>
        <p className="hero-copy" lang="zh">{heroContent.copyZh}</p>
        <p className="hero-copy muted" lang="en">{heroContent.copyEn}</p>
        <div className="hero-actions">
          <a className="primary-cta" href={heroContent.primaryCta.href}>
            {heroContent.primaryCta.label}
            <Sprite name="redSpark" className="cta-spark" />
          </a>
          <a className="ghost-cta" href={heroContent.secondaryCta.href} target="_blank" rel="noreferrer">
            {heroContent.secondaryCta.label} <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="scroll-cue-new">
          <span className="mouse-icon" />
          <span>{heroContent.scrollCue}</span>
          <i />
        </div>
      </div>
      <div className="drag-card">
        <span>{heroContent.dragLabel}</span>
        <div className="drop-zone">
          <Box size={34} strokeWidth={1.3} />
          <Sprite name="cursor" />
        </div>
      </div>
      <div className="archive-map">
        <span>{heroContent.archiveMapLabel}</span>
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
      <div className="section-kicker"><span>02 / 05</span><i />{identityContent.kicker}</div>
      <div className="identity-grid">
        <div className="identity-copy">
          <h2>
            <span>{identityContent.heading[0]}</span> {identityContent.heading[1]}<br />{identityContent.heading[2]}
          </h2>
          <p className="zh" lang="zh">{identityContent.copyZh}</p>
          <p lang="en">{identityContent.copyEn}</p>
          <div className="chip-grid">
            {identityChips.map(({ label, icon }) => {
              const Icon = identityIconMap[icon];
              return (
                <a className="identity-chip" key={label} href="#projects">
                  <Icon size={30} strokeWidth={1.3} />
                  <span>{label}</span>
                </a>
              );
            })}
          </div>
          <a className="inline-link" href={identityContent.notesLink.href}>
            {identityContent.notesLink.label} <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="silhouette-panel">
          <div className="silhouette-img" />
          <AgentLoop />
          {identityContent.notes.map(note => (
            <div key={note.className} className={`note ${note.className}`}>
              {note.lines.map((line, index) => (
                <span key={line}>
                  {index > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="legend-row">
        <span><i className="red" />{identityContent.legend[0]}</span>
        <span><i className="green" />{identityContent.legend[1]}</span>
        <span><i className="cyan" />{identityContent.legend[2]}</span>
        <span className="interaction-hints">{identityContent.interactionHints}</span>
      </div>
    </section>
  );
}

function AgentLoop() {
  return (
    <div className="agent-loop" aria-hidden="true">
      <svg viewBox="0 0 300 520">
        <path d="M92 34 C246 83 190 160 240 210 C274 268 139 309 198 376 C235 423 147 466 92 490" />
        {[42, 164, 290, 424].map((y, index) => <circle key={y} cx={index % 2 ? 232 : 112} cy={y} r="7" />)}
      </svg>
      {identityContent.agentNodes.map((node, index) => (
        <span key={node} className={`loop-node loop-${index}`}>{node}</span>
      ))}
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
        <div className="section-kicker dark"><span>03 / 05</span><i />{projectsSection.kicker}</div>
        <div className="section-heading center">
          <h2>{projectsSection.title[0]} <span>{projectsSection.title[1]}</span></h2>
          <p>{projectsSection.description}</p>
          <a href={projectsSection.githubLink.href} target="_blank" rel="noreferrer">
            {projectsSection.githubLink.label} <ArrowUpRight size={18} />
          </a>
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
                  <p className="project-zh" lang="zh">{project.zh}</p>
                  <p lang="en">{project.en}</p>
                  <div className="project-labels">
                    {project.labels.map(label => <span key={label}>{label}</span>)}
                  </div>
                </div>
                <ProjectPreview name={project.name} />
              </div>
              <div className="project-bottom">
                <span><Sprite name="coin" className="tiny-coin" /> COIN × {project.coinCount}</span>
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
        <div className="section-kicker dark"><span>04 / 05</span><i />{learningSection.kicker}</div>
        <div className="route-legend">
          <strong>ROUTE MAP</strong>
          {learningSection.routeLegend.map((item, index) => (
            <span key={item} className={`dot-${index}`}>{item}</span>
          ))}
        </div>
        <svg className="route-lines" viewBox="0 0 760 560" aria-hidden="true">
          <path d="M188 112 C354 110 298 220 430 210 C566 201 498 350 640 356 C727 370 604 470 700 514" />
          <path d="M96 390 C230 321 285 451 414 385 C530 326 556 446 672 420" />
        </svg>
        {trailCards.map((card, index) => (
          <a
            href={card.href}
            className={`trail-card trail-card-${index}`}
            key={card.title}
            lang="zh"
            target={card.href.startsWith('http') || card.href.endsWith('.png') ? '_blank' : undefined}
            rel="noreferrer"
          >
            <div className="window-top"><span /><span /><span /></div>
            <h3>{card.title}</h3>
            <strong>{card.meta}</strong>
            <p>{card.text}</p>
            <ul>
              {card.items.map(item => <li key={item}>{item}</li>)}
            </ul>
          </a>
        ))}
        <div className="stamp">{learningSection.stamp}</div>
      </div>
      <div className="learning-copy">
        <div className="trail-status">
          <span>TRAIL STATUS</span>
          <i style={{ '--progress': `${Math.max(18, Math.min(100, progress))}%` } as CSSProperties} />
          <strong>{Math.max(63, progress)}%</strong>
        </div>
        <h2>{learningSection.title[0]} <span>{learningSection.title[1]}</span></h2>
        <p lang="en">{learningSection.description}</p>
        <p className="zh" lang="zh">{learningSection.copyZh}</p>
        <div className="learning-actions">
          {learningSection.actions.map(action => (
            <a
              key={action.label}
              className={action.variant === 'ghost' ? 'ghost-cta' : 'inline-link'}
              href={action.href}
              target="_blank"
              rel="noreferrer"
            >
              {action.label} <ArrowUpRight size={18} />
            </a>
          ))}
        </div>
        <div className="how-it-works">
          <strong>HOW IT WORKS</strong>
          {learningSection.howItWorks.map(item => (
            <span key={item.step}>{item.step} {item.text}</span>
          ))}
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
        <div className="portal-top"><span /><span /><span /><strong>{footerSection.portalTitle}</strong></div>
        <div className="portal-window">
          <div className="portal-glow" />
          {footerSection.portalLines.map(lines => (
            <p key={lines.join('-')}>{lines[0]}<br />{lines[1]}</p>
          ))}
        </div>
        <span className="exit-label">{footerSection.exitLabel}</span>
      </div>
      <h2>{footerSection.title[0]} <span>{footerSection.title[1]}</span> {footerSection.title[2]}</h2>
      <p className="footer-copy">{footerSection.copy}</p>
      <div className="final-links">
        {footerLinks.map(({ label, hint, href, icon }) => {
          const Icon = footerIconMap[icon];
          return (
            <a key={label} href={href} target="_blank" rel="noreferrer">
              <Icon size={38} strokeWidth={1.3} />
              <span><strong>{label}</strong><small>{hint}</small></span>
              <ArrowUpRight size={22} />
            </a>
          );
        })}
      </div>
      <a className="github-banner" href={footerSection.githubBanner.href} target="_blank" rel="noreferrer">
        {footerSection.githubBanner.label} <ArrowUpRight size={42} />
      </a>
      <footer className="bottom-nav">
        {footerSection.bottomNav.map((label, index) => (
          <span key={label} className={index === footerSection.bottomNav.length - 1 ? 'active' : undefined}>{label}</span>
        ))}
        <Sprite name="robotRun" className="footer-robot" />
        <span>{siteMeta.city} · {siteMeta.year} · {siteMeta.name}</span>
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
