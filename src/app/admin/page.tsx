"use server";

import Welcome from "@/components/admin/welcome";
import AppSidebar from "@/components/assets/app-sidebar";
import { Logo, NewSvgComponent } from "@/components/assets/logo";
import SideBarBody from "@/components/assets/sideBarBody";
import { Metadata } from "next";

interface UserProps {
  picture: string;
  firstName: string;
  email: string;
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
};

export default async function Page() {
  return (
    <main className="min-h-screen w-full">
      <AppSidebar
        image={user.picture || "/avatars/shadcn.jpg"}
        name={user.firstName}
        email={user.email}
      >
        <SideBarBody>
          <div className="w-full h-full grid place-content-center place-items-center">
            <div className="">
              <NewSvgComponent />{" "}
            </div>

            <Logo />
            <Welcome firstName={user.firstName} />
          </div>
        </SideBarBody>
      </AppSidebar>
    </main>
  );
}
