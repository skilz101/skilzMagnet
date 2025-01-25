"use server";

import { Leads } from "@/components/admin/columns";
import { prisma } from "@/lib/prisma";

export async function getLeads(id: string): Promise<Leads[]> {
  try {
    const company = await prisma.company.findUnique({
      where: {
        companyId: id,
      },
      include: {
        leads: true,
      },
    });

    if (!company) throw new Error("you are not logged in");

    const leads = company.leads;
    const returnStatement = leads.map((item) => {
      return {
        id: item.id,
        name: item.name ?? undefined,
        email: item.email ?? undefined,
        phoneNumber: item.phoneNumber ?? undefined,
      };
    });
    return returnStatement;
  } catch (error) {
    throw new Error(`${error}`);
  } finally {
    await prisma.$disconnect();
  }
}
