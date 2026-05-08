import { Outfit, Cormorant_Garamond } from 'next/font/google';
import "./globals.css";

// Outfit Font ကို Setup လုပ်ခြင်း
const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit', // CSS variable အနေနဲ့ သုံးဖို့
});

// Cormorant Garamond Font ကို Setup လုပ်ခြင်း
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
});

export const metadata = {
  title: "AsiaBuddy | Your Gateway to Asia",
  description: "Explore Asia Like a Local",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${cormorant.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}