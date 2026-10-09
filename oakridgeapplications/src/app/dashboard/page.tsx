import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Header from '@/components/Header';
import { connectToDatabase } from '@/lib/mongodb';
import ApplicationModel from '@/models/Application';
import { APPLICATION_STATUS, DEPARTMENTS } from '@/config/config';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/');

  await connectToDatabase();
  const applications = await ApplicationModel.find({ userId: session.user.id }).sort({ createdAt: -1 });

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-300">Portal</p>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">My Application Dashboard</h1>
          </div>
          <a href="/applications" className="inline-flex rounded-lg border border-indigo-500/60 bg-indigo-600/10 px-4 py-2 text-sm font-medium text-indigo-200 transition hover:bg-indigo-600/20">
            New Application
          </a>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {[
            { label: 'Pending', value: applications.filter((app: any) => app.status === APPLICATION_STATUS.PENDING).length },
            { label: 'Approved', value: applications.filter((app: any) => app.status === APPLICATION_STATUS.APPROVED).length },
            { label: 'Denied', value: applications.filter((app: any) => app.status === APPLICATION_STATUS.DENIED).length },
          ].map((card) => (
            <div key={card.label} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg shadow-black/20">
              <p className="text-sm text-zinc-400">{card.label}</p>
              <p className="mt-4 text-3xl font-bold text-white">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {applications.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900 p-8 text-center text-zinc-400">
              No applications yet. Start by submitting your first department application.
            </div>
          ) : (
            applications.map((app: any) => (
              <div key={app._id.toString()} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg shadow-black/20">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">{app.departmentId}</p>
                    <h2 className="mt-2 text-xl font-semibold text-white">{DEPARTMENTS.find((dept) => dept.id === app.departmentId)?.name || app.departmentId}</h2>
                  </div>
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                    app.status === APPLICATION_STATUS.APPROVED
                      ? 'bg-emerald-500/15 text-emerald-300'
                      : app.status === APPLICATION_STATUS.DENIED
                        ? 'bg-red-500/15 text-red-300'
                        : app.status === APPLICATION_STATUS.UNDER_REVIEW
                          ? 'bg-yellow-500/15 text-yellow-300'
                          : 'bg-indigo-500/15 text-indigo-300'
                  }`}>
                    {app.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Submitted</p>
                    <p className="mt-2 text-sm text-zinc-200">{new Date(app.submittedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Reviewed</p>
                    <p className="mt-2 text-sm text-zinc-200">{app.reviewedAt ? new Date(app.reviewedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Pending'}</p>
                  </div>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Notes</p>
                    <p className="mt-2 text-sm text-zinc-200">{app.reviewNotes || 'No notes yet.'}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
