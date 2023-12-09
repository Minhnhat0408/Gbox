import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CoachApplicationType } from "@/types/supabaseTableType";
import Image from "next/image";
import Link from "next/link";

const Accepted = ({
  coachProfiles,
}: {
  coachProfiles: CoachApplicationType;
}) => {
  return (
    <div className="mx-8 !pt-[72px] px-16">
      <div
        className={cn(
          "mt-10 items-center justify-between flex mb-16 w-full gap-x-3"
        )}
      >
        <div className="w-10 h-10 rounded-full bg-primary center">
          <span className="text-black">1</span>
        </div>
        <div className="border-t-2 border-dashed border-zinc-400 flex-1"></div>
        <div className={cn("w-10 h-10 rounded-full center bg-primary ")}>
          <span className={cn("text-black")}>2</span>
        </div>
        <div className="border-t-2 border-dashed border-zinc-400 flex-1"></div>
        <div className={cn("w-10 h-10 rounded-full center bg-primary ")}>
          <span className={cn("text-black")}>3</span>
        </div>
        <div className="border-t-2 border-dashed border-zinc-400 flex-1"></div>
        <div className={cn("w-10 h-10 rounded-full center bg-primary ")}>
          <span className={cn("text-black")}>4</span>
        </div>
      </div>
      <div className="w-full flex justify-center pb-16">
        <div className="w-[636px] bg-home rounded-3xl px-10 py-10">
          <h1 className="font-bold super text-3xl mb-3 leading-normal">
            {"Welcome to Gbox Coach Platform !"}
          </h1>
          <div className="mb-8 text-white">
            Congratulations! Your application has been accepted.
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
                <div className="h-5 w-5 bg-primary text-black rounded-full"></div>
                <div className="font-bold text-sm">Accepted you as a coach</div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-sm">
            Welcome to Gbox Coach Platform ! You can now start your coaching
            journey by give coaching session to your students, show up your game
            knowledge and earn money from it.
          </div>
          <Link href={`/coach/${coachProfiles.profiles.name}`}>
            <Button size={"lg"} className="w-full rounded-xl mt-6">
              View coach profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Accepted;
