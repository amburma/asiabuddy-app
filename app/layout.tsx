import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair',
  style: ['italic', 'normal'],
  weight: ['400', '700', '900']
});

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter' 
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}