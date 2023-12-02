"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useApplyProcess } from "@/hooks/useApplyProcess";
import FinishTips from "./FinishTips";
import { Textarea } from "@/components/ui/textarea";
import { FaImages } from "react-icons/fa";
import { useCoachFinishFormImage } from "@/hooks/useCoachFinishFormImage";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AiOutlineClose } from "react-icons/ai";
import { useFullscreenModal } from "@/hooks/useFullscreenModal";
import ViewLarge from "@/components/viewLarge";
import { useSocialForm } from "@/hooks/useSocialForm";
import { useApplyFormData } from "@/hooks/useApplyFormData";
import { useSessionContext } from "@supabase/auth-helpers-react";
import uniqid from "uniqid";
import { wait } from "@/lib/wait";
import { useUser } from "@/hooks/useUser";
import { getGameMetaData } from "@/actions/getGameMetadata";
import uuid from "react-uuid";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  addInfo: z.string().optional(),
});

const FinishForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const { setApplyProcess, applyProcess } = useApplyProcess();

  const { medias, addMedia, error, removeMedia } = useCoachFinishFormImage();

  const { data } = useSocialForm();

  const { choosedGame, anotherGame, coachProfile } = useApplyFormData();

  const [loading, setLoading] = useState(false);

  const { supabaseClient } = useSessionContext();

  const { onOpen, setSrc } = useFullscreenModal();

  const { userDetails } = useUser();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (loading) return;
      setLoading(true);
      // 1. upload image
      let uploadUrlArr = [];
      let applicationId = uuid();
      if (medias.length > 0) {
        const uploadArr = medias.map((media) => {
          let uuid = uniqid();
          return supabaseClient.storage
            .from("coach-application/")
            .upload(`/${userDetails?.id}/${applicationId}/${uuid}`, media.file);
        });
        const uploadResultArr = await Promise.all(uploadArr);
        uploadUrlArr = uploadResultArr.reduce((prev: any, curr: any) => {
          if (curr.error) {
            throw error;
          }
          if (curr.data?.path && !curr.error) {
            const { data: imageURL } = supabaseClient.storage
              .from("coach-application")
              .getPublicUrl(curr.data.path);
            return [...prev, imageURL.publicUrl];
          } else {
            return prev;
          }
        }, []);
      }
      const uploadData: any = {
        id: applicationId,
        user_id: userDetails?.id,
        first_name: coachProfile.firstName,
        last_name: coachProfile.lastName,
        description: coachProfile.description,
        country: coachProfile.country,
        game_role_and_characters: anotherGame,
        coach_games: choosedGame.map((gameData) => ({
          data: getGameMetaData(gameData.data),
          ingameName: gameData.ingameName,
        })),
        coach_time: data.coachingHour,
        contact_email: data.email,
        social_links: {
          facebook: data.facebookLink,
          youtube: data.youtubeLink,
          discord: data.discordLink,
        },
        support_information: values.addInfo,
        support_images: uploadUrlArr,
      };

      const { data: supabaseData, error: uploadError } = await supabaseClient
        .from("coach_application")
        .insert(uploadData);

      if (uploadError) {
        throw uploadError;
      }

      toast.success("Application submitted successfully");
      await wait(500);
      setApplyProcess("done-submit");

      // 2. upload data
    } catch (error) {
      toast.error((error as any).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex relative justify-between gap-x-16", {
          hidden: applyProcess !== "finish",
        })}
      >
        <div className="w-[60%] pb-32">
          <div className="text-sm">Step 4 of 4</div>
          <div className="mt-5 mb-8 text-2xl font-bold super">
            Additional Verification
          </div>
          <div className="mb-3 uppercase text-sm font-semibold">
            SUPPORT & ADDITIONAL STUFF
          </div>
          <p className="text-xs leading-5 text-zinc-300">
            You been waiting for this right ? Thsi is the last step so all you
            have to do is add any and all documents that support your us to know
            your achivements and give yourself credibility.
          </p>
          <div className="space-y-7 mt-6 p-6 rounded-xl bg-home w-full border-2 border-primary">
            <FormField
              control={form.control}
              name="addInfo"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Supporting Information
                  </Label>
                  <FormControl>
                    <Textarea
                      placeholder="Start typing here..."
                      {...field}
                      className="p-4 w-full resize-none h-[200px]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <div className="space-y-2 select-none cursor-pointer">
              <input
                disabled={loading}
                onChange={(e) => {
                  const files = e.target.files;
                  if (files) {
                    for (let i = 0; i < files.length; i++) {
                      addMedia(files[i]);
                    }
                  }
                }}
                id="upload-image-coach"
                type="file"
                className="hidden"
                multiple
              ></input>
              <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Upload supporting image
              </Label>
              <div
                onClick={() => {
                  if (document.getElementById("upload-image-coach")) {
                    document.getElementById("upload-image-coach")?.click();
                  }
                }}
                className="w-full h-[200px] rounded-xl border-2 border-primary border-dashed center"
              >
                <div className="flex flex-col items-center gap-y-2">
                  <FaImages className="text-5xl text-primary" />
                  <p className="text-sm font-bold mt-2">
                    Choose your supporting image
                  </p>
                  <p className="text-sm">
                    <span className="font-bold text-sm text-primary">
                      Click
                    </span>{" "}
                    to choose an Image file (jpg, png, gif, etc)
                  </p>
                </div>
              </div>
              {medias.length > 0 && (
                <div className="pt-4 space-y-3">
                  {medias.map((media, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSrc(media.preview);
                        onOpen();
                      }}
                      className="flex gap-x-2 relative items-center p-2 rounded-lg bg-background w-full"
                    >
                      <ViewLarge
                        alt="ava"
                        src={media.preview}
                        className="w-12 h-12 rounded-lg mr-1 object-cover object-center"
                      />
                      <div className="font-bold line-clamp-1 text-sm max-w-[70%]">
                        {media.name}
                      </div>
                      <AiOutlineClose
                        onClick={(e: any) => {
                          e.stopPropagation();
                          removeMedia(index);
                        }}
                        className="text-base absolute right-3 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <FinishTips loading={loading} />
      </form>
    </Form>
  );
};

export default FinishForm;
