"use server";

import { prisma } from "@/lib/prisma";
import { Discover } from "@prisma/client";

export async function CreateCompany(
  id: string,
  firstName: string,
  lastName: string,
  companyName: string,
  discover: Discover,
  usage: string,
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new Error("not a user");
    }
    // create company

    const company = await prisma.company.create({
      data: {
        firstName,
        lastName,
        companyName,
        discover,
        companyId: user.id,
        usage,
      },
    });
    return company
  } catch (error) {
    throw new Error(`{error}`);
  } finally {
    await prisma.$disconnect();
  }
}
