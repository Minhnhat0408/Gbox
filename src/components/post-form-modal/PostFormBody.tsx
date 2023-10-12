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
import { ChangeEvent } from "react";
import { useFormMedia } from "@/hooks/useFormImage";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";

type PostFormProps = z.infer<typeof postFormSchema>;

function PostFormBody() {
  const form = useForm<PostFormProps>({
    mode: "onChange",
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const { medias, addMedia, removeMedia, error } = useFormMedia();

  const onSubmit = async (data: PostFormProps) => {
    console.log(data);
  };

  const handleChooseMedia = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        addMedia(files[i]);
      }
    }
  };

  console.log(error);

  console.table(medias);

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
                    <FormMessage />
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
                        placeholder="Write your review or post content..."
                        className="rounded-xl !bg-black/40 resize-none h-[210px] py-3 appearance-none focus:outline-none leading-[1.25]placeholder-white/20 text-neutral-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div
              className={cn(
                "col-span-3",
                "!bg-black/40 border-solid border-[rgb(0,240,255)] border-[2px]  rounded-xl h-full flex justify-center items-center"
              )}
            >
              {medias.length === 0 ? (
                <>
                  <label
                    htmlFor="media"
                    className="gap-y-4 flex flex-col items-center justify-center"
                  >
                    <ImImages size="50" />
                    <p className="text-lg font-medium">Upload image or video</p>
                  </label>
                  <Input
                    onChange={handleChooseMedia}
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    id="media"
                    className="hidden"
                  />
                </>
              ) : (
                <div className="flex w-full h-full overflow-x-auto">
                  {medias.map((media, index) => {
                    return (
                      <div
                        key={index}
                        className="relative flex items-center justify-center w-full h-full p-2"
                      >
                        <div className=" top-3 right-3 bg-black/50 absolute z-40 flex items-center justify-center p-2 rounded-full">
                          <AiOutlineClose
                            className="z-40 text-base text-white cursor-pointer"
                            onClick={() => {
                              removeMedia(index);
                            }}
                          />
                        </div>
                        {media.type === "image" ? (
                          <div
                            className="w-full h-full bg-center bg-cover"
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
              )}
            </div>
          </div>
        </div>
        <Button
          type="submit"
          className="rounded-3xl w-full h-14 bg-[rgb(0,240,255)] !mt-8 hover:bg-[rgb(0,240,255)]/80"
        >
          Post Review
        </Button>
      </form>
    </Form>
  );
}

export default PostFormBody;
