"use server";

import Template1 from "@/components/customerPages/template1/template1";
import Template2 from "@/components/customerPages/template2/template2";
import Template3 from "@/components/customerPages/template3/template3";
import Template4 from "@/components/customerPages/template4/template4";
import { Template, Theme } from "@prisma/client";

interface pageData {
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

export default async function Page() {
  const user: pageData = {
    name: true,
    email: true,
    phoneNumber: false,
    logo: "/logo2.png",
    title: "Join our newsletter campaign",
    subTitle:
      "Join our list so you can get latest info about upcoming discounts and giveaways",
    theme: "Light",
    template: "Template3",
    companyName: "skilz web services",
    id: "4785ubjwoy83y86y89hf89",
  };

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
      // <Template3
      //   name={user.name}
      //   email={user.email}
      //   phoneNumber={user.phoneNumber}
      //   subTitle={user.subTitle}
      //   title={user.title}
      //   theme={user.theme}
      //   logo={user.logo}
      //   companyName={user.companyName}
      //   id={user.id}
      // />
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
