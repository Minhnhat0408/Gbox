"use client";

import { Button } from "@/components/ui/button";
import { useApplyProcess } from "@/hooks/useApplyProcess";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";

const SocialTips = () => {
  const { setApplyProcess } = useApplyProcess();

  return (
    <div className="xl:top-40 top-32 sticky h-[700px] w-[40%]">
      <div className="w-full rounded-xl bg-home p-7 pb-16 relative">
        <div className="rounded-lg p-[10px] bg-background text-white w-fit text-sm">
          Tips
        </div>
        <div className="mt-6 font-bold text-base">Goals & Contact Info</div>
        <div className="w-full text-sm mt-3 leading-normal">
          In order to maximize your chances of getting accepted to the platform,
          let us know excactly what your coaching goals are by fill in how many
          hours you can coach in a week.
        </div>
        <div className="w-full text-sm mt-6 leading-normal">
          You can also provide us some of your social media links to help us
          contact you to get some additional information when needed.
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
      <div className="flex w-full mt-20 justify-between items-center">
        <div
          onClick={() => {
            setApplyProcess("coach-profile");
          }}
          className="flex cursor-pointer items-center gap-x-4"
        >
          <ChevronLeft className="text-2xl" />
          <div className="text-base">GO BACK</div>
        </div>
        <Button
          className="float-right w-[189px] h-[56px] shine-2"
          size={"lg"}
          variant={"default"}
          type="submit"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SocialTips;
