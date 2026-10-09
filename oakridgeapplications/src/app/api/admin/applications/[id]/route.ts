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
    const user = await UserModel.findOne({ discordId: session.user.id });
    if (!user || !['admin', 'super_admin', 'reviewer'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const application = await ApplicationModel.findById(params.id);
    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    application.status = body.status;
    application.reviewNotes = body.reviewNotes || '';
    application.reviewedBy = user._id.toString();
    application.reviewedAt = new Date();
    await application.save();

    return NextResponse.json(application);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
