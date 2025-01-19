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

    const fields = await prisma.fields.findUnique({
      where: {
        companyId: id,
      },
    });

    if (user && !fields) {
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
          fields: {
            update: {
              where: {
                companyId: id,
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
    console.log(error);
    throw new Error(`${error}`);
  } finally {
    prisma.$disconnect();
  }
}
