import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // No standalone marketing homepage here - liqo-landing is the entry
  // point users are linked from, so / goes straight to the docs content.
  async redirects() {
    return [{ source: '/', destination: '/docs', permanent: true }];
  },
};

export default withMDX(config);
