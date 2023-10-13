/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { ImImages } from "react-icons/im";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { postFormSchema } from "@/schema/post-form-schema";
import { ChangeEvent, useEffect } from "react";
import { useFormMedia } from "@/hooks/useFormImage";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { toast } from "sonner";
import { usePostFormModal } from "@/hooks/usePostFormModal";
import { useSearchGameForm } from "@/hooks/useSearchGameForm";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { getGameMetaData } from "@/actions/getGameMetadata";
import uuid from "react-uuid";
import { GameData } from "@/types/ign/GameSearchType";

type PostFormProps = z.infer<typeof postFormSchema>;

type MediaPost = {
  url: string;
};

function PostFormBody() {
  const form = useForm<PostFormProps>({
    mode: "onChange",
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const {
    medias,
    addMedia,
    removeMedia,
    error,
    reset,
    uuid: errorUUID,
  } = useFormMedia();

  const {
    progress,
    onClose,
    reset: resetPostForm,
    isOpen,
    isPosting,
    setIsPosting,
  } = usePostFormModal();

  const { currentGame } = useSearchGameForm();

  const { supabaseClient } = useSessionContext();

  const { user, userDetails } = useUser();

  const onSubmit = async (data: PostFormProps) => {
    // if choose just 1 of 2 progress, show error
    if (progress && !currentGame) {
      return toast.error("Please select a game", {
        duration: 1600,
      });
    }
    if (currentGame && !progress) {
      return toast.error("Please select game progress", {
        duration: 1600,
      });
    }

    setIsPosting(true);
    const postID = uuid();

    let uploadUrlArr = {
      url: [],
      type: "",
    };

    // upload image and video
    if (medias.length > 0) {
      const fileType = medias[0].type;

      const uploadArr = medias.map((media) => {
        const uuid = uniqid();
        return supabaseClient.storage
          .from("posts")
          .upload(
            `${userDetails?.name || user?.id}/${postID}/${uuid}`,
            media.file
          );
      });
      const uploadResultArr = await Promise.all(uploadArr);
      uploadUrlArr = uploadResultArr.reduce(
        (prev: any, curr: any) => {
          if (curr.error) {
            setIsPosting(false);
            return toast.error(curr.error.message, {
              duration: 1600,
            });
          }
          if (curr.data?.path && !curr.error) {
            const { data: imageURL } = supabaseClient.storage
              .from("posts")
              .getPublicUrl(curr.data.path);
            return {
              url: [...prev.url, imageURL.publicUrl],
              type: prev.type, // Preserve the fileType from the previous value
            };
          } else {
            return prev;
          }
        },
        {
          url: [],
          type: fileType,
        }
      );
    }

    // upload post promise
    const upsertArr = [
      supabaseClient.from("posts").insert({
        id: postID,
        user_id: user?.id,
        user_meta_data: userDetails,
        game_name:
          currentGame?.metadata.names.name ||
          currentGame?.metadata.names.short ||
          null,
        game_progress: progress || null,
        game_meta_data: currentGame
          ? getGameMetaData(currentGame as GameData)
          : null,
        title: data.title,
        content: data.content,
        media: uploadUrlArr.url.length > 0 ? uploadUrlArr : null,
      }),
    ];

    // update game promise
    if (currentGame && progress) {
      const updateData: {
        [key: string]: any;
      } = {
        id: user?.id + "$" + currentGame.slug,
        user_id: user?.id,
        status: progress,
        game_meta_data: getGameMetaData(currentGame),
      };
      if (progress === "beat")
        updateData.finish_date = new Date().toISOString();
      upsertArr.push(supabaseClient.from("user_game_data").upsert(updateData));
    }

    // handle 2 promsie and upload to supabase
    const [postResult, gameResult] = await Promise.all(upsertArr);

    // handle error
    if (postResult.error) {
      setIsPosting(false);
      return toast.error(postResult.error.message, {
        duration: 1600,
      });
    }
    if (gameResult?.error) {
      setIsPosting(false);
      return toast.error(gameResult.error.message, {
        duration: 1600,
      });
    }

    // post successful
    toast.success("Post created successfully", {
      duration: 1600,
    });
    reset();
    resetPostForm();
    setIsPosting(false);
    onClose();
  };

  const handleChooseMedia = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        addMedia(files[i]);
      }
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 1000,
      });
    }
  }, [error, errorUUID]);

  useEffect(() => {
    if (!isOpen) {
      form.reset();
      reset();
    }
  }, [isOpen]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 space-y-6">
        <div className="w-full gap-4">
          <div className="grid grid-cols-5 gap-6">
            <div className="col-span-2 space-y-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className=" !bg-black/40 w-full h-[60px] text-lg font-semibold rounded-xl"
                        type="text"
                        placeholder="Write your post title here..."
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        onPaste={(e) => {
                          const file = e.clipboardData.files[0];
                          if (
                            file &&
                            file.type &&
                            file.type.includes("image")
                          ) {
                            addMedia(file);
                          }
                        }}
                        placeholder="Write your review or post content..."
                        className="rounded-xl !bg-black/40 resize-none h-[210px] py-3 appearance-none focus:outline-none leading-[1.25]placeholder-white/20 text-neutral-100"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>
            <div
              className={cn(
                "col-span-3",
                "!bg-black/40 border-solid group/container overflow-hidden border-[rgb(0,240,255)] border-[2px] relative  rounded-xl h-full flex justify-center items-center"
              )}
            >
              <Input
                onChange={handleChooseMedia}
                type="file"
                accept="image/*,video/*"
                multiple
                id="media"
                className="hidden"
              />
              {medias.length === 0 ? (
                <label
                  htmlFor="media"
                  className="gap-y-4 flex flex-col items-center justify-center"
                >
                  <ImImages size="50" />
                  <p className="text-lg font-medium">Upload image or video</p>
                </label>
              ) : (
                <>
                  <label
                    htmlFor="media"
                    className="text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 top-4 hidden hover:bg-black/60 group-hover/container:flex left-4 rounded-xl text-white bg-black/40 z-[100] absolute items-center justify-between"
                  >
                    <BiImageAdd className="mr-2 text-xl" />
                    <span>Add media</span>
                  </label>
                  <div className=" custom-scroll-bar-3 flex w-full h-full overflow-x-auto">
                    {medias.map((media, index) => {
                      return (
                        <div
                          key={index}
                          className="relative hover:opacity-95 flex items-center justify-center min-w-[482px] h-full p-2 group/image"
                        >
                          <div className=" top-4 right-3 bg-black/50 absolute z-40 flex items-center justify-center p-2 rounded-full">
                            <AiOutlineClose
                              className="opacity-70 hover:opacity-100 z-40 text-base text-white cursor-pointer"
                              onClick={() => {
                                removeMedia(index);
                              }}
                            />
                          </div>
                          {media.type === "image" ? (
                            <div
                              className="rounded-xl w-full h-full bg-center bg-cover"
                              style={{
                                backgroundImage: `url(${media.preview})`,
                              }}
                            ></div>
                          ) : (
                            <video
                              src={media.preview}
                              className="z-10 object-cover w-full h-full"
                              controls
                            ></video>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <Button
          type="submit"
          disabled={isPosting}
          className="rounded-3xl w-full h-14 flex items-center justify-center bg-[rgb(0,240,255)] !mt-8 hover:bg-[rgb(0,240,255)]/80"
        >
          {isPosting ? (
            <>
              <span>Posting...</span>
              <span className="ml-3">
                <AiOutlineLoading3Quarters className="animate-spin text-xl" />
              </span>
            </>
          ) : (
            "Post Review"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default PostFormBody;
