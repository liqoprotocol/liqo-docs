import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { getPageImageUrl } from '@/lib/shared';
import { flattenTree } from 'fumadocs-core/page-tree';

export const revalidate = false;

const GREEN = '#0ffd41';
const BG = '#0a0a0a';
const SIDEBAR_BG = '#0e0e0e';
const BORDER = 'rgba(255,255,255,0.08)';
const MUTED = 'rgba(255,255,255,0.55)';
const FAINT = 'rgba(255,255,255,0.35)';

function LiqoMark({ size = 20 }: { size?: number }) {
  // Simplified single-fill version of the real Liqo mark (app/icon.svg),
  // small enough to read clearly at OG-image scale.
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <circle cx="15" cy="15" r="14" stroke={GREEN} strokeWidth="2" />
      <circle cx="15" cy="15" r="5" fill={GREEN} />
    </svg>
  );
}

export async function GET(_req: Request, { params }: RouteContext<'/og/docs/[...slug]'>) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  // Real nav order (matches meta.json), not source.getPages()'s filesystem
  // order - and always keep the current page visible + highlighted, even
  // if it'd otherwise fall outside the first N items shown.
  const orderedItems = flattenTree(source.getPageTree().children)
    .filter((item) => typeof item.url === 'string')
    .map((item) => ({ title: String(item.name), url: item.url as string }));

  const activeIndex = orderedItems.findIndex((item) => item.url === page.url);
  const VISIBLE = 9;
  let windowStart = 0;
  if (activeIndex >= VISIBLE) {
    windowStart = Math.min(activeIndex - Math.floor(VISIBLE / 2), orderedItems.length - VISIBLE);
  }
  const navItems = orderedItems
    .slice(Math.max(0, windowStart), Math.max(0, windowStart) + VISIBLE)
    .map((item) => ({ ...item, active: item.url === page.url }));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: BG,
          fontFamily: 'sans-serif',
        }}
      >
        {/* Fake browser chrome */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            height: 44,
            padding: '0 20px',
            borderBottom: `1px solid ${BORDER}`,
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', width: 12, height: 12, borderRadius: 999, backgroundColor: '#ff5f56' }} />
          <div style={{ display: 'flex', width: 12, height: 12, borderRadius: 999, backgroundColor: '#ffbd2e' }} />
          <div style={{ display: 'flex', width: 12, height: 12, borderRadius: 999, backgroundColor: GREEN }} />
          <div
            style={{
              display: 'flex',
              marginLeft: 12,
              padding: '5px 14px',
              borderRadius: 6,
              backgroundColor: 'rgba(255,255,255,0.06)',
              color: FAINT,
              fontSize: 13,
            }}
          >
            {`docs.liqo.network${page.url}`}
          </div>
        </div>

        {/* Body: sidebar + content, mimicking the real docs layout */}
        <div style={{ display: 'flex', flex: 1 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: 260,
              flexShrink: 0,
              padding: '28px 22px',
              borderRight: `1px solid ${BORDER}`,
              backgroundColor: SIDEBAR_BG,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <LiqoMark size={18} />
              <span style={{ color: 'white', fontSize: 15, fontWeight: 600 }}>Liqo Docs</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {navItems.map((item) => (
                <div
                  key={item.url}
                  style={{
                    display: 'flex',
                    padding: '6px 10px',
                    borderRadius: 6,
                    fontSize: 14,
                    color: item.active ? GREEN : MUTED,
                    backgroundColor: item.active ? 'rgba(15,253,65,0.12)' : 'transparent',
                    fontWeight: item.active ? 600 : 400,
                  }}
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '48px 56px' }}>
            <div style={{ display: 'flex', color: 'white', fontSize: 48, fontWeight: 700, lineHeight: 1.1 }}>
              {page.data.title}
            </div>
            {page.data.description ? (
              <div style={{ display: 'flex', color: MUTED, fontSize: 22, marginTop: 16, maxWidth: 620 }}>
                {page.data.description}
              </div>
            ) : null}
            <div
              style={{
                display: 'flex',
                marginTop: 28,
                width: '100%',
                borderTop: `3px dashed ${GREEN}`,
                opacity: 0.5,
              }}
            />

            {/* Decorative code-block mock, to read as "docs page" texture */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                marginTop: 32,
                padding: 20,
                borderRadius: 10,
                border: `1px solid ${BORDER}`,
                backgroundColor: 'rgba(255,255,255,0.03)',
              }}
            >
              <div style={{ display: 'flex', gap: 10, fontSize: 15, fontFamily: 'monospace' }}>
                <span style={{ color: GREEN }}>const</span>
                <span style={{ color: 'white' }}>liqo</span>
                <span style={{ color: FAINT }}>=</span>
                <span style={{ color: GREEN }}>new</span>
                <span style={{ color: 'white' }}>Liqo(apiKey);</span>
              </div>
              <div style={{ display: 'flex', width: '78%', height: 10, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.08)' }} />
              <div style={{ display: 'flex', width: '55%', height: 10, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.08)' }} />
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImageUrl(page).segments,
  }));
}
