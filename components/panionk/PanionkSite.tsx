import Image from 'next/image';
import { Reveal } from '@/components/panionk/Reveal';
import { SocialDock } from '@/components/panionk/SocialDock';
import { heroContent } from '@/data/hero';
import { projects } from '@/data/projects';
import { projectsSection } from '@/data/sections';
import { siteMeta } from '@/data/site';
import { urls } from '@/data/urls';

function Hero() {
  return (
    <header className="hero">
      <h1 className="wordmark">{siteMeta.name}</h1>
      <p className="handle">
        {siteMeta.nameZh} ·{' '}
        <a href={urls.github} target="_blank" rel="noreferrer">
          {siteMeta.handle}
        </a>
      </p>
      <p className="motto">{heroContent.motto}</p>
      <p className="lede">{heroContent.lede}</p>
    </header>
  );
}

function ProjectsSection() {
  return (
    <Reveal id="projects">
      <div className="head">
        <h2>{projectsSection.title}</h2>
      </div>
      <div className="apps">
        {projects.map(project => (
          <a className="app" key={project.name} href={project.href} target="_blank" rel="noreferrer">
            <span className="app-icon">
              <Image src={project.icon} alt="" width={128} height={128} />
            </span>
            <span className="app-name">{project.name}</span>
            <span className="app-desc">{project.desc}</span>
          </a>
        ))}
      </div>
    </Reveal>
  );
}

export function PanionkSite() {
  return (
    <div className="wrap">
      <main>
        <Hero />
        <ProjectsSection />
      </main>

      {/* 粘性页脚：内容不满一屏时贴住视口底部，超出时正常跟在后面 */}
      <footer>
        <SocialDock />
        <p className="signoff">{heroContent.signoff}</p>
        <p className="colophon">{`© ${siteMeta.year} ${siteMeta.name} · ${siteMeta.nameZh}`}</p>
      </footer>
    </div>
  );
}
