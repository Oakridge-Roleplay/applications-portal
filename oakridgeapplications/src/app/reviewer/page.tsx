import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Header from '@/components/Header';
import { connectToDatabase } from '@/lib/mongodb';
import ApplicationModel from '@/models/Application';

export default async function ReviewerPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/');

  await connectToDatabase();
  const apps = await ApplicationModel.find({ status: { $in: ['pending', 'under_review'] } }).sort({ createdAt: -1 });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-16">
        <h1 className="text-3xl font-bold">Reviewer Queue</h1>

        <div className="mt-8 space-y-4">
          {apps.map((app: any) => (
            <div key={app._id.toString()} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">{app.departmentId}</p>
                  <h2 className="text-xl font-semibold">Application #{app._id.toString().slice(-6)}</h2>
                </div>
                <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-semibold uppercase text-yellow-300">
                  {app.status}
                </span>
              </div>

              <div className="mt-4 flex gap-3">
                <button className="rounded-lg border border-green-500 px-4 py-2 text-sm text-green-300">Approve</button>
                <button className="rounded-lg border border-red-500 px-4 py-2 text-sm text-red-300">Deny</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
