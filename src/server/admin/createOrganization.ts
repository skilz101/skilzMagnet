"use server";

import { prisma } from "@/lib/prisma";
import { Template, Theme } from "@prisma/client";

export async function createOrganization(
  id: string,
  template: Template,
  theme: Theme,
  logo: string,
  title: string,
  subTitle: string,
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    const createPage = await prisma.company.update({
      where: {
        companyId: id,
      },
      data: {
        template,
        theme,
        logo,
        title,
        subTitle,
      },
    });
  } catch (error) {}
}
