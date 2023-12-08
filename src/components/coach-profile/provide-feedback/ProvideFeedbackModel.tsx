"use client";

import LoadingAnimation from "@/components/loading-components/LoadingAnimation";
import Modal from "@/components/modals/Modal";
import ImageNew from "@/components/new-image/Image";
import { useCoachProfile } from "@/hooks/useCoachDetail";
import { useProvideFeedbackModal } from "@/hooks/useProvideFeedbackModal";
import { useUser } from "@/hooks/useUser";
import { wait } from "@/lib/wait";
import { AppointmentRequestWithCourseData } from "@/types/supabaseTableType";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { Button } from "@/components/ui/button";
import { convertScoreColor } from "@/lib/convertScoreColor";
import convertScoreToEmoji from "@/lib/convertScoreToEmoji";

const formSchema = z.object({
  courseID: z.string({
    required_error: "Please select one course",
  }),
  feedback: z
    .string({
      required_error: "Feedback is required",
    })
    .min(10, "Feedback must be at least 10 characters"),
  rate: z.number({
    required_error: "Rate score is required",
  }),
});

const ProvideFeedbackModal = () => {
  const { isOpen, onClose } = useProvideFeedbackModal();

  const [wallpaper, setWallpaper] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);

  const [score, setScore] = useState<number>(0);

  const [attendedSession, setAttendedSession] = useState<
    AppointmentRequestWithCourseData[]
  >([]);

  const { supabaseClient } = useSessionContext();

  const { userDetails } = useUser();

  const { data } = useCoachProfile();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseID: undefined,
      feedback: "",
      rate: -1,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.rate <= 0) {
      return toast.error("Please rate this course by sliding the error");
    }

    try {
      setLoadingForm(true);
      const { data: feedbackData, error } = await supabaseClient
        .from("feedback")
        .insert({
          student_id: userDetails?.id,
          coach_id: data?.profiles.id,
          course_session_id: values.courseID,
          rate: values.rate,
          content: values.feedback,
        });

      if (error) {
        throw error;
      }

      setLoadingForm(false);
      toast.success("Feedback submitted successfully");
      onClose();
      form.reset();
    } catch (error: any) {
      toast.error(error.message);
      setLoadingForm(false);
      onClose();
      form.reset();
    }
  };

  useEffect(() => {
    const fetchFeedbackAbility = async () => {
      try {
        await wait(500);

        const { data: fetchData, error } = (await supabaseClient
          .from("appointment_request")
          .select("*, course_session(*)")
          .eq("coach_id", data?.id)
          .eq("request_user_id", userDetails?.id)
          .neq("status", "rejected")) as unknown as {
          data: AppointmentRequestWithCourseData[];
          error: any;
        };

        if (error) {
          throw error;
        }

        const filteredData = fetchData.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.course_id === item.course_id)
        );

        setAttendedSession(filteredData);

        setLoading(false);
      } catch (error: any) {
        toast.error(error.message);
        onClose();
        setLoading(false);
      }
    };

    if (!data || !userDetails || !supabaseClient) return;

    if (isOpen) {
      fetchFeedbackAbility();
    } else {
      setLoading(true);
      setWallpaper(null);
      form.reset();
      form.clearErrors();
    }
  }, [userDetails, supabaseClient, data, isOpen, onClose, form]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      className={cn(
        "max-w-[760px] h-[620px] remove-button flex flex-col !p-0 items-center  !rounded-2xl",
        {
          "bg-layout": !wallpaper,
          "bg-transparent border-transparent": wallpaper,
        }
      )}
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="w-full overflow-hidden rounded-xl h-full relative p-7 px-8 pb-5">
        {wallpaper && (
          <div
            className="all-0 blur-md  z-0  bg-cover bg-top"
            style={{
              backgroundImage: `linear-gradient(319.38deg,#1d1e22 30%,rgba(29,30,34,.5)), url(${wallpaper})`,
            }}
          ></div>
        )}
        {loadingForm && (
          <div className="absolute z-[100] center rounded-2xl bg-black/50 top-0 bottom-0 right-0 left-0">
            <LoadingAnimation
              className="w-16 h-16 text-primary"
              fill="#00F0FF"
            />
          </div>
        )}
        {loading ? (
          <div className="absolute z-0 center rounded-2xl bg-black/50 top-0 bottom-0 right-0 left-0">
            <LoadingAnimation
              className="w-16 h-16 text-primary"
              fill="#00F0FF"
            />
          </div>
        ) : attendedSession.length === 0 ? (
          <div className="w-full h-full center">
            <div className="flex items-center flex-col gap-y-4">
              <ImageNew
                src="/images/logo.png"
                className="w-[150px] animate-bounce h-auto"
              />
              <div className="text-5xl super font-bold">
                ダメ <span className="text-white">😒</span>
              </div>
              <div className="text-lg w-[70%] font-bold text-center mt-4">
                You have to have at least 1 past appointment request to provide
                feedback to this coach
              </div>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form
              className="z-50 relative h-full w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="w-full flex justify-between">
                <h1 className="font-bold super text-2xl">Provide Feedback</h1>
                <FormField
                  control={form.control}
                  name="courseID"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(e) => {
                          field.onChange(e);
                          // find course_session with id = e
                          const courseSession = attendedSession.find(
                            (item) => item.course_session.id === e
                          );

                          if (!courseSession) return;

                          setWallpaper(
                            courseSession.course_session.game_meta_data.image
                          );
                        }}
                      >
                        <FormControl>
                          <>
                            <SelectTrigger className="w-[300px] gap-x-2 select-clamp line-clamp-1">
                              <SelectValue
                                className="a"
                                placeholder="Select feedback course"
                              />
                            </SelectTrigger>
                            <div className="h-[3rem] absolute top-6 right-1 flex items-center">
                              <FormMessage className="text-rose-400 mt-2" />
                            </div>
                          </>
                        </FormControl>
                        <SelectContent side="bottom" align="end">
                          {attendedSession.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.course_session.id}
                            >
                              {item.course_session?.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full justify-between items-center my-10">
                <div className="flex items-start gap-x-4">
                  <ImageNew
                    src={userDetails?.avatar!}
                    className="w-14 h-14 rounded-full"
                  ></ImageNew>
                  <div className="flex flex-col items-start">
                    <div className="text-xl font-bold">{userDetails?.name}</div>
                    <div className="mt-2 text-sm italic text-zinc-400">
                      Gbox Student
                    </div>
                  </div>
                </div>
                <div
                  className={`font-bold text-5xl mb-1 flex items-center ${
                    score >= 0 ? convertScoreColor(score) : "text-zinc-300"
                  }`}
                >
                  {score >= 0 ? score : "NS"}
                  <span className="ml-2 text-black text-4xl transition-transform duration-300 ease-in-out">
                    {convertScoreToEmoji(score)}
                  </span>
                </div>
              </div>
              <FormField
                control={form.control}
                name="rate"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="w-full h-14 center relative rounded-2xl border-white/20 border mt-8">
                      <FormMessage />
                      <SliderPrimitive.Root
                        className={cn(
                          "relative flex w-full touch-none select-none items-center z-20"
                        )}
                        defaultValue={[0]}
                        onValueChange={(value) => {
                          field.onChange(value[0] / 10);
                          setScore(value[0] / 10);
                        }}
                        max={100}
                        step={1}
                      >
                        <SliderPrimitive.Thumb className="block h-10 w-10 rounded-full border-2 border-primary bg-background/80 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
                      </SliderPrimitive.Root>
                      <div className="absolute px-3 rounded-2xl items-center z-0 select-none text-white/40 left-0 top-0 right-0 bottom-0 w-full h-full flex justify-between">
                        <div className="z-30 font-bold">NS</div>
                        <div>
                          <span className="mr-5 font-bold">Slide to rate</span>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((_e, index) => (
                            <span key={index} className="mr-4">
                              {">"}
                            </span>
                          ))}
                        </div>
                        <div className="z-30 font-bold">10</div>
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <>
                    <FormItem className="w-full">
                      <div className="py-4 mt-8 px-1 overflow-hidden border rounded-2xl h-[200px] border-white/20">
                        <textarea
                          {...field}
                          placeholder="Write your review about this game..."
                          className="w-full h-full text-base leading-[1.25] bg-transparent p-0 px-4 appearance-none resize-none focus:outline-none placeholder-white/20 text-neutral-100"
                        ></textarea>
                      </div>
                    </FormItem>
                    <div className="h-[3rem] flex items-center">
                      <FormMessage className="text-rose-400 mt-2" />
                    </div>
                  </>
                )}
              />
              <button
                type="submit"
                className="border mb-5 hover:bg-primary/80 rounded-2xl text-white bg-primary/50 border-primary/70 hover:border-primary w-full h-[63px] center"
              >
                Submit Feedback
              </button>
            </form>
          </Form>
        )}
      </div>
    </Modal>
  );
};

export default ProvideFeedbackModal;
