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

  email: boolean,
  phoneNumber: boolean,
  name: boolean,
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    const company = await prisma.company.findUnique({
      where: {
        companyId: id,
      },
      include: {
        fields: true,
      },
    });

    if (!user && !company) throw new Error("not a user in session");

    if (user && !company?.fields) {
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
          hasTemplate: true,
          fields: {
            create: {
              name,
              email,
              phoneNumber,
            },
          },
        },
      });
    } else {
      const updatePage = await prisma.company.update({
        where: {
          companyId: id,
        },
        data: {
          template,
          theme,
          logo,
          title,
          subTitle,
          hasTemplate: true,
          fields: {
            update: {
              where: {
                id: company?.fields[0]?.id,
              },
              data: {
                name,
                email,
                phoneNumber,
              },
            },
          },
        },
      });
    }
  } catch (error) {
    // console.log(error);
    throw new Error(`${error}`);
  } finally {
    prisma.$disconnect();
  }
}
