import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Header from '@/components/Header';
import { connectToDatabase } from '@/lib/mongodb';
import ApplicationModel from '@/models/Application';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/');

  await connectToDatabase();
  const applications = await ApplicationModel.find({ userId: session.user.id }).sort({ createdAt: -1 });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h1 className="text-3xl font-bold">My Applications</h1>

        <div className="mt-8 space-y-4">
          {applications.length === 0 ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">No applications yet.</div>
          ) : (
            applications.map((app: any) => (
              <div key={app._id.toString()} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">{app.departmentId}</p>
                    <h2 className="mt-2 text-xl font-semibold">{app.departmentId}</h2>
                  </div>
                  <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-sm font-medium text-indigo-300">
                    {app.status}
                  </span>
                </div>

                <p className="mt-4 text-zinc-400">Submitted: {new Date(app.submittedAt).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
