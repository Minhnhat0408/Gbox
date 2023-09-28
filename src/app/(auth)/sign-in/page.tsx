"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Tilt from "react-parallax-tilt";
import { BsGoogle, BsTwitch, BsDiscord } from "react-icons/bs";
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
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Auth } from '@supabase/auth-ui-react';

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function SignIn() {
  const supabase = createClientComponentClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(form);
  }

  return (
    <main className="w-screen h-full bg-background flex flex-col relative items-center  overflow-x-hidden">
      <Image
        src={"/login-bg.png"}
        width={1700}
        height={910}
        alt="bg"
        className="absolute w-[1710px] h-[910px] max-w-none top-0"
      />
      <Tilt
        glareEnable={true}
        tiltEnable={false}
        glareMaxOpacity={0.3}
        glareBorderRadius="24px"
        glarePosition="all"
        className="w-[600px] mt-20  h-fit bg-form rounded-3xl flex flex-col justify-center items-center p-20 "
      >
        <h1 className="text-4xl font-bold tracking-wider mb-4">
          <span className="super uppercase mr-2 font-bold">Gbox</span> Login
        </h1>
        <p className="text-base text-card-foreground text-center mb-8">
          Join our community and become a better gamer.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      type="email"
                      {...field}
                      className="bg-transparent placeholder:text-gray-300 text-lg text-white border-t-0 border-l-0 border-r-0 border-white rounded-none focus-visible:!ring-offset-0 focus-visible:border-b-primary focus-visible:placeholder:text-primary  focus-visible:!ring-0"
                    />
                  </FormControl>
                  <div className="h-4 pl-2">
                    <FormMessage className="block text-red-500" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type="password"
                      {...field}
                      className="bg-transparent placeholder:text-white text-lg text-white border-t-0 border-l-0 border-r-0 border-white rounded-none focus-visible:!ring-offset-0 focus-visible:border-b-primary focus-visible:placeholder:text-primary  focus-visible:!ring-0"
                    />
                  </FormControl>
                  <div className="h-8 pl-2">
                    <FormMessage className="block text-red-500" />
                  </div>          
                </FormItem>
              )}
            />
            <div className="relative w-full border-[1px] cursor-pointer hover:border-primary hover:text-primary py-3 justify-center items-center rounded-full flex border-white">
              <span className="text-sm">Or continue with Google</span>
              <BsGoogle className="ml-2 text-xl" />
              <div className="absolute w-full opacity-0 -top-4 z-50">
                  <Auth
                    onlyThirdPartyProviders
                    redirectTo={`/`}
                    supabaseClient={supabase}
                    providers={['google']}
                    appearance={{theme: ThemeSupa}}
                  />
              </div>
            </div>
            <div className="relative w-full border-[1px] cursor-pointer hover:border-primary hover:text-primary py-3 justify-center rounded-full flex border-white">
              <span className="text-sm">Or continue with Discord</span>
              <BsDiscord className="ml-2 text-xl" />
              <div className="absolute w-full opacity-0 -top-4 z-50">
                  <Auth 
                    onlyThirdPartyProviders
                    redirectTo={`/`}
                    supabaseClient={supabase}
                    providers={['discord']}
                    appearance={{theme: ThemeSupa}}
                  />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full !mt-10 font-bold uppercase text-gray-100 tracking-widest "
            >
              Login
            </Button>
          </form>
        </Form>
      </Tilt>
      <p className="text-white max-w-[600px] z-10  mt-10  px-8 text-center">
        By signing up, you agree to our <span className="text-primary cursor-pointer">Terms of Service</span> and <span className="text-primary cursor-pointer">Privacy Policy</span>. For
        information on how we utilize cookies, please refer to our <span className="text-primary cursor-pointer"> Cookies Policy</span>.
      </p>
    </main>
  );
}
