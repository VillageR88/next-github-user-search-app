/* eslint-disable @next/next/no-page-custom-font */

import './globals.css';
import type { Metadata } from 'next';
import DataProvider from '@/app/_providers/DataContext';
import MainContextProvider from '@/app/_providers/MainContext';
import SidebarContextProvider from '@/app/_providers/SidebarContext';
import { Roboto, Roboto_Mono, Roboto_Slab, Instrument_Sans } from 'next/font/google';

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

const roboto = Roboto({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['100', '300', '400', '500', '700', '900'],
});

const robotoSlab = Roboto_Slab({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-roboto-slab',
});

const instrumentSans = Instrument_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-instrument-sans',
});

export const metadata: Metadata = {
  title: 'MARKDOWN',
  description: 'In-browser markdown editor application',
  //applicationName: 'My App',
} as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="hidden" lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>

        <meta property="og:image" content="/Markdown.png" />
      </head>
      <body
        className={`${roboto.variable} ${roboto_mono.variable} ${robotoSlab.variable} ${instrumentSans.variable} bg-[#fcfcfc] dark:bg-[#1D1F22]`}
      >
        <DataProvider>
          <MainContextProvider>
            <SidebarContextProvider>{children}</SidebarContextProvider>
          </MainContextProvider>
        </DataProvider>
      </body>
    </html>
  );
}
