"use server";

import Welcome from "@/components/admin/welcome";
import AppSidebar from "@/components/assets/app-sidebar";
import { Logo, NewSvgComponent } from "@/components/assets/logo";
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
    title: "Admin | SkilzMagnet",
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
            <div className="w-full h-full gap-3 grid place-content-center place-items-center">
              <div className="">
                <NewSvgComponent />{" "}
              </div>

              <Welcome firstName={user.firstName} />
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
