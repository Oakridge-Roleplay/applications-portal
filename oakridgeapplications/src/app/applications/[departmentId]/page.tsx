import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Header from '@/components/Header';
import { DEPARTMENTS } from '@/config/config';

const formQuestions: Record<string, Array<{ id: string; type: 'text' | 'textarea' | 'select'; question: string; required: boolean; options?: string[] }>> = {
  sahp: [
    { id: 'name', type: 'text', question: 'What is your full name?', required: true },
    { id: 'age', type: 'text', question: 'What is your age?', required: true },
    { id: 'experience', type: 'textarea', question: 'Why do you want to join SAHP?', required: true },
    { id: 'rp', type: 'textarea', question: 'Describe your roleplay experience and character history.', required: true },
    { id: 'availability', type: 'select', question: 'Preferred shift availability', required: true, options: ['Day', 'Night', 'Flexible'] },
  ],
  lspd: [
    { id: 'name', type: 'text', question: 'What is your full name?', required: true },
    { id: 'experience', type: 'textarea', question: 'Why do you want to join LSPD?', required: true },
    { id: 'rp', type: 'textarea', question: 'Tell us about your prior roleplay background.', required: true },
    { id: 'shift', type: 'select', question: 'Preferred shift', required: true, options: ['Day', 'Night', 'Flexible'] },
  ],
  bcso: [
    { id: 'name', type: 'text', question: 'What is your full name?', required: true },
    { id: 'experience', type: 'textarea', question: 'Why do you want to join BCSO?', required: true },
    { id: 'rp', type: 'textarea', question: 'What makes you a strong county law enforcement candidate?', required: true },
  ],
  safd: [
    { id: 'name', type: 'text', question: 'What is your full name?', required: true },
    { id: 'experience', type: 'textarea', question: 'Why do you want to join SAFD?', required: true },
    { id: 'rp', type: 'textarea', question: 'Describe your emergency response experience or training.', required: true },
  ],
  dispatch: [
    { id: 'name', type: 'text', question: 'What is your full name?', required: true },
    { id: 'experience', type: 'textarea', question: 'Why do you want to work communications and dispatch?', required: true },
    { id: 'communication', type: 'textarea', question: 'How do you handle tense, fast-paced communication situations?', required: true },
  ],
  civilian: [
    { id: 'name', type: 'text', question: 'What is your full name?', required: true },
    { id: 'experience', type: 'textarea', question: 'What civilian role are you interested in?', required: true },
    { id: 'background', type: 'textarea', question: 'Tell us about your character or business background.', required: true },
  ],
  staff: [
    { id: 'name', type: 'text', question: 'What is your full name?', required: true },
    { id: 'experience', type: 'textarea', question: 'Why do you want to join the staff team?', required: true },
    { id: 'strengths', type: 'textarea', question: 'What strengths would you bring to administration or moderation?', required: true },
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

  const questions = formQuestions[params.departmentId] || [];

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <Header />

      <div className="mx-auto max-w-3xl px-4 py-10 md:py-16">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 md:p-8 shadow-2xl shadow-black/40">
          <p className="text-xs uppercase tracking-[0.3em] text-indigo-300">{department.abbreviation}</p>
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
                    rows={5}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-white outline-none transition focus:border-indigo-500"
                  />
                ) : question.type === 'select' ? (
                  <select
                    name={question.id}
                    required={question.required}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-white outline-none transition focus:border-indigo-500"
                  >
                    <option value="">Select an option</option>
                    {(question.options || []).map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name={question.id}
                    required={question.required}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-white outline-none transition focus:border-indigo-500"
                  />
                )}
              </div>
            ))}

            <div className="flex items-center justify-between gap-4 border-t border-zinc-800 pt-6">
              <a href="/applications" className="text-sm text-zinc-400 hover:text-zinc-200">
                Back to departments
              </a>
              <button type="submit" className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500">
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
