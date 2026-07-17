import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CarVibes — Find Your Perfect Car',
  description:
    'Discover, compare, and explore hundreds of vehicles on the world\'s most beautiful automotive platform. Find your perfect car with CarVibes.',
  keywords: ['cars', 'automotive', 'car comparison', 'car reviews', 'luxury cars', 'sports cars', 'electric vehicles'],
  openGraph: {
    title: 'CarVibes — Find Your Perfect Car',
    description: 'Discover, compare, and explore hundreds of vehicles on the world\'s most beautiful automotive platform.',
    type: 'website',
    siteName: 'CarVibes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CarVibes — Find Your Perfect Car',
    description: 'Discover, compare, and explore hundreds of vehicles on the world\'s most beautiful automotive platform.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#0B0B0B] font-sans text-white antialiased">
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
