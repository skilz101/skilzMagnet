"use server";

import { GetStarted } from "@/components/auth/google";
import Template1 from "@/components/customerPages/template1/template1";
import Template2 from "@/components/customerPages/template2/template2";
import Template3 from "@/components/customerPages/template3/template3";
import Template4 from "@/components/customerPages/template4/template4";
import { getDetailsBySlug } from "@/server/admin/getDetailsBySlug";
import { Template, Theme } from "@prisma/client";
import Image from "next/image";

export interface slugPageData {
  name: boolean;
  email: boolean;
  phoneNumber: boolean;
  logo: string;
  title: string;
  template: Template;
  theme: Theme;
  subTitle: string;
  companyName: string;
  id: string;
}

export default async function Page(params: { slug: string }) {
  const { slug } = params;

  const user = await getDetailsBySlug(slug);
  if (!user) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <div className="flex items-center space-y-5 flex-col">
          <Image src="/Group-7.png" alt="404 page" width={100} height={100} />
          <div className="flex items-center flex-col space-y-3 text-center">
            <h2 className="text-4xl capitalize font-bold">
              Oops this page is not live.{" "}
            </h2>
            <p className="text-muted-foreground">
              It either does not exist or the owner has taken down the link. If
              you are the owner of this page, click on the button below to
              reactivate your account
            </p>
            <GetStarted />
          </div>
        </div>
      </div>
    );
  }
  if (user.template === "Template1") {
    return (
      <Template1
        name={user.name}
        email={user.email}
        phoneNumber={user.phoneNumber}
        subTitle={user.subTitle}
        title={user.title}
        theme={user.theme}
        logo={user.logo}
        companyName={user.companyName}
        id={user.id}
      />
    );
  } else if (user.template === "Template2") {
    return (
      <Template2
        name={user.name}
        email={user.email}
        phoneNumber={user.phoneNumber}
        subTitle={user.subTitle}
        title={user.title}
        theme={user.theme}
        logo={user.logo}
        companyName={user.companyName}
        id={user.id}
      />
    );
  } else if (user.template === "Template3") {
    return (
      <Template3
        name={user.name}
        email={user.email}
        phoneNumber={user.phoneNumber}
        subTitle={user.subTitle}
        title={user.title}
        theme={user.theme}
        logo={user.logo}
        companyName={user.companyName}
        id={user.id}
      />
    );
  } else if (user.template === "Template4") {
    return (
      <Template4
        name={user.name}
        email={user.email}
        phoneNumber={user.phoneNumber}
        subTitle={user.subTitle}
        title={user.title}
        theme={user.theme}
        logo={user.logo}
        companyName={user.companyName}
        id={user.id}
      />
    );
  }
}
