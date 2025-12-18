
import type { Metadata } from 'next';
import { Space_Grotesk, Manrope } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { DisclosureProvider } from '@/components/disclosure/DisclosureProvider';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Intuitive Blockchain Analytics Dashboard for a decentralized lending protocol.',
};

// Fonts must be loaded at module scope
const headingFont = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' });
const bodyFont = Manrope({ subsets: ['latin'], variable: '--font-body' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${headingFont.variable} ${bodyFont.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (_) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased font-body">
        <TooltipProvider delayDuration={0}>
          <DisclosureProvider>
            <Header />
            <main className="flex-1 container max-w-screen-2xl mx-auto py-8 px-4 md:px-6">
              {children}
            </main>
            <Toaster />
          </DisclosureProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
