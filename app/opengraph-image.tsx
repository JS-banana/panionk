import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { heroContent } from '@/data/hero';
import { projects } from '@/data/projects';
import { siteMeta } from '@/data/site';

export const dynamic = 'force-static';
export const alt = `${siteMeta.name} · ${siteMeta.nameZh}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * 两份字体都是子集：Plex 只留 ASCII，Noto 只留这张图用到的十几个汉字，
 * 加起来不到 14KB。改动图上的中文时要回头补子集（见 AGENTS.md）。
 */
function font(file: string) {
  return readFileSync(join(process.cwd(), 'app/og', file));
}

function iconDataUri(iconPath: string) {
  const buffer = readFileSync(join(process.cwd(), 'public', iconPath));

  return `data:image/png;base64,${buffer.toString('base64')}`;
}

export default async function OpenGraphImage() {
  const icons = projects.map(project => ({
    name: project.name,
    src: iconDataUri(project.icon),
  }));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff',
          padding: '76px 84px',
          color: '#141414',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: 'Plex', fontWeight: 600, fontSize: 132, letterSpacing: 1 }}>
            {siteMeta.name}
          </div>
          <div
            style={{
              marginTop: 14,
              fontFamily: 'Plex, Noto',
              fontSize: 26,
              letterSpacing: 1.5,
              color: '#8e8e8e',
            }}
          >
            {`${siteMeta.nameZh} · ${siteMeta.handle}`}
          </div>
          <div style={{ marginTop: 46, fontFamily: 'Noto', fontSize: 52, letterSpacing: 1 }}>
            {heroContent.motto}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {icons.map((icon, index) => (
              <div
                key={icon.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 92,
                  height: 92,
                  marginLeft: index === 0 ? 0 : 20,
                  borderRadius: 46,
                  border: '1px solid #e7e7e5',
                  background: '#f7f8f7',
                }}
              >
                <img src={icon.src} alt="" width={58} height={58} />
              </div>
            ))}
          </div>

          <div style={{ fontFamily: 'Plex', fontSize: 24, letterSpacing: 1, color: '#5b5b5b' }}>
            {heroContent.signoff}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Plex', data: font('og-plex.ttf'), weight: 600, style: 'normal' },
        { name: 'Noto', data: font('og-noto.ttf'), weight: 500, style: 'normal' },
      ],
    },
  );
}
