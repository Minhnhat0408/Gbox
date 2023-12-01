"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";

const AboutRules = ({
  form,
}: {
  form: UseFormReturn<
    {
      firstName: string;
      lastName: string;
      description: string;
      country: string;
    },
    any,
    undefined
  >;
}) => {
  return (
    <div className="xl:top-40 top-32 sticky h-[700px] w-[40%]">
      <div className="w-full rounded-xl bg-home p-7 pb-16 relative">
        <div className="rounded-lg p-[10px] bg-background text-white w-fit text-sm">
          Tips
        </div>
        <div className="mt-6 font-bold text-base">
          How to fill out your coach profile
        </div>
        <div className="w-full text-sm mt-3 leading-normal">
          Take the opportunity to expand on the games you have experience in. We
          also want to know what areas you specialize in - this information will
          ultimately be used to help students find your profile so be as
          accurate as possible.
        </div>
        <div className="w-full text-sm mt-6 leading-normal">
          You can also add your ingame ID for each game you have played. This is
          optional but will make the verification process faster.
        </div>
        <Image
          width={0}
          height={0}
          sizes="100vw"
          className=" w-28 h-28 absolute -bottom-9 -right-12"
          src={"/images/logo.png"}
          alt={"image"}
        />
      </div>
      <Button
        className="float-right mt-16 w-[189px] h-[56px] shine-2"
        size={"lg"}
        variant={"default"}
        type="submit"
      >
        Continue
      </Button>
    </div>
  );
};

export default AboutRules;
