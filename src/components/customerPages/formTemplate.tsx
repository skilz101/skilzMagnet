"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import formSubmit from "@/server/admin/clientFormSubmit";

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phoneNumber: z.number().optional(),
});

export interface formBoolean {
  id: string;
  name: boolean;
  email: boolean;
  phoneNumber: boolean;
}

export default function FormTemplate({
  name,
  email,
  phoneNumber,
  id,
}: formBoolean) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: undefined,
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setLoading(true);
    try {
      const createLeads = await formSubmit(
        id,
        values.name,
        values.email,
        values.phoneNumber,
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col space-y-5"
      >
        <div className="flex flex-col w-full space-y-3">
          {name === true && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Full Name"
                      className="p-5 text-lg placeHolder:text-lg"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          {email === true && (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email Address"
                      className="p-5 text-lg placeHolder:text-lg"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          {phoneNumber === true && (
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="+1473856879289799"
                      className="p-5 text-lg placeHolder:text-lg"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
        </div>
        <Button className="w-full bg-blue-600 hover:bg-blue-500" type="submit">
          Submit {loading && <Loader2 className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
