import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** 与 app/icon.svg 同一个标记，但 iOS 会自己切圆角，所以底是整块方形 */
export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1d4d3f',
          color: '#ffffff',
          fontFamily: 'Plex',
          fontWeight: 600,
          fontSize: 108,
        }}
      >
        P
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Plex',
          data: readFileSync(join(process.cwd(), 'app/og/og-plex.ttf')),
          weight: 600,
          style: 'normal',
        },
      ],
    },
  );
}
