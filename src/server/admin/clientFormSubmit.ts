"use server";

import { prisma } from "@/lib/prisma";

export default async function formSubmit(
  id: string,
  name: string | undefined,
  email: string | undefined,
  phoneNumber: string | undefined,
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("not a registered user");
    }
    const company = await prisma.company.update({
      where: {
        companyId: user.id,
      },
      data: {
        leads: {
          create: {
            // companyId: id,
            name,
            email,
            phoneNumber,
          },
        },
      },
    });
  } catch (error) {
    throw new Error(`${error}`);
  } finally {
    prisma.$disconnect();
  }
}
