"use server";

import { columns } from "@/components/admin/columns";
import { DataTable } from "@/components/admin/data-table";
import AppSidebar from "@/components/assets/app-sidebar";
import SideBarBody from "@/components/assets/sideBarBody";
import { getUser } from "@/lib/lucia";
import { getCompanyDetails } from "@/server/admin/getCompanyDetails";
import { getLeads } from "@/server/admin/getLeads";
import { Roles } from "@prisma/client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function metadata(): Promise<Metadata> {
  return {
    title: "Leads | SkilzMagnet",
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
  const leads = await getLeads(user.id);

  if (user.role === Roles.ADMIN) {
    return (
      <main className="min-h-screen w-full">
        <AppSidebar
          image={user.picture || "/avatars/shadcn.jpg"}
          name={company.firstName}
          email={user.email}
        >
          <SideBarBody>
            <div className="w-full h-full flex space-y-5 flex-col">
              <div className="flex flex-col space-y-2">
                <h2 className="text-4xl font-bold">Your Leads</h2>
                <p className="text-muted-foreground text-lg">
                  You can see all the contact information of the people that
                  signed up to your newsletter here. You can also export them as
                  a csv file to you computer.
                </p>
              </div>
              <DataTable columns={columns} data={leads} id={user.id} />
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
