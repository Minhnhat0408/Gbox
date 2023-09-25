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
    console.log(values);
  }

  return (
    <main className="bg-background login-bg flex items-center justify-center w-screen h-screen">
      <Tilt
        glareEnable={true}
        tiltEnable={false}
        glareMaxOpacity={0.3}
        glareBorderRadius="24px"
        glarePosition="all"
        className="w-[36vw] h-[80vh] bg-form rounded-3xl flex flex-col justify-center items-center xl:p-20 "
      >
        <h1 className="mb-10 text-4xl font-bold tracking-widest">
          <span className="super uppercase">Gbox</span> Login
        </h1>
        <p className="text-card-foreground mb-10 text-base text-center">
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
                      className="placeholder:text-white focus:border-0 text-lg text-white bg-transparent border-t-0 border-l-0 border-r-0 border-white rounded-none"
                    />
                  </FormControl>
                  <FormDescription>Enter your email address.</FormDescription>
                  <FormMessage />
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
                      className="placeholder:text-white focus:border-0 text-lg text-white bg-transparent border-t-0 border-l-0 border-r-0 border-white rounded-none"
                    />
                  </FormControl>
                  <FormDescription>Enter your password.</FormDescription>
                  <FormMessage />
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
            <div className="w-full border-[1px] cursor-pointer hover:border-primary hover:text-primary py-3 justify-center rounded-full flex border-white">
              <span className="text-sm">Or continue with twitch</span>
              <BsTwitch className="ml-2 text-xl" />
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
    </main>
  );
}
