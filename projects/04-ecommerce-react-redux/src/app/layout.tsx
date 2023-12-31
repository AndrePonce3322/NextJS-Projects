import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Footer } from './components/footer';
import { NavBar } from './components/navbar/navbar';
import { NavBarResponsive } from './components/navbar/responsive/navbar-for-mobile';
import './globals.css';
import ReduxProvider from './store/ReduxProvider';
import { FullScreenComponent } from './components/sales/full-screen';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CZ Store - Tienda CZ Mobile HN',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='es'>
      <body className={inter.className}>
        <ReduxProvider>
          <NavBarResponsive />
          <NavBar />
          <FullScreenComponent />

          {children}
          <Footer />
        </ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
}
