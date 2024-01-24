import CountDown from "@/components/events-detail-section/CountDown";
import EventDetailSection from "@/components/events-detail-section/EventDetailSection";
import { Button } from "@/components/ui/button";
import { EventDetailProvider } from "@/providers/EventDetailProvider";
import { EventReturnType } from "@/types/supabaseTableType";
import { Database } from "@/types/supabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { BiSolidHome } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoGameController } from "react-icons/io5";

type EventProps = {
  params: {
    eventID: string;
  };
};

const EventPage = async ({ params }: EventProps) => {
  const { eventID } = params;

  const supabase = createServerComponentClient<Database>({ cookies });

  const user = await supabase.auth.getUser();

  const { data, error } = (await supabase
    .from("events")
    .select("*, profiles(*), event_participations(*, profiles(*))")
    .eq("id", eventID)
    .single()) as { data: EventReturnType; error: any };

  const isParticipate = data?.event_participations.some(
    (event_participation) =>
      event_participation.profiles.id === user.data.user?.id
  );

  const isHost = data?.profiles.id === user.data.user?.id;

  if (data === null || data === undefined || error) {
    return (
      <main className="px-8 2xl:my-10 my-7 w-full h-full !mt-[72px]">
        <section
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/syndra.jpg)`,
          }}
          className="bg-center center pt-12 rich-screen:pt-20 relative bg-cover w-full h-[calc(100vh-110px)] rounded-2xl mt-4 py-4 px-12"
        >
          <h1 className="super uppercase text-5xl font-bold">
            {"Can't found this event"}
          </h1>
        </section>
      </main>
    );
  }

  return (
    <main className="px-8 2xl:my-10 my-7 w-full h-full !mt-[72px]">
      <section
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${data.cover_image})`,
        }}
        className="bg-center pt-12 rich-screen:pt-20 relative bg-cover w-full h-[calc(100vh-140px)] rounded-2xl mt-4 py-4 px-12"
      >
        <div className="flex w-full h-[calc(100%-150px)]">
          <article className="w-3/5 flex flex-col justify-center">
            <div className="font-bold text-5xl w-full super max-w-[90%] h-fit pb-4">
              {data.event_name}
            </div>
            <p className="pb-6 pt-2 max-w[90%]">{data.description}</p>
            <div className="space-y-4">
              <div className="flex items-center">
                <BiSolidHome className="text-3xl mr-6 text-emerald-300" />
                <p className="text-xl">
                  is hosted by{" "}
                  <Link
                    href={`/user/${data.profiles.name}`}
                    className="underline super font-bold"
                  >
                    {data.profiles.name}
                  </Link>
                </p>
              </div>
              <div className="flex items-center">
                <IoGameController className="text-2xl mr-6 text-emerald-300" />
                <p className="text-xl">{data?.game_name || "Free Event"}</p>
              </div>
              <div className="flex items-center">
                <BsFillPeopleFill className="text-2xl mr-6 text-emerald-300" />
                <p className="text-xl">
                  {data.total_people !== "no-limit"
                    ? data.total_people
                    : "Unlimited"}{" "}
                  people
                </p>
              </div>
            </div>
          </article>
          <div className="w-2/5 flex justify-end items-center h-full">
            {data?.game_meta_data?.image ? (
              <div
                className="bg-cover bg-center border-4 border-solid border-green-400 bg-no-repeat rounded-lg w-[260px] h-[330px]"
                style={{
                  backgroundImage: `url(${data.game_meta_data.image})`,
                }}
              ></div>
            ) : (
              <Image
                src={"/images/logo.png"}
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                className="w-[230px] h-[230px]"
              />
            )}
          </div>
        </div>
        <CountDown date={data.start_date} />
        <div className="absolute right-0 left-0 w-full -bottom-6 flex justify-center items-center">
          <a href={"#event-section"}>
            <Button className="shine-2 text-white text-lg super-bg" size="lg">
              See More Detail
            </Button>
          </a>
        </div>
      </section>
      <EventDetailProvider
        isHost={isHost}
        isParticipate={isParticipate}
        data={data}
      >
        <EventDetailSection />
      </EventDetailProvider>
    </main>
  );
};

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default EventPage;
