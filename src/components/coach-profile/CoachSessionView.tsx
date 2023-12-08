"use client";

import { useCoachProfile } from "@/hooks/useCoachDetail";
import { CourseSessionType } from "@/types/supabaseTableType";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import LoadingAnimation from "../loading-components/LoadingAnimation";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import ViewMoreSession from "./ViewMoreSession";
import ProcessBuySessionModal from "./process-buy-session-modal/ProcessBuySessionModal";
import PickTimeLineModal from "./process-buy-session-modal/PickTimeLineModal";
import ImageNew from "../new-image/Image";

const CoachSessionView = () => {
  const [loading, setLoading] = useState(true);

  const [sessions, setSessions] = useState<{
    [key: string]: CourseSessionType[];
  }>({});

  const { data } = useCoachProfile();

  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!data.id || !supabaseClient) return;

    const fetchSessions = async () => {
      const { data: sessions, error } = await supabaseClient
        .from("course_session")
        .select("*")
        .eq("coach_id", data.id);

      if (error) {
        setLoading(false);
        return toast.error(error.message);
      }

      const sessionsByGame = sessions.reduce((acc, session) => {
        const gameName = session.game_meta_data.slug;

        if (!acc[gameName]) {
          acc[gameName] = [];
        }

        acc[gameName].push(session);

        return acc;
      }, {} as Record<string, CourseSessionType[]>);

      setSessions(sessionsByGame);

      setLoading(false);
    };

    fetchSessions();
  }, [data.id, supabaseClient]);

  return (
    <div className="my-12 flex flex-col gap-y-9">
      <ProcessBuySessionModal />
      <PickTimeLineModal />
      {loading && (
        <div className="w-full center">
          <LoadingAnimation
            className="w-16 h-16 mt-20 text-primary"
            fill="#00F0FF"
          />
        </div>
      )}
      {!loading && Object.keys(sessions).length === 0 ? (
        <div className="w-full mt-16 flex flex-col items-center gap-y-6">
          <ImageNew
            src="/images/logo.png"
            className="w-[150px] h-auto animate-bounce"
          />
          <div className="text-xl super font-bold">{`
            There currently no session of this coach
          `}</div>
        </div>
      ) : (
        Object.keys(sessions).map((gameName, index) => {
          const course = sessions[gameName];

          const gameData = course[0].game_meta_data;

          return (
            <div className="px-2" key={index}>
              <div className="flex items-center w-full justify-between">
                <div className="flex items-center gap-x-5">
                  <Image
                    src={gameData.image}
                    alt="image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-12 h-12 rounded-lg"
                  />
                  <h1 className="text-2xl font-semibold">
                    {gameData.name || gameData.shortName}
                  </h1>
                </div>
                <div className="inline-flex items-center justify-center bg-background rounded px-2 h-7 text-zinc-400">
                  <span className="text-sm">{course.length} lessons</span>
                </div>
              </div>
              <div className="mt-6 w-full rounded-xl space-y-5">
                {course.map((session, index) => (
                  <Accordion
                    key={index}
                    type="single"
                    className="w-full"
                    collapsible
                  >
                    <AccordionItem
                      className="border-0"
                      value={session.name + index}
                    >
                      <AccordionTrigger
                        className="w-full col-session flex py-4 bg-black/20 hover:bg-black/40 transition-all duration-150 px-6 rounded-xl
                       "
                      >
                        <div className="flex items-center flex-1 justify-between pr-5">
                          <div className="">
                            <div className="text-base mb-3 line-clamp-2 text-left">
                              {session.name}
                            </div>
                            <div className="text-sm text-left text-zinc-300">
                              {session.duration}
                            </div>
                          </div>
                          <div className="text-base font-bold">
                            {session.price === 0 ? (
                              "Free"
                            ) : (
                              <span className="inline-flex items-center">
                                <span>{session.price}</span>
                                <span className="text-[#3DBDA7] ml-1 mr-[6px]">
                                  G
                                </span>
                              </span>
                            )}
                            <span className="text-sm">/</span>
                            <span className="ml-[6px]">{session.duration}</span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="col-up">
                        <ViewMoreSession data={session} />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CoachSessionView;
