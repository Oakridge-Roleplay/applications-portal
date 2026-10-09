import Link from 'next/link';
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <Header />

      <section className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),transparent_25%)]" />

        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-indigo-200">
              Oakridge Roleplay
            </div>

            <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
              Build your future in <span className="text-indigo-400">Oakridge</span>.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
              Join the official Oakridge Roleplay application portal. Sign in with Discord, apply for a department, and track your status from a single place.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/applications" className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-500">
                Apply Now
              </Link>
              <Link href="/dashboard" className="rounded-xl border border-zinc-700 bg-zinc-900/80 px-6 py-3 text-sm font-semibold text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-800">
                My Dashboard
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { label: 'Departments', value: '7' },
                { label: 'Applications', value: 'Live' },
                { label: 'Status', value: '1 Click' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 shadow-lg shadow-black/20">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-zinc-800 bg-zinc-900/90 p-6 shadow-[0_30px_60px_rgba(15,23,42,0.65)] backdrop-blur-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">Open Roles</p>
                <h2 className="mt-2 text-2xl font-bold text-white">Departments</h2>
              </div>
              <div className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                Open
              </div>
            </div>

            <div className="space-y-3">
              {[
                { title: 'SAHP', tone: 'text-blue-300', badge: 'Highway Patrol' },
                { title: 'LSPD', tone: 'text-cyan-300', badge: 'Police' },
                { title: 'BCSO', tone: 'text-violet-300', badge: 'Sheriff' },
                { title: 'SAFD', tone: 'text-red-300', badge: 'Fire' },
                { title: 'Dispatch', tone: 'text-emerald-300', badge: 'Communications' },
                { title: 'Staff Team', tone: 'text-amber-300', badge: 'Admin' },
              ].map((role) => (
                <div key={role.title} className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-3">
                  <div>
                    <div className={`font-semibold ${role.tone}`}>{role.title}</div>
                    <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">{role.badge}</div>
                  </div>
                  <div className="rounded-full border border-indigo-500/40 bg-indigo-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-indigo-200">
                    Join
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
