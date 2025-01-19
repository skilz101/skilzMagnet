"use client";

import * as z from "zod";
import { useForm, Resolver } from "react-hook-form";
import { Template, Theme } from "@prisma/client";
import { useEffect, useState } from "react";
import TemplateSelector from "./templateSelector";
import ThemeSelector, { LogoUpload } from "./theme";
import TextContent from "./textContent";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFields from "./fields";

import { toast } from "sonner";
import { createOrganization } from "@/server/admin/createOrganization";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

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

export default function PageEditor(props: {
  id: string;
  template: Template | null;
  theme: Theme | null;
  logo: string | null;
  subTitle: string | null;
  title: string | null;
  name: boolean | null;
  email: boolean | null;
  phoneNumber: boolean | null;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      template: props.template || undefined,
      theme: props.theme || undefined,
      logo: props.logo || "",
      title: props.title || "",
      subTitle: props.subTitle || "",
      name: props.name || false,
      email: props.email || false,
      phoneNumber: props.phoneNumber || false,
    },
  });
  const [template, setTemplate] = useState<Template | undefined>(
    props.template || undefined,
  );
  const [theme, setTheme] = useState<Theme | undefined>(
    props.theme || undefined,
  );
  const [logo, setLogo] = useState<string | undefined>(props.logo || undefined);
  const [title, seTitle] = useState<string | undefined>(
    props.title || undefined,
  );
  const [subTitle, setSubTitle] = useState<string | undefined>(
    props.subTitle || undefined,
  );

  const [name, setName] = useState<boolean | undefined>(
    props.name || undefined,
  );
  const [email, setEmail] = useState<boolean | undefined>(
    props.email || undefined,
  );
  const [phoneNumber, setPhoneNumber] = useState<boolean | undefined>(
    props.phoneNumber || undefined,
  );

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

  const onNameChange = (value: boolean) => {
    setName(value);
  };
  const onEmailChange = (value: boolean) => {
    setEmail(value);
  };

  const onPhoneNumberChange = (value: boolean) => {
    setPhoneNumber(value);
  };

  // Log the updated template
  useEffect(() => {
    if (template) {
      console.log(`Updated template: ${template}`);
      form.setValue("template", template as Template);
    }
    if (theme) {
      console.log(`Updated theme: ${theme}`);
      form.setValue("theme", theme as Theme);
    }
    if (logo) {
      console.log(`Updated logo: ${logo}`);
      form.setValue("logo", logo);
    }
    if (title) {
      console.log(`Updated title: ${title}`);
      form.setValue("title", title);
    }
    if (subTitle) {
      console.log(`Updated subTitle: ${subTitle}`);
      form.setValue("subTitle", subTitle);
    }
    if (name) {
      console.log(`Updated name: ${name}`);
      form.setValue("name", name as boolean);
    }
    if (email) {
      console.log(`Updated email: ${email}`);
      form.setValue("email", email as boolean);
    }
    if (phoneNumber) {
      console.log(`Updated phoneNumber: ${phoneNumber}`);
      form.setValue("phoneNumber", phoneNumber as boolean);
    }
  }, [template, theme, logo, title, subTitle, name, email, phoneNumber]);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    const values = form.watch();
    setLoading(true);
    try {
      // update form variables
      form.setValue("name", name as boolean);
      form.setValue("email", email as boolean);
      form.setValue("phoneNumber", phoneNumber as boolean);

      form.setValue("template", template as Template);
      form.setValue("theme", theme as Theme);
      form.setValue("logo", logo as string);
      form.setValue("title", title as string);

      form.setValue("subTitle", subTitle as string);

      const submit = await createOrganization(
        props.id,
        values.template,
        values.theme,
        values.logo,
        values.title,
        values.subTitle,
        values.email,
        values.phoneNumber,
        values.name,
      );
      setLoading(false);

      toast("You Page has been created", {
        description:
          "You can now share your page with your followers. Click on the 'generate link' menu on the side bar to generate your website url",
        action: {
          label: "ok",
          onClick: () => console.log("ok"),
        },
      });
      form.reset();
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast("An error occured", {
        description:
          "This might be due to some internet issues. refresh and try again. If the issue pessists, contact our support team",
        action: {
          label: "ok",
          onClick: () => console.log("ok"),
        },
      });
      form.reset();
    }
  };

  const isDisabled = () => {
    const value = form.watch();
    const hasAtLeastOneField = value.name || value.email || value.phoneNumber;

    return (
      !hasAtLeastOneField ||
      !value.template ||
      !value.theme ||
      !value.logo ||
      !value.title ||
      !value.subTitle
    );
  };

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

          <FormFields
            name={name}
            email={email}
            phoneNumber={phoneNumber}
            onNameChange={onNameChange}
            onEmailChange={onEmailChange}
            onPhoneNumberChange={onPhoneNumberChange}
          />

          <Button
            type="submit"
            onClick={() => onSubmit()}
            disabled={isDisabled()}
            className="bg-blue-600 hover:bg-blue-500"
          >
            Create page {loading && <Loader2 className="animate-spin" />}
          </Button>
        </div>
      </div>
    </main>
  );
}
