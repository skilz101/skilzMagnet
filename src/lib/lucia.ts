import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "skilzMagnet-auth-cookie",
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export const getUser = async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;

  if (!sessionId) {
    return null;
  }

  const { session, user } = await lucia.validateSession(sessionId);
  try {
    if (session && session.fresh) {
      // Refresh session cookie if fresh
      const sessionCookie = await lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    if (!session) {
      const sessionCookie = await lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch (error) {
    return null;
  }

  if (!user?.id) return null;

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      name: true,
      email: true,
      picture: true,
      role: true,
      company: true,
    },
  });

  return dbUser;
};

// Define the inferred return type from getUser
export type UserType = Awaited<ReturnType<typeof getUser>>;
