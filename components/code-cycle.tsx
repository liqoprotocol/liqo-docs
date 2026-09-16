'use client';

import { useEffect, useState } from 'react';

const SNIPPETS = [
  `const checkout = await liqo.pay({
  amount: 15000,
  fromCurrency: 'NGN',
  toAsset: 'USDC',
  toWallet: 'G...RECIPIENT',
});`,
  `const quote = await liqo.quote({
  amount: 15000,
  fromCurrency: 'NGN',
  toAsset: 'USDC',
});
// ≈ 9.45 USDC, fee 0.32`,
  `const event = liqo.webhooks.verify({
  payload: rawBody,
  headers: req.headers,
});
// event.event === 'transaction.completed'`,
];

const TYPE_SPEED_MS = 18;
const HOLD_MS = 2200;
const ERASE_SPEED_MS = 8;

/**
 * Purely decorative typing-effect demo for the homepage hero - cycles
 * through a few real SDK calls (verbatim from getting-started.mdx) so the
 * animation stays truthful to the actual API surface, not made-up syntax.
 */
export function CodeCycle() {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'holding' | 'erasing'>('typing');

  useEffect(() => {
    const target = SNIPPETS[snippetIndex]!;

    if (phase === 'typing') {
      if (text.length < target.length) {
        const id = setTimeout(() => setText(target.slice(0, text.length + 1)), TYPE_SPEED_MS);
        return () => clearTimeout(id);
      }
      const id = setTimeout(() => setPhase('holding'), HOLD_MS);
      return () => clearTimeout(id);
    }

    if (phase === 'holding') {
      const id = setTimeout(() => setPhase('erasing'), 0);
      return () => clearTimeout(id);
    }

    // erasing
    if (text.length > 0) {
      const id = setTimeout(() => setText(text.slice(0, -1)), ERASE_SPEED_MS);
      return () => clearTimeout(id);
    }
    setSnippetIndex((i) => (i + 1) % SNIPPETS.length);
    setPhase('typing');
  }, [text, phase, snippetIndex]);

  return (
    <div className="liqo-hero-card w-full max-w-lg rounded-xl border border-fd-border bg-fd-card/80 p-4 text-left font-mono text-xs shadow-2xl backdrop-blur sm:text-sm">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-red-500/70" />
        <span className="size-2.5 rounded-full bg-amber-500/70" />
        <span className="size-2.5 rounded-full bg-fd-primary/70" />
        <span className="ml-2 text-fd-muted-foreground">checkout.ts</span>
      </div>
      <pre className="whitespace-pre-wrap break-words text-fd-foreground">
        {text}
        <span className="liqo-caret text-fd-primary">▌</span>
      </pre>
    </div>
  );
}
