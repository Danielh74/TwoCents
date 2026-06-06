import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from '../components/Sidebar';
import { ThemeProvider } from '../components/ThemeProvider'
import { SettingsProvider } from '../lib/settings-context'
import { DirectionProvider } from '../components/DirectionProvider'
import { TransactionsProvider } from '../lib/transactions-context'
import { getTransactionsFromDb } from '../lib/db/transactions'

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialTransactions = await getTransactionsFromDb();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-row bg-gray-100 dark:bg-gray-900 dark:text-white">
        <ThemeProvider>
          <SettingsProvider>
            <TransactionsProvider initialTransactions={initialTransactions}>
              <DirectionProvider />
              <Sidebar />
              <aside className="hidden md:flex md:w-48 lg:w-52 shrink-0" />
              <main className="flex-1 p-4 pb-20 md:pb-4 rounded-2xl overflow-auto min-w-0">
                {children}
              </main>
            </TransactionsProvider>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
