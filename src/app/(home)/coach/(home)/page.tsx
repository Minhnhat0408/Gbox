import ImageNew from "@/components/new-image/Image";
import { Button } from "@/components/ui/button";
import { convertDurationToMinute } from "@/lib/convertDurationToMinute";
import { wait } from "@/lib/wait";
import { Database } from "@/types/supabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

const CoachingPage = async () => {
  const supabaseClient = createServerComponentClient<Database>({ cookies });

  const getCoachesTop = supabaseClient.rpc("get_top_coaches");

  const getTopSessions = supabaseClient.rpc("get_top_course_sessions");

  const [coaches, sessions] = await Promise.all([
    getCoachesTop,
    getTopSessions,
  ]);

  if (coaches.error || sessions.error) {
    console.log(coaches.error, sessions.error);
  }

  return (
    <div className="mx-8 !pt-[72px] px-14">
      <div className="w-full mt-8">
        <div className="relative inset-x-0 top-0 h-[149px] overflow-hidden sm:h-[192px] lg:mx-2 lg:mt-10 lg:h-[290px] rounded-t-3xl">
          <ImageNew
            src="/images/banner.jfif"
            className="absolute left-0 top-0 !h-full !w-full object-cover object-center w-150 sm:w-[768px] md:w-[1024px] lg:w-[1600px] self-start shrink-0"
          />
          <div
            className="absolute left-0 top-0 h-full w-full"
            style={{
              background:
                "linear-gradient(180deg, rgba(14, 14, 17, 0) 0%, rgba(14, 14, 17, 0.821335) 57.21%, rgba(14, 14, 17, 0.957008) 75.82%, #0E0E11 100%)",
            }}
          ></div>
          <div className="all-0 select-none center">
            <div className="text-6xl super font-bold tracking-wide">
              Coach and Session
            </div>
          </div>
        </div>
      </div>
      <div className="w-full my-7 text-2xl font-bold mx-2 flex items-center justify-between">
        <div>Top Experts</div>
        <Link
          href={"/discover/coach"}
          className="text-teal-500 mr-6 text-lg hover:underline no-underline"
        >
          View All
        </Link>
      </div>
      <div className="w-full overflow-x-auto items-center h-[325px] flex ">
        {coaches.data?.map((coach, index) => (
          <Link
            key={index}
            className="inline-block shrink-0 w-1/5 px-3 h-full "
            href={`/coach/${coach.profile_name}`}
          >
            <div className="w-full group overflow-hidden h-full rounded-xl">
              <div className="w-full h-[200px] overflow-hidden rounded-xl">
                <ImageNew
                  src={coach.avatar}
                  className="w-full h-[200px] rounded-xl object-cover object-center scale-100 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex my-3 items-center justify-between">
                <div className="max-w-[70%] line-clamp-1 font-bold text-lg">
                  {coach.full_name}
                </div>
                {coach.average_rate && (
                  <div className="super font-bold">
                    {coach.average_rate.toFixed(1)}
                    <span className="text-xs mx-1">/</span> 10
                  </div>
                )}
              </div>
              <div className="mt-3 text-zinc-400 text-sm block">
                <div className="line-clamp-3">{coach.description}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="w-full my-7 text-2xl font-bold mx-2 flex items-center justify-between">
        <div>Trending Sessions</div>
        <Link
          href={"/discover/session"}
          className="text-teal-500 mr-6 text-lg hover:underline no-underline"
        >
          View All
        </Link>
      </div>
      <div className="w-full overflow-x-auto items-center h-[325px] flex ">
        {sessions.data?.map((session, index) => {
          if (index > 4) return;
          return (
            <Link
              key={index}
              className="inline-block shrink-0 w-1/5 px-3 h-full "
              href={`/coach/${session.coach_profile_name}`}
            >
              <div className="w-full group overflow-hidden h-full rounded-xl">
                <div className="w-full h-[200px] overflow-hidden rounded-xl">
                  <ImageNew
                    src={(session.game_meta_data as any).image}
                    className="w-full h-[200px] rounded-xl object-cover object-center scale-100 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex my-3 items-center justify-between">
                  <div className="max-w-[70%] line-clamp-1 font-bold text-lg">
                    {session.course_name}
                  </div>
                  <div className="flex items-center font-bold">
                    <span>{session.price}</span>
                    <span className="text-teal-300 text-base ml-1">G</span>
                  </div>
                </div>
                <div className="mt-3 text-zinc-400 text-sm block">
                  <div className="line-clamp-3">{session.description}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="w-full overflow-x-auto items-center mt-10 h-[325px] flex ">
        {sessions.data?.map((session, index) => {
          if (index < 5) return;
          return (
            <Link
              key={index}
              className="inline-block shrink-0 w-1/5 px-3 h-full "
              href={`/coach/${session.coach_profile_name}`}
            >
              <div className="w-full group overflow-hidden h-full rounded-xl">
                <div className="w-full h-[200px] overflow-hidden rounded-xl">
                  <ImageNew
                    src={(session.game_meta_data as any).image}
                    className="w-full h-[200px] rounded-xl object-cover object-center scale-100 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex my-3 items-center justify-between">
                  <div className="max-w-[70%] line-clamp-1 font-bold text-lg">
                    {session.course_name}
                  </div>
                  <div className="flex items-center font-bold">
                    <span>{session.price}</span>
                    <span className="text-teal-300 text-base ml-1">G</span>
                  </div>
                </div>
                <div className="mt-3 text-zinc-400 text-sm block">
                  <div className="line-clamp-3">{session.description}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="py-10 center">
        <Link href="/discover/session">
          <Button>View More</Button>
        </Link>
      </div>
    </div>
  );
};

export default CoachingPage;
