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
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SignUpSchema } from "@/schema/auth-schema";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export type tSignUpSchema = z.infer<typeof SignUpSchema>;
export default function SignUp() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string>("");
  const [outAnimation, setOutAnimation] = useState<boolean>(false);

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
      router.push("/");
    }
  }

  return (
    <main className="w-screen h-screen overflow-hidden  bg-background flex flex-col relative items-center ">
      <Image
        src={"/login-bg.png"}
        width={1700}
        height={910}
        alt="bg"
        className="absolute w-screen min-w-[1440px] h-screen min-h-[760px] top-0  select-none pointer-events-none"
      />
      <div className="flex flex-col items-center w-full overflow-y-scroll  py-8">
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
          <h1 className="text-3xl font-bold tracking-wider mb-4">
            <span className="super uppercase mr-2 font-bold">Gbox</span> Sign Up
          </h1>
          <p className="text-base text-card-foreground text-center">
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
                    <FormMessage className="text-red-500 " />
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
                    <FormMessage className="text-red-500 " />
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
                    <FormMessage className="text-red-500 " />
                  </FormItem>
                )}
              />
              {serverError && (
                <p className="text-red-400 text-center tracking-wider font-bold">
                  {serverError}
                </p>
              )}
              <div className="w-full border-[1px] cursor-pointer hover:border-primary hover:text-primary py-3 justify-center items-center rounded-full flex border-white">
                <span className="text-sm">Or continue with google</span>
                <BsGoogle className="ml-2 text-xl" />
              </div>
              <div className="w-full border-[1px] cursor-pointer  hover:border-primary hover:text-primary py-3 justify-center rounded-full flex border-white">
                <span className="text-sm">Or continue with discord</span>
                <BsDiscord className="ml-2 text-xl" />
              </div>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full !mt-10 font-bold uppercase tracking-widest "
              >
                Submit
                {form.formState.isSubmitting && (
                  <AiOutlineLoading3Quarters className="ml-3 animate-spin " />
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
                  router.push("/sign-in");
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
          <span className="text-primary">Terms of Service</span> and{" "}
          <span className="text-primary">Privacy Policy</span>. For information
          on how we utilize cookies, please refer to our{" "}
          <span className="text-primary"> Cookies Policy</span>.
        </p>
      </div>
    </main>
  );
}
