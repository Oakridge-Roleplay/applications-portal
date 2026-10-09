import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import UserModel from '@/models/User';
import DepartmentModel from '@/models/Department';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const member = await UserModel.findOne({ discordId: session.user.id });
    const role = member?.role || 'user';

    if (role === 'admin' || role === 'super_admin' || role === 'reviewer') {
      const departments = await DepartmentModel.find().sort({ name: 1 });
      return NextResponse.json(departments);
    }

    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { departmentId, reviewers } = body;

    await connectToDatabase();
    const department = await DepartmentModel.findOne({ id: departmentId });
    if (!department) {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 });
    }

    department.reviewers = reviewers || [];
    await department.save();

    return NextResponse.json(department);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
