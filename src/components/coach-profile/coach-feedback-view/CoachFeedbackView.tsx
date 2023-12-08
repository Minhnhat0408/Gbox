"use client";

import { useCoachProfile } from "@/hooks/useCoachDetail";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import LoadingAnimation from "../../loading-components/LoadingAnimation";
import { FeedbackWithStudentProfiles } from "@/types/supabaseTableType";
import ImageNew from "../../new-image/Image";
import { useKeenSlider } from "keen-slider/react";
import Slider from "../../animations/slider";
import { cn } from "@/lib/utils";
import FeedbackSVG from "./FeedbackSVG";
import FeedbackDrawerMenu from "./FeedbackDrawerMenu";

const CoachFeedbackView = () => {
  const [loading, setLoading] = useState(true);

  const [feedBack, setFeedback] = useState<FeedbackWithStudentProfiles[]>([]);

  const { data } = useCoachProfile();

  const { supabaseClient } = useSessionContext();

  const [ref] = useKeenSlider<HTMLDivElement>({
    mode: "free",
    slides: {
      perView: "auto",
      spacing: 30,
    },
  });

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const { data: feedBack, error } = await supabaseClient
          .from("feedback")
          .select("*, course_session(*), profiles!feedback_student_id_fkey(*)")
          .eq("coach_id", data.profiles.id)
          .order("rate", { ascending: false })
          .limit(5);

        if (error) throw error;
        setFeedback(feedBack as FeedbackWithStudentProfiles[]);
        setLoading(false);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    if (!data || !supabaseClient) return;

    fetchFeedback();
  }, [supabaseClient, data]);

  return (
    <div className="w-full my-12">
      {loading ? (
        <div className="w-full center">
          <LoadingAnimation
            className="w-16 h-16 mt-20 text-primary"
            fill="#00F0FF"
          />
        </div>
      ) : feedBack.length === 0 ? (
        <div className="w-full mt-16 flex flex-col items-center gap-y-6">
          <ImageNew
            src="/images/logo.png"
            className="w-[150px] h-auto animate-bounce"
          />
          <div className="text-xl super font-bold">{`
            There currently no feedback for this coach
          `}</div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center px-10 pb-10">
          <div className="flex w-full bg-home border-4 border-primary h-[350px] rounded-lg relative overflow-hidden">
            <FeedbackSVG />
            <Slider className="w-full h-full" delay={3000} loop autoPlay>
              {feedBack.map((item, index) => (
                <div
                  className="keen-slider__slide w-full h-full p-8 pb-0"
                  key={index}
                >
                  <div className="w-full items-center flex justify-between">
                    <div className="flex items-center gap-x-3">
                      <ImageNew
                        className={cn("w-14 h-14 rounded-full border-2", {
                          "border-blue-400": item.profiles.gender === "male",
                          "border-pink-400": item.profiles.gender === "female",
                        })}
                        src={item.profiles.avatar!}
                      />
                      <div className="flex flex-col justify-center items-start gap-y-[6px]">
                        <p className="text-zinc-300 font-bold text-lg">
                          {item.profiles.name}
                        </p>
                        <div className="text-zinc-400 text-sm line-clamp-1">
                          {item.course_session.name}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl leading-normal mt-8 super font-bold line-clamp-5">
                    {'" '}
                    {item.content}
                    {' "'}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <FeedbackDrawerMenu />
        </div>
      )}
    </div>
  );
};

export default CoachFeedbackView;
