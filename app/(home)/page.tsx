import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1 gap-4">
      <h1 className="text-3xl font-bold">Liqo Documentation</h1>
      <p className="text-fd-muted-foreground">
        Global Payments Infrastructure for Modern Businesses — accept payments in fiat, stablecoins, or crypto and
        settle in the asset you choose, through a single API.
      </p>
      <p>
        <Link href="/docs" className="font-medium underline">
          Read the docs →
        </Link>
      </p>
    </div>
  );
}
