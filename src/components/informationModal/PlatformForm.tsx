import { Button } from "../ui/button";
import { DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import SlideLeft from "../animations/slide-left";
import { useEffect, useState } from "react";
import { getAllPlatform } from "@/services/client/rawgClientService";
import { Platform, usePlatformForm } from "@/hooks/usePlatformForm";
import { Skeleton } from "../ui/skeleton";
import { shallow } from "zustand/shallow";
import Image from "next/image";
import { BsCheckCircleFill } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import useInformationModal from "@/hooks/useInformationModal";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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

    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

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
      const result = await getAllPlatform();
      const newArr = result?.data?.map((e) => {
        return {
          name: e.name,
          image_background: e.image_background,
          slug: e.slug,
        };
      });
      setGamingPlatformUI(newArr);
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
      <div className="overflow-y-auto gap-x-4 gap-y-12 h-[455px] max-h-[455px] mt-4 grid grid-cols-3">
        {gamingPlatformUI.length === 0 ? (
          <>
            <Skeleton className="w-auto h-[200px]" />
            <Skeleton className="w-auto h-[200px]" />
            <Skeleton className="w-auto h-[200px]" />
            <Skeleton className="w-auto h-[200px]" />
            <Skeleton className="w-auto h-[200px]" />
            <Skeleton className="w-auto h-[200px]" />
            <Skeleton className="w-auto h-[200px]" />
            <Skeleton className="w-auto h-[200px]" />
            <Skeleton className="w-auto h-[200px]" />
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
                  className={`w-[196.66px] h-[200px] rounded-lg relative cursor-pointer
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
                    <div className="w-7 h-7 top-2 right-2 absolute z-10 flex items-center justify-center bg-white rounded-full">
                      <BsCheckCircleFill className="w-7 h-7 text-2xl text-green-500" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 top-2 right-2 bg-gray-400/70 absolute z-10 flex items-center justify-center rounded-full">
                      <BsCheckCircleFill className="w-7 h-7 opacity-90 text-2xl text-gray-900" />
                    </div>
                  )}
                  <Image
                    width={196.66}
                    height={160}
                    className={cn(
                      `object-cover transition-all border-transparent object-center border-4 border-solid w-[196.66px] h-[180px] rounded-lg relative box-border`,
                      {
                        "opacity-100": is_checked !== -1,
                        "border-green-500": is_checked !== -1,
                      }
                    )}
                    src={e.image_background}
                    alt="platform image"
                    onLoadStart={(event) => {
                      (event.target as HTMLImageElement)?.classList.add(
                        "opacity-0"
                      );
                    }}
                    onLoadingComplete={(image: HTMLImageElement) => {
                      image.classList.remove("opacity-0");
                    }}
                  />
                  {is_checked !== -1 && (
                    <div className="absolute left-1 right-1 z-5 top-1 bg-black/60 h-[172px] rounded-sm"></div>
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
