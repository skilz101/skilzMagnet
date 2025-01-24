"use server";

import { prisma } from "@/lib/prisma";

export async function generateLink(id: string): Promise<string> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        company: true,
      },
    });
    if (!user) {
      throw new Error("not a user");
    }
    if (!user.slug) {
      const slugName = user.company?.companyName.replace(/ /g, "-");
      const slugId = user.id.slice(0, 5);

      const slug = await prisma.user.update({
        where: {
          id,
        },
        data: {
          slug: slugName + "-" + slugId,
        },
      });
      return user.slug as string;
    } else {
      return user.slug as string;
    }
  } catch (error) {
    throw new Error(`${error}`);
  } finally {
    await prisma.$disconnect();
  }
}
