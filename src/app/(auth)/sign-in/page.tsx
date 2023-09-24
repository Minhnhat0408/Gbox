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
                      className="bg-transparent placeholder:text-white text-lg text-white border-t-0 border-l-0 border-r-0 border-white rounded-none focus-visible:!ring-offset-0 focus-visible:border-b-primary focus-visible:placeholder:text-primary  focus-visible:!ring-0"
                    />
                  </FormControl>
                  <FormDescription>Enter your email address.</FormDescription>
                  <FormMessage className="text-red-500"/>
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
                  <FormDescription>Enter your password.</FormDescription>
                  <FormMessage className="text-red-500"/>
                  
                </FormItem>
              )}
            />
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
              className="w-full !mt-10 font-bold uppercase tracking-widest "
            >
              Submit
            </Button>
          </form>
        </Form>
      </Tilt>
      <p className="text-white max-w-[600px] z-10  mt-10  px-8 text-center">
        By signing up, you agree to our <span className="text-primary">Terms of Service</span> and <span className="text-primary">Privacy Policy</span>. For
        information on how we utilize cookies, please refer to our <span className="text-primary"> Cookies Policy</span>.
      </p>
    </main>
  );
}
