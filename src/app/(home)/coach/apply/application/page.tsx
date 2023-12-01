"use client";

import AboutApplyForm from "@/components/coach-application/about-form/AboutApplyForm";
import FinishForm from "@/components/coach-application/finish-form/FinishForm";
import SocialForm from "@/components/coach-application/social-form/SocialForm";
import { Button } from "@/components/ui/button";
import { useApplyProcess } from "@/hooks/useApplyProcess";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// 1 person only have 1 application, if that application is denied, delete record from coach-application table

const ApplyCoachingPage = () => {
  const { applyProcess } = useApplyProcess();

  const router = useRouter();

  return (
    <div className="mx-8 !pt-[72px] px-16">
      <div
        className={cn(
          "mt-10 items-center justify-between flex mb-32 w-full gap-x-3",
          {
            "mb-16": applyProcess === "done-submit",
          }
        )}
      >
        <div className="w-10 h-10 rounded-full bg-primary center">
          <span className="text-black">1</span>
        </div>
        <div className="border-t-2 border-dashed border-zinc-400 flex-1"></div>
        <div
          className={cn("w-10 h-10 rounded-full center ", {
            "border-2 border-primary ": applyProcess === "coach-profile",
            "bg-primary": applyProcess !== "coach-profile",
          })}
        >
          <span
            className={cn("text-black", {
              "text-white": applyProcess === "coach-profile",
            })}
          >
            2
          </span>
        </div>
        <div className="border-t-2 border-dashed border-zinc-400 flex-1"></div>
        <div
          className={cn("w-10 h-10 rounded-full center ", {
            "border-2 border-primary ": applyProcess === "social-media",
            "bg-primary": applyProcess !== "social-media",
          })}
        >
          <span
            className={cn("text-black", {
              "text-white": applyProcess === "social-media",
            })}
          >
            3
          </span>
        </div>
        <div className="border-t-2 border-dashed border-zinc-400 flex-1"></div>
        <div
          className={cn("w-10 h-10 rounded-full center ", {
            "border-2 border-primary ": applyProcess === "finish",
            "bg-primary": applyProcess !== "finish",
          })}
        >
          <span
            className={cn("text-black", {
              "text-white": applyProcess === "finish",
            })}
          >
            4
          </span>
        </div>
      </div>
      {applyProcess === "done-submit" ? (
        <div className="w-full flex justify-center pb-16">
          <div className="w-[636px] bg-home rounded-3xl px-10 py-10">
            <h1 className="font-bold super text-3xl mb-3 leading-normal">
              {"You're on your way to becoming a Gbox Coach!"}
            </h1>
            <div className="mb-8 text-white">
              Your coach application have been created.
            </div>
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)), url(/syndra.jpg)`,
              }}
              className="rounded-2xl relative w-full px-8 py-10 bg-center bg-cover space-y-2"
            >
              <Image
                src="/images/logo.png"
                alt={"image"}
                sizes="100vw"
                height={0}
                width={0}
                className=" w-36 h-36 absolute -top-8 -right-8 animate-float"
              />
              <div className="flex flex-col gap-y-2">
                <div className="flex space-x-4 items-center">
                  <div className="h-5 w-5 bg-primary text-black rounded-full"></div>
                  <div className="font-bold text-sm">
                    Profile basic information
                  </div>
                </div>
                <div className="w-full ml-2 border-l-white border-l-2 h-6"></div>
                <div className="flex space-x-4 items-center">
                  <div className="h-5 w-5 bg-primary text-black rounded-full"></div>
                  <div className="font-bold text-sm">
                    Create your coaching profile
                  </div>
                </div>
                <div className="w-full ml-2 border-l-white border-l-2 h-6"></div>
                <div className="flex space-x-4 items-center">
                  <div className="h-5 w-5 bg-primary text-black rounded-full"></div>
                  <div className="font-bold text-sm">
                    Submit your coach application
                  </div>
                </div>
                <div className="w-full ml-2 border-l-white border-l-2 h-6"></div>
                <div className="flex space-x-4 items-center">
                  <div className="h-5 w-5 border-2 border-primary text-white rounded-full"></div>
                  <div className="font-bold text-sm">
                    Accepted you as a coach
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 text-sm">
              Please wait till we review your application. Until your request is
              being accepted, you can review your application status in{" "}
              <Link href="/request-history" className="super hover:underline">
                Request History
              </Link>
            </div>
            <Button
              onClick={() => {
                router.push("/request-history");
              }}
              size={"lg"}
              className="w-full rounded-xl mt-6"
            >
              View request history
            </Button>
          </div>
        </div>
      ) : (
        <>
          <AboutApplyForm />
          <SocialForm />
          <FinishForm />
        </>
      )}
    </div>
  );
};

export default ApplyCoachingPage;
