'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-[#050816]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-black tracking-tight text-white">
            Oakridge <span className="text-indigo-400">Roleplay</span>
          </Link>

          <nav className="hidden items-center gap-5 text-sm text-zinc-300 md:flex">
            <Link href="/" className="transition hover:text-white">Home</Link>
            <Link href="/applications" className="transition hover:text-white">Applications</Link>
            <Link href="/dashboard" className="transition hover:text-white">Dashboard</Link>
            <Link href="/reviewer" className="transition hover:text-white">Reviewer</Link>
            <Link href="/admin" className="transition hover:text-white">Admin</Link>
          </nav>
        </div>

        <div>
          {status === 'loading' ? (
            <div className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-400">Loading...</div>
          ) : session ? (
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1.5 text-sm text-zinc-200 md:flex">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
                {session.user?.name}
              </div>
              <button
                onClick={() => signOut()}
                className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-800"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn('discord')}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Sign in with Discord
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
