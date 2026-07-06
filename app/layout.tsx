import type { Metadata } from 'next';
import { inter, bebasNeue } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'World Cup 2026 - Top Scorers',
  description: 'Ranking actualizado de goleadores del Mundial 2026 con Player Cards generadas por IA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${bebasNeue.variable} relative min-h-screen`} suppressHydrationWarning>
        <div className="fixed inset-0 bg-grid pointer-events-none" />
        <div className="fixed inset-0 bg-glow pointer-events-none" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}