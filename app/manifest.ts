import { MetadataRoute } from 'next';
import { metadata } from './layout';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: metadata.title as string,
    short_name: metadata.title as string,
    description: metadata.description ?? '',
    start_url: '/',
    lang: 'en',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#1A1A1A',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
