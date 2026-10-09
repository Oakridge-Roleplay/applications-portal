import type { Metadata } from 'next';
import './globals.css';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SessionProvider from '@/components/SessionProvider';
import { DEPARTMENT } from '@/config/config';

export const metadata: Metadata = {
  title: `${DEPARTMENT.ABBREVIATION} Portal`,
  description: DEPARTMENT.DESCRIPTION,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="bg-slate-950 text-white antialiased">
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
