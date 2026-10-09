import Link from 'next/link';
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Header />

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-block rounded-full border border-indigo-500/50 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
              Oakridge Roleplay
            </p>
            <h1 className="text-5xl font-black tracking-tight md:text-6xl">
              Official application portal for our community.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-zinc-300">
              Join the server, apply for a department, track your application, and let staff review everything in one secure portal.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/applications" className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white">
                Apply Now
              </Link>
              <Link href="/dashboard" className="rounded-lg border border-zinc-700 px-6 py-3 font-semibold text-white">
                My Dashboard
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
            <div className="grid gap-4">
              {[
                'SAHP',
                'LSPD',
                'BCSO',
                'SAFD',
                'Dispatch',
                'Civilian Ops',
                'Staff Team',
              ].map((item, idx) => (
                <div key={item} className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3">
                  <span className="text-zinc-200">{item}</span>
                  <span className="text-sm text-indigo-300">{idx < 3 ? 'Open' : 'Applications'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
