import './globals.css';
import type { Metadata } from 'next';
import { Space_Mono } from 'next/font/google';
import DataProvider from '@/app/_providers/DataContext';

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
});

export const metadata: Metadata = {
  title: 'Github User Search App',
  description: 'Github User Search Application',
  applicationName: 'Github User Search App',
} as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="hidden" lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
        <meta property="og:image" content={undefined} />
      </head>
      <body className={`${spaceMono.variable} bg-[#F6F8FF] transition-colors dark:bg-[#141D2F]`}>
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
