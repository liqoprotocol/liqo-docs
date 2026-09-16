import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

export default function sitemap(): MetadataRoute.Sitemap {
  return source.getPages().map((page) => ({
    url: `https://docs.liqo.network${page.url}`,
    changeFrequency: 'weekly',
    priority: page.url === '/docs' ? 1 : 0.7,
  }));
}
