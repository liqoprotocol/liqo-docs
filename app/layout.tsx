import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Outfit } from 'next/font/google';
import type { Metadata } from 'next';

// Same typeface as liqo-landing/liqo-dashboard/liqo-checkout, exposed the
// same way (a --font-sans CSS variable consumed in global.css) so the brand
// stays consistent across every Liqo surface.
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'Liqo Docs',
    template: '%s | Liqo Docs',
  },
  description: 'Documentation for @liqo/sdk — Global Payments Infrastructure for Modern Businesses.',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${outfit.variable} font-sans`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider theme={{ defaultTheme: 'dark' }}>{children}</RootProvider>
      </body>
    </html>
  );
}
