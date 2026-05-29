import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from '../components/Sidebar';
import MobileNav from '../components/MobileNav';
import { ThemeProvider } from '../components/ThemeProvider'
import { SettingsProvider } from '../lib/settings-context'

export const dynamic = 'force-dynamic';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TwoCents",
  description: "Your personal finance tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-row bg-gray-100 dark:bg-gray-900 dark:text-white">
        <ThemeProvider>
          <SettingsProvider>
            <aside className="hidden md:flex flex-1">
              <Sidebar />
            </aside>
            <main className="flex-4 py-4 pr-4 pl-4 md:pl-0 pb-20 md:pb-4 rounded-2xl overflow-auto min-w-0">
              {children}
            </main>
            <MobileNav />
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
