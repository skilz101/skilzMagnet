"use server";

import { prisma } from "@/lib/prisma";

export default async function formSubmit(
  id: string,
  name: string | undefined,
  email: string | undefined,
  phoneNumber: number | undefined,
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
    const company = await prisma.company.findUnique({
      where: {
        companyId: user.id,
      },
    });

    if (!company) {
      throw new Error("not a registered company");
    }
    const createLeads = await prisma.leads.create({
      data: {
        companyId: company.companyId,
        name,
        email,
        phoneNumber,
      },
    });

    return createLeads;
  } catch (error) {
    throw new Error(`${error}`);
  } finally {
    prisma.$disconnect();
  }
}
