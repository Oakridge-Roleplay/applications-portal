declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      departmentAccess?: string[];
      discordId?: string;
    };
  }

  interface User {
    id: string;
    role?: string;
    departmentAccess?: string[];
    discordId?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: string;
    departmentAccess?: string[];
    discordId?: string;
  }
}
