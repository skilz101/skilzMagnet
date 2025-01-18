"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Button } from "../ui/button";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { Discover } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { CreateCompany } from "@/server/admin/createCompany";
import { toast } from "sonner";

interface Platforms {
  platformName: Discover;
  platformIcon: string;
  id: string;
}

const platforms: Platforms[] = [
  {
    platformName: "Facebook",
    platformIcon:
      "https://img.icons8.com/?size=100&id=118497&format=png&color=000000",
    id: "1",
  },

  {
    platformName: "Instagram",
    platformIcon:
      "https://img.icons8.com/?size=100&id=Xy10Jcu1L2Su&format=png&color=000000",
    id: "2",
  },
  {
    platformName: "X",
    platformIcon:
      "https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=000000",
    id: "3",
  },
  {
    platformName: "LinkedIn",
    platformIcon:
      "https://img.icons8.com/?size=100&id=xuvGCOXi8Wyg&format=png&color=000000",
    id: "4",
  },
  {
    platformName: "Ticktok",
    platformIcon:
      "https://img.icons8.com/?size=100&id=118638&format=png&color=000000",
    id: "5",
  },
  {
    platformName: "Friend",
    platformIcon:
      "https://img.icons8.com/?size=100&id=ABBSjQJK83zf&format=png&color=000000",
    id: "6",
  },
];

interface Usage {
  use: string;
  id: string;
}

const usage: Usage[] = [
  {
    use: "Generating Leads",
    id: "1",
  },
  {
    use: "Backup my followers",
    id: "2",
  },
];

const formSchema = z.object({
  firstName: z.string({ message: "You need to write your first name" }),
  lastName: z.string({ message: "You need to write your last name" }),
  companyName: z.string({
    message: "You can your social media handle if you don't have a company",
  }),
  // discover: z.string({ message: "This is required" }),
  discover: z.nativeEnum(Discover),
  usage: z.string({ message: "This field is important" }),
});

export function OnboardingForm(props: { id: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      discover: undefined,
      usage: "",
    },
  });
  const [page, setPage] = useState<number>(1);

  const isNextDisabled = () => {
    const values = form.watch();
    if (page === 1) {
      return !values.firstName || !values.lastName || !values.companyName;
    }
    if (page === 2) {
      return !values.discover;
    }
    if (page === 3) {
      return !values.usage;
    }
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      console.log(values);
      const createCompany = await CreateCompany(
        props.id,
        values.firstName,
        values.lastName,
        values.companyName,
        values.discover,
        values.usage
      );

      toast("You account has been created", {
        description: "You can now access your dashboard",
        action: {
          label: "ok",
          onClick: () => console.log("ok"),
        },
      });
      setIsLoading(false);
    } catch (error) {
      toast("An unexpected error occured", {
        description:
          "Check your internet and try again, if the issue pessists, contact our support team",
        action: {
          label: "ok",
          onClick: () => console.log("ok"),
        },
      });
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full m-0 h-fit">
      <CardHeader>
        <CardTitle className="text-xl">
          {page === 1 && "Personal Details"}
          {page === 2 && "How did you hear about us"}
          {page === 3 && "Customization"}
        </CardTitle>
        <CardDescription>
          {page === 1 &&
            "Fill out your name, and company details. you can use your social media handle as your company name "}
          {page === 2 && "Let us know how you got to know about us"}
          {page === 3 && "How do you plan to use SkilzMagnet"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {page === 1 && (
              <div className="flex flex-col space-y-3">
                {/* first name */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormItem>First Name</FormItem>
                      <Input placeholder="john" type="text" {...field} />
                    </FormItem>
                  )}
                />

                {/* last name */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormItem>Last Name</FormItem>
                      <Input placeholder="doe" type="text" {...field} />
                    </FormItem>
                  )}
                />

                {/* company Name */}
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormItem>Company Name</FormItem>
                      <Input
                        placeholder="write your company name or social media handle"
                        type="text"
                        {...field}
                      />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {page === 2 && (
              <RadioGroup
                onValueChange={(value) =>
                  form.setValue("discover", value as Discover)
                }
              >
                {platforms.map((items) => (
                  <div className="flex items-center space-x-5" key={items.id}>
                    <RadioGroupItem value={items.platformName} id={items.id} />

                    <div className="flex space-x-2 items-center">
                      <Image
                        alt={items.platformName}
                        src={items.platformIcon || ""}
                        width={30}
                        height={30}
                      />
                      <Label htmlFor={items.id}>{items.platformName}</Label>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            )}
            {page === 3 && (
              <RadioGroup
                onValueChange={(value) => form.setValue("usage", value)}
              >
                {usage.map((items) => (
                  <div className="flex items-center space-x-2" key={items.id}>
                    <RadioGroupItem value={items.use} id={items.id} />

                    <Label htmlFor={items.id} className="text-lg">
                      {items.use}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {/* buttons */}
            <div className="w-full mt-5 flex justify-end">
              <div className="flex items-center space-x-3">
                {page > 1 && (
                  <Button
                    variant="secondary"
                    className="bg-blue-200 hover:bg-blue-300 text-blue-600 hover:text-blue-600"
                    onClick={() => setPage(page - 1)}
                  >
                    Prev
                  </Button>
                )}
                {page === 3 ? (
                  <Button
                    type="submit"
                    className="bg-blue-600 text-white hover:bg-blue-700 "
                    disabled={isNextDisabled()}
                  >
                    Submit {isLoading && <Loader2 className="animate-spin" />}
                  </Button>
                ) : (
                  <Button
                    className="bg-blue-600 text-white hover:bg-blue-700"
                    disabled={isNextDisabled()}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
