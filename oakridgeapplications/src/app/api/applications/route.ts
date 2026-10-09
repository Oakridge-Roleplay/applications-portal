import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import ApplicationModel from '@/models/Application';
import { notifyDiscordWebhook } from '@/lib/discord';
import DepartmentModel from '@/models/Department';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const departmentId = String(formData.get('departmentId') || '');
    const answers = Array.from(formData.entries())
      .filter(([key]) => key !== 'departmentId')
      .map(([questionId, value]) => ({
        questionId,
        answer: String(value),
      }));

    if (!departmentId || !answers.length) {
      return NextResponse.json({ error: 'Invalid form payload' }, { status: 400 });
    }

    await connectToDatabase();

    const department = await DepartmentModel.findOne({ id: departmentId });
    if (!department || !department.enabled) {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 });
    }

    const application = await ApplicationModel.create({
      userId: session.user.id,
      departmentId,
      status: 'pending',
      answers,
      submittedAt: new Date(),
    });

    await notifyDiscordWebhook(department.name, session.user.name || 'Applicant', application._id.toString());

    return NextResponse.redirect(new URL('/dashboard', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const applications = await ApplicationModel.find({ userId: session.user.id }).sort({ createdAt: -1 });

    return NextResponse.json(applications);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
