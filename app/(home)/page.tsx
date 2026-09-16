import Link from 'next/link';
import { CodeCycle } from '@/components/code-cycle';
import { FeatureCards } from '@/components/feature-cards';

export default function HomePage() {
  return (
    <div className="relative flex flex-1 flex-col items-center overflow-hidden px-4 py-16 sm:py-24">
      {/* Decorative glow, purely CSS - respects prefers-reduced-motion via global.css */}
      <div
        aria-hidden
        className="liqo-blob pointer-events-none absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: 'radial-gradient(circle, var(--color-fd-primary), transparent 70%)' }}
      />

      <div className="liqo-fade-up relative flex flex-col items-center gap-6 text-center">
        <span className="liqo-glow-pulse rounded-full border border-fd-primary/30 bg-fd-primary/10 px-3 py-1 text-xs font-medium text-fd-primary">
          @liqo/sdk · Global Payments Infrastructure
        </span>

        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Accept payments anywhere,
          <br />
          settle in the asset you choose.
        </h1>

        <p className="max-w-xl text-fd-muted-foreground">
          One API for fiat, stablecoins, and crypto — with typed requests, verified webhooks, and
          settlement on Stellar. No reserves, no treasury, no per-provider integrations.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/docs"
            className="rounded-full bg-fd-primary px-6 py-2.5 font-semibold text-fd-primary-foreground no-underline transition-transform hover:-translate-y-0.5"
          >
            Get started →
          </Link>
          <Link
            href="/docs/api-reference"
            className="rounded-full border border-fd-border px-6 py-2.5 font-semibold text-fd-foreground no-underline transition-colors hover:border-fd-primary/50"
          >
            API Reference
          </Link>
        </div>
      </div>

      <div className="liqo-fade-up relative mt-14 flex w-full justify-center" style={{ animationDelay: '0.15s' }}>
        <CodeCycle />
      </div>

      <div className="relative mt-16 flex w-full justify-center">
        <FeatureCards />
      </div>
    </div>
  );
}
