"use client";

import AboutRules from "./AboutRules";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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

const formSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  description: z.string().min(2).max(300),
  country: z.string().min(2).max(50),
});

const AboutApplyForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      description: "",
      country: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="flex relative justify-between gap-x-16">
      <div className="w-[60%] h-[2000px] ">
        <div className="text-sm">Step 2 of 4</div>
        <div className="mt-5 mb-8 text-2xl font-bold super">
          Tell us about yourself and your game
        </div>
        <div className="mb-3 uppercase text-sm font-semibold">
          Personal Info
        </div>
        <p className="text-xs leading-5 text-zinc-300">
          You need to complete your coaching profile so that Gbox can contact
          for your application process.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-7 mt-6 p-6 rounded-xl bg-home w-full border-2 border-primary"
          >
            <div className="flex gap-x-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="mb-3 mt-8 uppercase text-sm font-semibold">Games</div>
        <p className="text-xs leading-5 text-zinc-300">
          Tell us which games you want to provide coaching for.
        </p>
        <div className="space-y-7 mt-6 p-6 rounded-xl bg-home w-full border-2 border-primary">
          {/* complate game form */}
        </div>
      </div>
      <AboutRules />
    </div>
  );
};

export default AboutApplyForm;
