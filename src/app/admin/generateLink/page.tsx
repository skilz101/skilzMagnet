"use server";

import { GenerateLink } from "@/components/admin/generateLink";
import Welcome from "@/components/admin/welcome";
import AppSidebar from "@/components/assets/app-sidebar";
import { Logo, NewSvgComponent } from "@/components/assets/logo";
import SideBarBody from "@/components/assets/sideBarBody";
import { getUser } from "@/lib/lucia";
import { getCompanyDetails } from "@/server/admin/getCompanyDetails";
import { Roles } from "@prisma/client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function metadata(): Promise<Metadata> {
  return {
    title: "Admin | SkilzMagnet",
  };
}

export default async function Page() {
  //   const user = await getUser();

  const user = {
    role: Roles.ADMIN,
    id: "47365737934ubfuify3",
    picture: "/globe.svg",
    email: "skilz@gmail.com",
    firstName: "Iji",
  };

  if (!user) {
    throw new Error("no user");
  }
  //   const company = await getCompanyDetails(user.id);
  //   if (!company) {
  //     throw new Error("no registered company");
  //   }
  if (user.role === Roles.ADMIN) {
    return (
      <main className="min-h-screen w-full">
        <AppSidebar
          image={user.picture || "/avatars/shadcn.jpg"}
          //   name={company.firstName}
          name={user.firstName}
          email={user.email}
        >
          <SideBarBody>
            <GenerateLink id={user.id} hasTemplate={true} />
          </SideBarBody>
        </AppSidebar>
      </main>
    );
  } else if (user.role === Roles.SKILZADMIN) {
    redirect("/skilzAdmin");
  } else if (user.role === Roles.NEWUSER) {
    redirect("/newUser");
  } else {
    redirect("/");
  }
}
