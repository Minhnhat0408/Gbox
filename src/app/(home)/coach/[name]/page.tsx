import { MdRateReview } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { MdAddToPhotos } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { Database } from "@/types/supabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import { CoachDataWithProfile } from "@/types/supabaseTableType";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { IoChatboxSharp } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import PostsScroll from "@/components/post-ui/posts-scroll";
import { cn } from "@/lib/utils";
import { flag } from "@/constants/flag";
import CoachInformation from "@/components/coach-profile/CoachInformation";
import { CoachProfileProvider } from "@/providers/CoachProfileProvider";
import CoachProfileViewMode from "@/components/coach-profile/CoachProfileViewMode";
import CreateSessionButton from "@/components/coach-profile/CreateSessionButton";
import CreateCoachSessionModal from "@/components/coach-profile/create-coach-session-modal/CreateCoachSessionModal";
import FeedbackButton from "@/components/coach-profile/provide-feedback/FeedbackButton";

const CoachProfile = async ({
  params,
}: {
  params: {
    name: string;
  };
}) => {
  const { name } = params;

  if (!name) {
    return redirect("/coach");
  }

  const supabaseClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  const { data, error } = (await supabaseClient
    .from("coach_profiles")
    .select("*, profiles(*)")
    .eq("profile_name", name)
    .single()) as unknown as { data: CoachDataWithProfile | null; error: any };

  if (!data) {
    return (
      <div className="mx-8 !pt-[72px] px-14">
        <div className="w-full center py-12">
          <div className="flex flex-col items-center">
            <Image
              src="/images/logo.png"
              alt="image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-[150px] mb-5 h-auto"
            />
            <div className="text-xl text-center text-gray-300">
              {"We can't"} find any coach profile with name:{" "}
              {<span className="super">{name}</span>} 🥲
            </div>
            <div className="text-xl mt-2 text-center text-gray-300"></div>
          </div>
        </div>
      </div>
    );
  }

  //BUG: clingy after change view mode

  // TODO: coach have to fill in availabel time in a week
  // TODO: new coach have to fill in F&Q
  // TODO: chat with coach
  // TODO: implement rating system
  // TODO: display coach rating

  return (
    <div className="mx-8 !pt-[72px] px-2 flex gap-x-12">
      <CoachProfileProvider data={data}>
        <CreateCoachSessionModal />
        <div className="w-3/5 overflow-hidden">
          <div className="py-6 w-full mt-6">
            <div className="relative w-full h-full">
              <div className="bg-ondark-low relative h-full w-full overflow-hidden rounded-xl">
                <div className="absolute left-0 top-0 w-full">
                  <Image
                    src={"/syndra.jpg"}
                    alt="bg"
                    sizes="100vw"
                    width={0}
                    height={0}
                    className="!w-full object-cover h-[150px] self-start shrink-0 object-top"
                  />
                  <div className="from-ondark-low absolute left-0 top-0 h-full w-full bg-gradient-to-t"></div>
                </div>
                <div className="relative flex h-full cursor-pointer flex-col p-6 pt-16">
                  <div className="mt-0">
                    <div className="flex items-center gap-x-5">
                      <div
                        className={cn("border-4 rounded-full", {
                          "border-pink-500": data.profiles.gender === "female",
                          "border-blue-400": data.profiles.gender === "male",
                        })}
                      >
                        <Image
                          src={data.profiles.avatar!}
                          alt="bg"
                          sizes="100vw"
                          width={0}
                          height={0}
                          className="bg-ondark-low object-cover text-transparent w-24 h-24  null rounded-full shrink-0"
                        />
                      </div>
                      <div className="flex flex-col gap-y-1">
                        <p className="text-3xl font-bold super line-clamp-3">
                          {data.full_name}
                        </p>
                        <div className="flex items-center gap-x-2">
                          <Link
                            href={`/user/${data.profiles.name}`}
                            className="text-zinc-400 hover:underline"
                          >
                            @{data.profiles.name}
                          </Link>
                          <Image
                            src={
                              flag[data.profiles.location as keyof typeof flag]
                            }
                            alt="flag"
                            className="h-[1.2em] w-[1.8em] rounded-[4px] ml-2"
                            width={600}
                            height={400}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col gap-y-1 xl:mt-8">
                      <p className="line-clamp-3 text-xs xl:line-clamp-4 xl:text-sm">
                        {data.description}
                      </p>
                    </div>
                    <div className="mt-4 w-full flex gap-x-3 justify-between">
                      <Link
                        className="flex-1"
                        href={`/user/${data.profiles.name}`}
                      >
                        <Button className="flex items-center w-full">
                          <FaUser className="mr-3" />
                          See Profile
                        </Button>
                      </Link>
                      {user?.id !== data.profiles.id ? (
                        <>
                          <Button
                            className="flex items-center flex-1"
                            variant={"outline"}
                          >
                            <IoChatboxSharp className="mr-3" />
                            Chat
                          </Button>
                          <FeedbackButton />
                        </>
                      ) : (
                        <>
                          <CreateSessionButton />
                          <Link
                            className="flex-1"
                            href="/request-history/booking"
                          >
                            <Button
                              className="flex items-center flex-1 w-full"
                              variant={"outline"}
                            >
                              <PiStudentBold className="mr-3 text-xl" />
                              View Request
                            </Button>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CoachProfileViewMode />
        </div>
        <div className="w-2/5">
          <CoachInformation />
        </div>
      </CoachProfileProvider>
    </div>
  );
};

export default CoachProfile;
