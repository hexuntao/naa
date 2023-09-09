import type { Metadata } from 'next';

import clsx from 'clsx';

import '@/styles/index.css';

import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'app',
  description: '',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={clsx('min-h-screen bg-background font-sans antialiased')}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          <div className="relative flex flex-col h-screen">
            <main className="container flex-grow mx-auto max-w-7xl">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
