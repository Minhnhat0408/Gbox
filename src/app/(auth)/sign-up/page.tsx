"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Tilt from "react-parallax-tilt";
import { BsGoogle, BsDiscord } from "react-icons/bs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { SignUpSchema } from "@/schema/auth-schema";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export type tSignUpSchema = z.infer<typeof SignUpSchema>;
export default function SignUp() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string>("");
  const [outAnimation, setOutAnimation] = useState<boolean>(false);

  const supabase = createClientComponentClient();

  const searchParams = useSearchParams();

  const form = useForm<tSignUpSchema>({
    resolver: zodResolver(SignUpSchema),
  });
  async function onSubmit(values: tSignUpSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const res = await axios.post("/api/auth/sign-up", values);
    if (res.data.error) {
      setServerError(res.data.error.message);
    } else {
      const { data: updateData, error } = await supabase
        .from("profiles")
        .upsert({})
        .eq("id", res.data.data.user.id);
      if (error) console.log(error);
      if (searchParams.get("redirect")) {
        router.push(searchParams.get("redirect") as string);
      } else {
        router.push("/");
      }
    }
  }
  const handleSignInWithDC = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${location.origin}/api/callback`,
      },
    });
  };

  const handleSignInWithGG = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/api/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  };
  return (
    <main className="bg-background relative flex flex-col items-center w-screen h-screen overflow-hidden">
      <Image
        src={"/images/login-bg.png"}
        width={1700}
        height={910}
        alt="bg"
        priority={true}
        className="absolute w-screen min-w-[1440px] h-screen min-h-[760px] top-0  select-none pointer-events-none"
      />
      <div className="xl:py-20 flex flex-col items-center py-10 overflow-y-scroll duration-1000">
        <Tilt
          glareEnable={true}
          tiltEnable={false}
          glareMaxOpacity={0.3}
          glareBorderRadius="24px"
          glarePosition="all"
          className={cn(
            "w-[500px] h-fit fade-in  bg-form rounded-3xl flex flex-col justify-center items-center p-12 ",
            outAnimation && " fade-out"
          )}
        >
          <h1 className="mb-4 text-4xl font-bold tracking-wider">
            <span className="super mr-2 font-bold uppercase">Gbox</span> Sign Up
          </h1>
          <p className="text-card-foreground text-base text-center">
            Join our community and become a better gamer.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={cn("w-full  space-y-5 mt-9 ")}
            >
              {" "}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="h-[50px]">
                    <FormControl>
                      <Input
                        placeholder="Email"
                        type="email"
                        {...field}
                        className="bg-transparent placeholder:text-white text-base tracking-wider  text-white border-t-0 border-l-0 border-r-0 border-white rounded-none focus-visible:!ring-offset-0 focus-visible:border-b-primary focus-visible:placeholder:text-primary  focus-visible:!ring-0"
                      />
                    </FormControl>
                    <FormMessage className=" text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="h-[50px]">
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                        className="bg-transparent placeholder:text-white text-base tracking-wider text-white border-t-0 border-l-0 border-r-0 border-white rounded-none focus-visible:!ring-offset-0 focus-visible:border-b-primary focus-visible:placeholder:text-primary  focus-visible:!ring-0"
                      />
                    </FormControl>
                    <FormMessage className=" text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="h-[70px]">
                    <FormControl>
                      <Input
                        placeholder="Confirm Password"
                        type="password"
                        {...field}
                        className="bg-transparent placeholder:text-white text-base tracking-wider text-white border-t-0 border-l-0 border-r-0 border-white rounded-none focus-visible:!ring-offset-0 focus-visible:border-b-primary focus-visible:placeholder:text-primary  focus-visible:!ring-0"
                      />
                    </FormControl>
                    <FormMessage className=" text-red-500" />
                  </FormItem>
                )}
              />
              {serverError && (
                <p className="font-bold tracking-wider text-center text-red-400">
                  {serverError}
                </p>
              )}
              <div
                onClick={handleSignInWithGG}
                className="relative w-full border-[1px] cursor-pointer hover:border-primary hover:text-primary py-3 justify-center items-center rounded-full flex border-white"
              >
                <span className="text-sm">Or continue with Google</span>
                <BsGoogle className="ml-2 text-xl" />
              </div>
              <div
                onClick={handleSignInWithDC}
                className="relative w-full border-[1px] cursor-pointer  hover:border-primary hover:text-primary py-3 justify-center items-center rounded-full flex border-white"
              >
                <span className="text-sm">Or continue with Discord</span>
                <BsDiscord className="ml-2 text-xl" />
              </div>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full !mt-10 font-bold uppercase tracking-widest "
              >
                Sign Up
                {form.formState.isSubmitting && (
                  <AiOutlineLoading3Quarters className="animate-spin ml-3" />
                )}
              </Button>
            </form>
          </Form>
          <p className=" mt-4">
            Already have an account?{" "}
            <span
              onClick={() => {
                setOutAnimation(true);
                setTimeout(() => {
                  if (searchParams.get("redirect")) {
                    router.push(
                      `/sign-in?redirect=${searchParams.get("redirect")}`
                    );
                  } else {
                    router.push("/sign-in");
                  }
                }, 500);
              }}
              className="text-primary cursor-pointer"
            >
              Sign in
            </span>
          </p>
        </Tilt>
        <p
          className={cn(
            "text-white fade-in max-w-[600px] z-10  mt-10  px-8 text-center",
            outAnimation && " fade-out"
          )}
        >
          By signing up, you agree to our{" "}
          <span className="text-primary cursor-pointer">Terms of Service</span>{" "}
          and{" "}
          <span className="text-primary cursor-pointer">Privacy Policy</span>.
          For information on how we utilize cookies, please refer to our{" "}
          <span className="text-primary cursor-pointer"> Cookies Policy</span>.
        </p>
      </div>
    </main>
  );
}
