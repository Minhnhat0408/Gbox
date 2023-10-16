import { Button } from "../ui/button";
import { DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import SlideLeft from "../animations/slide-left";
import { useEffect, useState } from "react";
import { usePlatformForm } from "@/hooks/usePlatformForm";
import { Skeleton } from "../ui/skeleton";
import { shallow } from "zustand/shallow";
import { BsCheckCircleFill } from "react-icons/bs";
import { Separator } from "../ui/separator";
import useInformationModal from "@/hooks/useInformationModal";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useUser } from "@/hooks/useUser";
import { platform } from "@/constants/platformIcon";
import { wait } from "@/lib/wait";

export default function PlatformForm() {
  const [error, setError] = useState<string>("");
  const [loading, setIsLoading] = useState<boolean>(false);

  const {
    gaming_platform,
    gamingPlatformUI,
    setGamingPlatformUI,
    setGamingPlatform,
  } = usePlatformForm((set) => set, shallow);

  const { setFormType } = useInformationModal();

  const { supabaseClient } = useSessionContext();

  const { user } = useUser();

  const handleUpdate = async () => {
    if (gaming_platform.length === 0)
      return setError("Please select at least 1 platform");

    setIsLoading(true);
    const platformData = gaming_platform.map((e) => {
      return {
        name: e.name,
        slug: e.slug,
      };
    });

    const { data, error: updateError } = await supabaseClient
      .from("profiles")
      .update({
        gaming_platform: platformData,
      })
      .eq("id", user?.id);
    if (updateError) {
      setError(updateError.message);
    }
    setIsLoading(false);
    setFormType("played-form");
  };

  useEffect(() => {
    const getPlatform = async () => {
      const result = Object.keys(platform).map((e: string) => {
        return {
          name: platform[e as keyof typeof platform].name,
          icon: platform[e as keyof typeof platform].icon(
            "w-[180px] h-[180px]"
          ),
          slug: e,
        };
      });
      await wait(1700);
      setGamingPlatformUI(result);
    };
    getPlatform();
  }, []);

  return (
    <SlideLeft>
      <DialogHeader>
        <DialogTitle className="mb-5 text-3xl capitalize">
          {"Which gaming platform do you play on?"}
        </DialogTitle>
      </DialogHeader>
      <div className="overflow-y-auto gap-x-4 gap-y-[60px] h-[455px] max-h-[455px] mt-4 grid grid-cols-3">
        {gamingPlatformUI.length === 0 ? (
          <>
            <Skeleton className="w-auto h-[180px]" />
            <Skeleton className="w-auto h-[180px]" />
            <Skeleton className="w-auto h-[180px]" />
            <Skeleton className="w-auto h-[180px]" />
            <Skeleton className="w-auto h-[180px]" />
            <Skeleton className="w-auto h-[180px]" />
            <Skeleton className="w-auto h-[180px]" />
            <Skeleton className="w-auto h-[180px]" />
            <Skeleton className="w-auto h-[180px]" />
          </>
        ) : (
          <>
            {gamingPlatformUI.map((e, index) => {
              const is_checked = gaming_platform.findIndex(
                (element) => element.slug === e.slug
              );
              return (
                <div
                  key={index}
                  className={`w-[180px] h-[180px] rounded-lg relative cursor-pointer
                  `}
                  onClick={() => {
                    const newArr = [...gaming_platform];
                    const index = newArr.findIndex(
                      (element) => element.slug === e.slug
                    );
                    if (index === -1) {
                      setError("");
                      newArr.push(e);
                    } else {
                      newArr.splice(index, 1);
                    }
                    setGamingPlatform(newArr);
                  }}
                >
                  {is_checked !== -1 ? (
                    <div className="top-4 right-4 absolute z-10 flex items-center justify-center w-8 h-8 bg-white rounded-full">
                      <BsCheckCircleFill className="w-8 h-8 text-2xl text-green-500" />
                    </div>
                  ) : (
                    <div className="top-4 right-4 bg-gray-400/70 absolute z-10 flex items-center justify-center w-8 h-8 rounded-full">
                      <BsCheckCircleFill className="opacity-90 w-8 h-8 text-2xl text-gray-900" />
                    </div>
                  )}
                  {e.icon}
                  {is_checked !== -1 && (
                    <div className="absolute left-0 border-4 border-green-500 border-solid right-0 z-5 top-0 bg-black/60 h-[180px] rounded-[44px]"></div>
                  )}
                  <p className="mt-3 font-bold text-center">{e.name}</p>
                </div>
              );
            })}
          </>
        )}
      </div>
      <Separator
        className={`bg-[rgb(74,136,96)] mb-5 h-[2.5px] translate-x-[-5.1%] ${
          gamingPlatformUI.length === 0 && "opacity-0"
        }`}
        style={{
          width: "111.55%",
        }}
      />
      <DialogFooter className="relative items-center w-full mt-4">
        {!!error && (
          <p className="absolute left-0 self-start mt-2 font-bold text-red-400">
            {error}
          </p>
        )}
        {loading ? (
          <Button
            type="button"
            disabled
            className="disabled:opacity-25 flex items-center justify-center w-[125px]"
          >
            <AiOutlineLoading3Quarters className="animate-spin mr-3" />
            <p>Loading</p>
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={handleUpdate}
            className={`${
              gamingPlatformUI.length === 0 && "opacity-0"
            } disabled:opacity-25 flex items-center justify-center w-[125px]`}
          >
            <p>Save change</p>
          </Button>
        )}
      </DialogFooter>
    </SlideLeft>
  );
}
