import type { Metadata } from 'next';
import { Inter, Lora, Noto_Sans_Arabic } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
const notoArabic = Noto_Sans_Arabic({ subsets: ['arabic'], variable: '--font-arabic' });

export const metadata: Metadata = {
  title: 'Lesson & Quiz Generator',
  description: 'Turn any topic into a ready-to-teach lesson plan and quiz.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable} ${notoArabic.variable} font-sans bg-paper text-ink`}>
        {children}
      </body>
    </html>
  );
}
