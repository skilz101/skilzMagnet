"use server";

import { prisma } from "@/lib/prisma";

export async function getCompanyDetails(id: string) {
  try {
    const companyDetails = await prisma.company.findUnique({
      where: {
        companyId: id,
      },
      include: {
        fields: true,
      },
    });
    return companyDetails;
  } catch (error) {
    throw new Error(`${error}`);
  } finally {
    prisma.$disconnect();
  }
}
