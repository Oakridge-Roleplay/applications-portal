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
    <main className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h1 className="text-3xl font-bold">Admin Panel</h1>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {DEPARTMENTS.map((dept) => (
            <div key={dept.id} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{dept.name}</h2>
                <span className="text-2xl">{dept.icon}</span>
              </div>
              <p className="mt-3 text-sm text-zinc-400">{dept.description}</p>
              <div className="mt-5 flex gap-2">
                <button className="rounded-lg border border-zinc-700 px-3 py-2 text-sm">Edit</button>
                <button className="rounded-lg border border-zinc-700 px-3 py-2 text-sm">Disable</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
