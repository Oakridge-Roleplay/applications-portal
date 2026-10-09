import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import DepartmentModel from '@/models/Department';
import UserModel from '@/models/User';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const member = await UserModel.findOne({ discordId: session.user.id });
    const role = member?.role || 'user';

    if (role !== 'admin' && role !== 'super_admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const departments = await DepartmentModel.find().sort({ name: 1 });
    return NextResponse.json(departments);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const member = await UserModel.findOne({ discordId: session.user.id });
    if (!member || (member.role !== 'admin' && member.role !== 'super_admin')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    await connectToDatabase();

    const department = await DepartmentModel.create({
      id: body.id,
      name: body.name,
      abbreviation: body.abbreviation,
      color: body.color || '#1d4ed8',
      icon: body.icon || '🧾',
      description: body.description || '',
      enabled: body.enabled ?? true,
      reviewers: body.reviewers || [],
    });

    return NextResponse.json(department);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
