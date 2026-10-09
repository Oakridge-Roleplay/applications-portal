import { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { connectToDatabase } from '@/lib/mongodb';
import UserModel from '@/models/User';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'identify email',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user?.email || !account) {
        return false;
      }

      await connectToDatabase();

      const existing = await UserModel.findOne({ discordId: user.id });

      if (!existing) {
        await UserModel.create({
          discordId: user.id,
          username: user.name || 'Unknown',
          avatar: user.image || '',
          email: user.email,
          role: 'user',
          departmentAccess: [],
        });
      }

      return true;
    },

    async jwt({ token, user, account }) {
      if (account && user) {
        await connectToDatabase();

        const dbUser = await UserModel.findOne({ discordId: user.id });

        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role;
          token.departmentAccess = dbUser.departmentAccess || [];
          token.discordId = dbUser.discordId;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) || '';
        session.user.role = (token.role as string) || 'user';
        session.user.departmentAccess = (token.departmentAccess as string[]) || [];
        session.user.discordId = (token.discordId as string) || '';
      }

      return session;
    },
  },
  pages: {
    signIn: '/',
  },
};
