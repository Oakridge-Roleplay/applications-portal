import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Header from '@/components/Header';
import { DEPARTMENTS } from '@/config/config';

const formQuestions = {
  sahp: [
    { id: 'name', type: 'text', question: 'What is your name?', required: true },
    { id: 'age', type: 'text', question: 'What is your age?', required: true },
    { id: 'experience', type: 'textarea', question: 'Why do you want to join SAHP?', required: true },
    { id: 'rp', type: 'textarea', question: 'Describe your roleplay experience.', required: true },
  ],
  lspd: [
    { id: 'name', type: 'text', question: 'What is your name?', required: true },
    { id: 'experience', type: 'textarea', question: 'Why do you want to join LSPD?', required: true },
    { id: 'shift', type: 'select', question: 'Preferred shift?', required: true, options: ['Day', 'Night', 'Flexible'] },
  ],
};

export default async function DepartmentApplicationPage({
  params,
}: {
  params: { departmentId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/');

  const department = DEPARTMENTS.find((d) => d.id === params.departmentId);
  if (!department) redirect('/applications');

  const questions = formQuestions[params.departmentId as keyof typeof formQuestions] || [];

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Header />

      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">{department.abbreviation}</p>
          <h1 className="mt-3 text-3xl font-bold">{department.name}</h1>
          <p className="mt-3 text-zinc-400">{department.description}</p>

          <form action="/api/applications" method="POST" className="mt-8 space-y-6">
            <input type="hidden" name="departmentId" value={department.id} />

            {questions.map((question) => (
              <div key={question.id}>
                <label className="mb-2 block text-sm font-medium text-zinc-200">{question.question}</label>

                {question.type === 'textarea' ? (
                  <textarea
                    name={question.id}
                    required={question.required}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
                  />
                ) : question.type === 'select' ? (
                  <select
                    name={question.id}
                    required={question.required}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
                  >
                    <option value="">Select an option</option>
                    {(question.options || []).map((opt) => (
                      <option key={opt} value={opt}> {opt} </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name={question.id}
                    required={question.required}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
                  />
                )}
              </div>
            ))}

            <button type="submit" className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
