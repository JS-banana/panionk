'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { brandIcons } from '@/data/icons';
import { socialLinks } from '@/data/social';
import { urls } from '@/data/urls';

function Glyph({ icon }: { icon: keyof typeof brandIcons }) {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
      <path d={brandIcons[icon]} />
    </svg>
  );
}

export function SocialDock() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  /* 关闭时把焦点还给按钮。写成显式函数而不是 effect —— 用 effect 的话首次挂载
     就会命中 !open 分支，页面一加载公众号按钮就带着焦点环 */
  const close = useCallback(() => {
    setOpen(false);
    trigger.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    closeButton.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    document.addEventListener('keydown', onKey);

    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  return (
    <>
      <div className="dock">
        {socialLinks.map(link =>
          link.kind === 'wechat' ? (
            <button
              key={link.label}
              ref={trigger}
              className="dock-item"
              type="button"
              aria-label={link.label}
              onClick={() => setOpen(true)}
            >
              <Glyph icon={link.icon} />
              <span className="tip">{link.label}</span>
            </button>
          ) : (
            <a
              key={link.label}
              className="dock-item"
              href={link.href}
              target="_blank"
              rel="noopener"
              aria-label={link.label}
            >
              <Glyph icon={link.icon} />
              <span className="tip">{link.label}</span>
            </a>
          ),
        )}
      </div>

      {open ? (
        <div className="qr" onClick={event => event.target === event.currentTarget && close()}>
          <div className="qr-panel" role="dialog" aria-modal="true" aria-label="公众号二维码">
            <button ref={closeButton} className="qr-close" type="button" aria-label="关闭" onClick={close}>
              ×
            </button>
            <Image src={urls.wechat} alt="微信公众号：孙小帅 kk" width={1710} height={624} priority />
            <p className="caption">扫码或在微信搜索「孙小帅 kk」</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
