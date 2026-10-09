import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Header from '@/components/Header';
import { connectToDatabase } from '@/lib/mongodb';
import ApplicationModel from '@/models/Application';
import { DEPARTMENTS, APPLICATION_STATUS } from '@/config/config';

export default async function ReviewerPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/');

  await connectToDatabase();
  const apps = await ApplicationModel.find({ status: { $in: ['pending', 'under_review'] } }).sort({ createdAt: -1 });

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-300">Staff</p>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">Reviewer Queue</h1>
          </div>
        </div>

        <div className="space-y-4">
          {apps.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900 p-8 text-center text-zinc-400">
              No pending applications at the moment.
            </div>
          ) : (
            apps.map((app: any) => {
              const department = DEPARTMENTS.find((dept) => dept.id === app.departmentId);

              return (
                <div key={app._id.toString()} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg shadow-black/20">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">{app.departmentId}</p>
                      <h2 className="mt-2 text-xl font-semibold text-white">{department?.name || 'Unknown Department'}</h2>
                    </div>
                    <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                      app.status === APPLICATION_STATUS.APPROVED
                        ? 'bg-emerald-500/15 text-emerald-300'
                        : app.status === APPLICATION_STATUS.DENIED
                          ? 'bg-red-500/15 text-red-300'
                          : 'bg-yellow-500/15 text-yellow-300'
                    }`}>
                      {app.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {app.answers.map((answer: any) => (
                      <div key={answer.questionId} className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">{answer.questionId}</p>
                        <p className="mt-2 text-sm text-zinc-200">{Array.isArray(answer.answer) ? answer.answer.join(', ') : String(answer.answer)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button className="rounded-lg border border-emerald-500/60 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/15">
                      Approve
                    </button>
                    <button className="rounded-lg border border-red-500/60 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/15">
                      Deny
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
