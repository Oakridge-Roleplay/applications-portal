import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { USER_ROLES } from '@/config/config';

export async function isAuthenticated() {
  const session = await getServerSession(authOptions);
  return !!session;
}

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  return session;
}

export async function requireRole(requiredRole: string) {
  const session = await requireAuth();
  const userRole = session.user.role || USER_ROLES.USER;

  const roleHierarchy = {
    [USER_ROLES.USER]: 0,
    [USER_ROLES.REVIEWER]: 1,
    [USER_ROLES.ADMIN]: 2,
    [USER_ROLES.SUPER_ADMIN]: 3,
  } as const;

  const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] ?? 0;
  const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] ?? 0;

  if (userLevel < requiredLevel) {
    throw new Error('Forbidden');
  }

  return session;
}

export async function requireDepartmentAccess(departmentId: string) {
  const session = await requireAuth();
  const userRole = session.user.role || USER_ROLES.USER;
  const departmentAccess = session.user.departmentAccess || [];

  if (userRole === USER_ROLES.SUPER_ADMIN || userRole === USER_ROLES.ADMIN) {
    return session;
  }

  if (!departmentAccess.includes(departmentId)) {
    throw new Error('Forbidden');
  }

  return session;
}
