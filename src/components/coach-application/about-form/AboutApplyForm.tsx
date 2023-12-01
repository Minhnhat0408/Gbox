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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GameInformationForm from "./GameInformationForm";
import { useApplyFormData } from "@/hooks/useApplyFormData";
import { Label } from "@/components/ui/label";
import { useApplyProcess } from "@/hooks/useApplyProcess";

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: "First name is required",
    })
    .max(50),
  lastName: z
    .string()
    .min(1, {
      message: "Last name is required",
    })
    .max(50),
  description: z
    .string()
    .min(1, {
      message: "Description is required",
    })
    .max(300, {
      message: "Description must be less than 300 characters",
    }),
  country: z
    .string()
    .min(1, {
      message: "Country is required",
    })
    .max(50, {
      message: "Country name must be less than 50 characters",
    }),
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

  const { setApplyProcess } = useApplyProcess();

  const { choosedGame, setChooseGameError, anotherGame } = useApplyFormData();

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (choosedGame.length === 0) {
      return setChooseGameError("Please choose at least one game");
    }
    console.log(values);
    console.log(choosedGame);
    console.log(anotherGame);
    setApplyProcess("social-media");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex relative justify-between gap-x-16"
      >
        <div className="w-[60%] pb-32">
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
          <div className="space-y-7 mt-6 p-6 rounded-xl bg-home w-full border-2 border-primary">
            <div className="flex gap-x-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      First Name
                    </Label>
                    <FormControl>
                      <Input className="h-12" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Last Name
                    </Label>
                    <FormControl>
                      <Input className="h-12" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Description
                  </Label>
                  <FormControl>
                    <Input className="h-12" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Country{" "}
                  </Label>
                  <FormControl>
                    <Input className="h-12" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-3 mt-8 uppercase text-sm font-semibold">Games</div>
          <p className="text-xs leading-5 text-zinc-300">
            Tell us which games you want to provide coaching for. Also what
            roles, characters etc your specialize in your game.
          </p>
          <GameInformationForm />
        </div>
        <AboutRules form={form} />
      </form>
    </Form>
  );
};

export default AboutApplyForm;
