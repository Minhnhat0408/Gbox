"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { VscLoading } from "react-icons/vsc";
import { SiRiotgames } from "react-icons/si";
import { ChevronLeft } from "lucide-react";
import { useApplyProcess } from "@/hooks/useApplyProcess";

const FinishTips = ({ loading }: { loading: boolean }) => {
  const { setApplyProcess } = useApplyProcess();

  return (
    <div className="xl:top-40 top-32 sticky h-[700px] w-[40%]">
      <div className="w-full rounded-xl bg-home p-7 pb-16 relative">
        <div className="rounded-lg p-[10px] bg-background text-white w-fit text-sm">
          Tips
        </div>
        <div className="mt-6 font-bold text-base">How to fill in this form</div>
        <div className="w-full text-sm mt-3 leading-normal">
          You can provide some information that will support you to get accepted
          to our coaching platform, such as, your game rank, your champion
          master, your ingame skill, achivements, ....
        </div>
        <div className="w-full text-sm mt-6 leading-normal">
          P/S: An image or your game profile, game tournament screenshot, a
          video link of your showcase match, ....
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
      <div className="flex w-full mt-16 justify-between items-center">
        <div
          onClick={() => {
            setApplyProcess("social-media");
          }}
          className="flex cursor-pointer items-center gap-x-4"
        >
          <ChevronLeft className="text-2xl" />
          <div className="text-base">GO BACK</div>
        </div>
        <Button
          className=" w-[189px] h-[56px] shine-2"
          size={"lg"}
          variant={"default"}
          type="submit"
          disabled={loading}
        >
          <span>Submit</span>
          {loading ? (
            <VscLoading className="ml-3 text-base animate-spin" />
          ) : (
            <SiRiotgames className="ml-3 text-base" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default FinishTips;
