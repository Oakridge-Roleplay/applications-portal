import Link from 'next/link';
import Header from '@/components/Header';
import { DEPARTMENTS } from '@/config/config';

export default function ApplicationsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">Departments</p>
          <h1 className="mt-3 text-4xl font-bold">Choose your department</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {DEPARTMENTS.map((dept) => (
            <Link
              key={dept.id}
              href={`/applications/${dept.id}`}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-indigo-500"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-3xl">{dept.icon}</span>
                <span className="rounded-full px-3 py-1 text-xs font-bold uppercase" style={{ backgroundColor: `${dept.color}33`, color: dept.color }}>
                  {dept.abbreviation}
                </span>
              </div>

              <h2 className="text-xl font-bold">{dept.name}</h2>
              <p className="mt-3 text-sm text-zinc-400">{dept.description}</p>

              <div className="mt-6 inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white">
                Apply Now
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
