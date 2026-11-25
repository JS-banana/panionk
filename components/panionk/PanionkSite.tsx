import Image from 'next/image';
import { Reveal } from '@/components/panionk/Reveal';
import { SocialDock } from '@/components/panionk/SocialDock';
import { heroContent } from '@/data/hero';
import { projects } from '@/data/projects';
import { projectSections, type ProjectSectionConfig } from '@/data/sections';
import { siteMeta } from '@/data/site';
import { urls } from '@/data/urls';

function Hero() {
  return (
    <header className="hero">
      <h1 className="wordmark">{siteMeta.name}</h1>
      <p className="handle">
        {siteMeta.nameZh} ·{' '}
        <a href={urls.github} target="_blank" rel="noopener">
          {siteMeta.handle}
        </a>
      </p>
      <p className="motto">{heroContent.motto}</p>
      <p className="lede">{heroContent.lede}</p>
    </header>
  );
}

function ProjectGroupSection({ section }: { section: ProjectSectionConfig }) {
  const items = projects.filter(project => project.group === section.group);

  return (
    <Reveal id={section.id}>
      <div className="head">
        <h2>{section.title}</h2>
        {section.moreLabel && section.moreHref ? (
          <a className="out" href={section.moreHref} target="_blank" rel="noopener">
            {section.moreLabel}
          </a>
        ) : null}
      </div>
      <div className="apps">
        {items.map(project => (
          <a className="app" key={project.name} href={project.href} target="_blank" rel="noopener">
            <span className="app-icon" aria-hidden="true">
              {project.icon ? (
                <Image src={project.icon} alt="" width={128} height={128} />
              ) : (
                project.monogram ?? project.name
              )}
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
        {projectSections.map(section => (
          <ProjectGroupSection key={section.id} section={section} />
        ))}
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
