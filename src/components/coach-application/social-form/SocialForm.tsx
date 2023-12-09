"use client";

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
import { useApplyFormData } from "@/hooks/useApplyFormData";
import { Label } from "@/components/ui/label";
import { useApplyProcess } from "@/hooks/useApplyProcess";
import SocialTips from "./SocialTips";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { MdAlternateEmail } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { useSocialForm } from "@/hooks/useSocialForm";
import { FaDiscord } from "react-icons/fa";
import { cn } from "@/lib/utils";

const CoachingHours = {
  "1-4 hours/week": "1-4 hours/week",
  "5-10 hours/week": "5-10 hours/week",
  "11-20 hours/week": "11-20 hours/week",
  "21-40 hours/week": "21-40 hours/week",
};

const formSchema = z.object({
  coachingHour: z.nativeEnum(CoachingHours, {
    required_error: "Please select one option",
  }),
  youtubeLink: z
    .string()
    .url({ message: "Please enter a valid url" })
    .regex(
      /^(https?:\/\/)?(www\.)?youtube\.com\/(channel\/UC|c\/|user\/)[a-zA-Z0-9_-]+$/,
      {
        message: "Invalid youtube channel URL",
      }
    )
    .optional(),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Please enter a valid email" }),
  facebookLink: z
    .string()
    .url({ message: "Please enter a valid url" })
    .regex(
      /^(https?:\/\/)?(www\.)?facebook\.com\/(profile\.php\?id=\d+|[a-zA-Z0-9.]+)$/,
      {
        message: "Invalid facebook profile URL",
      }
    )
    .optional(),
  discordLink: z
    .string()
    .url({ message: "Please enter a valid url" })
    .regex(/^(https?:\/\/)?(discord\.com\/channels\/(@me|\d+)\/\d+)$/, {
      message: "Invalid discord profile URL",
    })
    .optional(),
});

const SocialForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const { setData } = useSocialForm();

  const { setApplyProcess, applyProcess } = useApplyProcess();

  function onSubmit(values: z.infer<typeof formSchema>) {
    setData(values);
    setApplyProcess("finish");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex relative justify-between gap-x-16", {
          hidden: applyProcess !== "social-media",
        })}
      >
        <div className="w-[60%] pb-32">
          <div className="text-sm">Step 3 of 4</div>
          <div className="mt-5 mb-8 text-2xl font-bold super">
            Goals & Contact Info
          </div>
          <div className="mb-3 uppercase text-sm font-semibold">
            What are your coaching goals?
          </div>
          <p className="text-xs leading-5 text-zinc-300">
            Tell us how many hours you can coach in a week. Also provide us some
            of your social media links
          </p>
          <div className="space-y-7 mt-6 p-6 rounded-xl bg-home w-full border-2 border-primary">
            <FormField
              control={form.control}
              name="coachingHour"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    How much time do you expect to coach each week? (be
                    realistic!)
                  </Label>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(CoachingHours).map((value) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Do you have an email? If so, enter your email address
                  </Label>
                  <FormControl>
                    <div className="w-full relative">
                      <MdAlternateEmail className="text-2xl absolute top-3 left-3 text-white" />
                      <Input className="h-12 pl-12" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="youtubeLink"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    (Optional) Do you have a Youtube channel? If so, enter your
                    channel url
                  </Label>
                  <FormControl>
                    <div className="w-full relative">
                      <FaYoutube className="text-2xl absolute top-3 left-3 text-red-500" />
                      <Input className="h-12 pl-12" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discordLink"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    (Optional) Do you have a Discord account? If so, enter your
                    Discord profile url
                  </Label>
                  <FormControl>
                    <div className="w-full relative">
                      <FaDiscord className="text-2xl absolute top-3 left-3 text-indigo-400" />

                      <Input className="h-12 pl-12" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facebookLink"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    (Optional) Do you have a Facebook account? If so, enter your
                    Facebook profile url
                  </Label>
                  <FormControl>
                    <div className="w-full relative">
                      <FaFacebookSquare className="text-2xl absolute top-3 left-3 text-blue-400" />

                      <Input className="h-12 pl-12" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>
        </div>
        <SocialTips />
      </form>
    </Form>
  );
};

export default SocialForm;
