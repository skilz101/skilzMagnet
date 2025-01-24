"use server";

import PageEditor from "@/components/admin/pageEditor";
import AppSidebar from "@/components/assets/app-sidebar";
import SideBarBody from "@/components/assets/sideBarBody";
import { getUser } from "@/lib/lucia";
import { getCompanyDetails } from "@/server/admin/getCompanyDetails";
import { Roles } from "@prisma/client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface UserProps {
  picture: string;
  firstName: string;
  email: string;
  role: Roles;
}

export async function metadata(): Promise<Metadata> {
  return {
    title: "Page Editor | SkilzMagnet",
  };
}

export default async function Page() {
  const user = await getUser();

  if (!user) {
    throw new Error("no user");
  }
  const company = await getCompanyDetails(user.id);
  if (!company) {
    throw new Error("no registered company");
  }

  if (user.role === Roles.ADMIN) {
    return (
      <main className="min-h-screen w-full">
        <AppSidebar
          image={user.picture || "/avatars/shadcn.jpg"}
          name={company.firstName}
          email={user.email}
        >
          <SideBarBody>
            <div className="w-full h-full overflow-hidden px-5">
              <PageEditor
                id={user.id}
                template={company.template || null}
                theme={company.theme || null}
                logo={company.logo || ""}
                subTitle={company.subTitle || ""}
                title={company.title || ""}
                name={company.fields[0]?.name || false}
                email={company.fields[0]?.email || false}
                phoneNumber={company.fields[0]?.phoneNumber || false}
              />
            </div>
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
