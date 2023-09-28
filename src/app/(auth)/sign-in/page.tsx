"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Tilt from "react-parallax-tilt";
import { BsGoogle, BsDiscord } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { SignInSchema } from "@/schema/auth-schema";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type tSignInSchema = z.infer<typeof SignInSchema>;
export default function SignIn() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string>("");
  const [outAnimation, setOutAnimation] = useState<boolean>(false);
  const form = useForm<tSignInSchema>({
    resolver: zodResolver(SignInSchema),
  });
  async function onSubmit(values: tSignInSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const res = await axios.post("/api/auth/sign-in", values);
    if (res.data.error) {
      if (res.data.error.message === "Invalid login credentials") {
        setServerError(" Please check your email and password");
      } else {
        setServerError(res.data.error.message);
      }
    } else {
      router.push("/");
    }
  }

  return (
    <main className="w-screen h-full bg-background flex flex-col relative items-center  overflow-hidden">
      <Image
        src={"/login-bg.png"}
        width={1700}
        height={910}
        alt="bg"
        className="absolute  w-screen min-w-[1440px] h-screen min-h-[760px]  top-0 select-none pointer-events-none"
      />
      <div className="flex flex-col items-center py-20 overflow-y-scroll">
        <Tilt
          glareEnable={true}
          tiltEnable={false}
          glareMaxOpacity={0.3}
          glareBorderRadius="24px"
          glarePosition="all"
          className={cn(
            "w-[560px] h-fit fade-in  bg-form rounded-3xl flex flex-col justify-center items-center p-16 ",
            outAnimation && " fade-out"
          )}
        >
          <h1 className="text-4xl font-bold tracking-wider mb-4">
            <span className="super uppercase mr-2 font-bold">Gbox</span> Sign In
          </h1>
          <p className="text-base text-card-foreground text-center ">
            Join our community and become a better gamer.
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={cn("w-full  space-y-5 mt-9 ")}
            >
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
                        className="bg-transparent placeholder:text-white text-lg text-white border-t-0 border-l-0 border-r-0 border-white rounded-none focus-visible:!ring-offset-0 focus-visible:border-b-primary focus-visible:placeholder:text-primary  focus-visible:!ring-0"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="h-[70px]">
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                        className="bg-transparent placeholder:text-white text-lg text-white border-t-0 border-l-0 border-r-0 border-white rounded-none focus-visible:!ring-offset-0 focus-visible:border-b-primary focus-visible:placeholder:text-primary  focus-visible:!ring-0"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              {serverError && (
                <p className="text-red-400 text-center mt-3 tracking-wider font-bold ">
                  {serverError}
                </p>
              )}
              <div className="w-full border-[1px] cursor-pointer hover:border-primary hover:text-primary py-3 justify-center items-center rounded-full flex border-white">
                <span className="text-sm">Or continue with google</span>
                <BsGoogle className="ml-2 text-xl" />
              </div>
              <div className="w-full border-[1px] cursor-pointer hover:border-primary hover:text-primary py-3 justify-center rounded-full flex border-white">
                <span className="text-sm">Or continue with discord</span>
                <BsDiscord className="ml-2 text-xl" />
              </div>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full !mt-10 font-bold uppercase tracking-widest flex items-centers "
              >
                Submit
                {form.formState.isSubmitting && (
                  <AiOutlineLoading3Quarters className="ml-3 animate-spin " />
                )}
              </Button>
            </form>
          </Form>
          <p className=" mt-4">
            Don&rsquo;t have an account yet?{" "}
            <span
              onClick={() => {
                setOutAnimation(true);
                setTimeout(() => {
                  router.push("/sign-up");
                }, 500);
              }}
              className="text-primary cursor-pointer"
            >
              Sign up
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
          <span className="text-primary">Terms of Service</span> and{" "}
          <span className="text-primary">Privacy Policy</span>. For information
          on how we utilize cookies, please refer to our{" "}
          <span className="text-primary"> Cookies Policy</span>.
        </p>
      </div>
    </main>
  );
}
