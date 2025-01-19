"use client";

import * as z from "zod";
import { useForm, Resolver } from "react-hook-form";
import { Template, Theme } from "@prisma/client";
import { useEffect, useState } from "react";
import TemplateSelector from "./templateSelector";
import ThemeSelector, { LogoUpload } from "./theme";
import TextContent from "./textContent";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  template: z.nativeEnum(Template),
  theme: z.nativeEnum(Theme),
  logo: z.string(),
  title: z.string(),
  subTitle: z.string(),
  name: z.boolean(),
  email: z.boolean(),
  phoneNumber: z.boolean(),
});

export default function PageEditor() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      template: undefined,
      theme: undefined,
      logo: "",
      title: "",
      subTitle: "",
      name: false,
      email: false,
      phoneNumber: false,
    },
  });
  const [template, setTemplate] = useState<Template>();
  const [theme, setTheme] = useState<Theme>();
  const [logo, setLogo] = useState<string>("");
  const [title, seTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");

  //callbacks

  const handleChangeTemplate = (selectedTemplate: Template) => {
    setTemplate(selectedTemplate);
  };

  const handleThemeChange = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
  };

  const handleLogoChange = (selectedLogo: string) => {
    setLogo(selectedLogo);
  };

  const handleTitleChange = (newTitle: string) => {
    seTitle(newTitle);
  };

  const handleSubTitlechange = (newSubTitle: string) => {
    setSubTitle(newSubTitle);
  };

  // Log the updated template
  useEffect(() => {
    if (template) {
      console.log(`Updated template: ${template}`);
    }
    if (theme) {
      console.log(`Updated theme: ${theme}`);
    }
    if (logo) {
      console.log(`Updated logo: ${logo}`);
    }
    if (title) {
      console.log(`Updated title: ${title}`);
    }
    if (subTitle) {
      console.log(`Updated subTitle: ${subTitle}`);
    }
  }, [template, theme, logo, title, subTitle]);
  return (
    <main className="flex flex-col space-y-8">
      <div className="flex flex-col space-y-5">
        <h3 className="text-3xl">Theme and Template</h3>
        <div className="flex flex-col space-y-3">
          <TemplateSelector
            template={template}
            onTemplateChange={handleChangeTemplate}
          />
          <ThemeSelector theme={theme} onThemeChange={handleThemeChange} />
          <LogoUpload logo={logo} onLogoChange={handleLogoChange} />
        </div>
      </div>

      <hr className="mt-5" />
      {/* content */}

      <div className="flex flex-col space-y-5 mb-5">
        <h3 className="text-3xl">Content</h3>

        <div className="flex flex-col space-y-3">
          <TextContent
            title={title}
            subTitle={subTitle}
            handleTitleChange={handleTitleChange}
            handleSubTitlechange={handleSubTitlechange}
          />
        </div>
      </div>
    </main>
  );
}
