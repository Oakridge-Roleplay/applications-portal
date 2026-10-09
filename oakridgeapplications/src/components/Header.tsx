'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold text-white">
            Oakridge Roleplay
          </Link>
          <nav className="hidden gap-5 text-sm text-zinc-300 md:flex">
            <Link href="/">Home</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/applications">Applications</Link>
            <Link href="/reviewer">Reviewer</Link>
            <Link href="/admin">Admin</Link>
          </nav>
        </div>

        <div>
          {status === 'loading' ? (
            <div className="text-sm text-zinc-400">Loading...</div>
          ) : session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-300">{session.user?.name}</span>
              <button
                onClick={() => signOut()}
                className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn('discord')}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
            >
              Sign in with Discord
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
