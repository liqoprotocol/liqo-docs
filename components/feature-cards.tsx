import Link from 'next/link';
import { Rocket, Webhook, BookOpenText, ShieldCheck } from 'lucide-react';
import type { ComponentType } from 'react';

const FEATURES: { title: string; description: string; href: string; icon: ComponentType<{ className?: string }> }[] = [
  {
    title: 'Getting Started',
    description: 'Accept your first payment in about five minutes.',
    href: '/docs/getting-started',
    icon: Rocket,
  },
  {
    title: 'Webhooks',
    description: 'Verify signed events and fulfill orders securely.',
    href: '/docs/webhooks',
    icon: Webhook,
  },
  {
    title: 'API Reference',
    description: 'Every method, parameter, and return type.',
    href: '/docs/api-reference',
    icon: BookOpenText,
  },
  {
    title: 'Best Practices',
    description: 'Recommendations for a robust production integration.',
    href: '/docs/best-practices',
    icon: ShieldCheck,
  },
];

export function FeatureCards() {
  return (
    <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
      {FEATURES.map(({ title, description, href, icon: Icon }, i) => (
        <Link
          key={href}
          href={href}
          className="liqo-hero-card liqo-fade-up group flex flex-col gap-2 rounded-xl border border-fd-border bg-fd-card/60 p-5 text-left no-underline"
          style={{ animationDelay: `${0.1 + i * 0.08}s` }}
        >
          <Icon className="size-5 text-fd-primary transition-transform group-hover:scale-110" />
          <span className="font-medium text-fd-foreground">{title}</span>
          <span className="text-sm text-fd-muted-foreground">{description}</span>
        </Link>
      ))}
    </div>
  );
}
