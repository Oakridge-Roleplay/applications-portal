import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Header from '@/components/Header';
import { DEPARTMENTS } from '@/config/config';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/');

  const role = session.user.role || 'user';
  if (role !== 'admin' && role !== 'super_admin') redirect('/dashboard');

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-indigo-300">Management</p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">Admin Panel</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {DEPARTMENTS.map((dept) => (
            <div key={dept.id} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg shadow-black/20">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{dept.abbreviation}</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">{dept.name}</h2>
                </div>
                <span className="text-3xl" aria-label={dept.name}>{dept.icon}</span>
              </div>

              <p className="mt-4 text-sm leading-6 text-zinc-400">{dept.description}</p>

              <div className="mt-6 flex gap-2">
                <button className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 transition hover:border-zinc-500">
                  Edit
                </button>
                <button className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 transition hover:border-zinc-500">
                  Disable
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
