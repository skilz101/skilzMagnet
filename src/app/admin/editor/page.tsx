"use server";

import PageEditor from "@/components/admin/pageEditor";
import AppSidebar from "@/components/assets/app-sidebar";
import SideBarBody from "@/components/assets/sideBarBody";
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

const user: UserProps = {
  picture: "",
  firstName: "Iji",
  email: "test@gmail.com",
  role: "ADMIN",
};

export default async function Page() {
  if (user.role === Roles.ADMIN) {
    return (
      <main className="min-h-screen w-full">
        <AppSidebar
          image={user.picture || "/avatars/shadcn.jpg"}
          name={user.firstName}
          email={user.email}
        >
          <SideBarBody>
            <div className="w-full h-full overflow-hidden px-5">
              <PageEditor />
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
