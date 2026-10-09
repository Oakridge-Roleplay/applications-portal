import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import ApplicationModel from '@/models/Application';
import UserModel from '@/models/User';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const member = await UserModel.findOne({ discordId: session.user.id });
    if (!member || !['admin', 'super_admin', 'reviewer'].includes(member.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const application = await ApplicationModel.findById(params.id);
    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    if (member.role === 'reviewer' && application.departmentId !== member.departmentAccess[0]) {
      return NextResponse.json({ error: 'No access to department' }, { status: 403 });
    }

    application.status = body.status;
    application.reviewNotes = body.reviewNotes || '';
    application.reviewedBy = member._id.toString();
    application.reviewedAt = new Date();
    await application.save();

    return NextResponse.json(application);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
