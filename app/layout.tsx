import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Footer from '@/components/footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Appship - Your Ultimate Web Tools Platform',
    template: '%s | Appship',
  },
  description: 'Discover a comprehensive collection of AI, productivity, and development tools to streamline your workflow. Experience the future of web tools with Appship.',
  keywords: [
    'web tools',
    'AI tools',
    'productivity tools',
    'development tools',
    'online utilities',
    'code generators',
    'AI assistants',
    'web development',
    'productivity software',
    'digital tools',
    'developer resources',
    'web applications',
    'online platform',
    'tech tools',
    'software utilities',
  ],
  authors: [{ name: 'Appship Team' }],
  creator: 'Appship',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Appship - Your Ultimate Web Tools Platform',
    description: 'Discover a comprehensive collection of AI, productivity, and development tools.',
    siteName: 'Appship',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Appship - Your Ultimate Web Tools Platform',
    description: 'Discover a comprehensive collection of AI, productivity, and development tools.',
    creator: '@appship',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}