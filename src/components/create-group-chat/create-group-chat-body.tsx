"use client";
import { FaXmark } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import uniqid from "uniqid";

import * as z from "zod";
import { createGroupChatSchema } from "@/schema/create-group-chat-schema";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { User } from "lucide-react";
import AddFriendInput from "./add-friend-input";
import { useCreateGroupChatModal } from "@/hooks/useCreateGroupChatModal";
import Image from "next/image";
import { useInviteFriendGroupChatModal } from "@/hooks/useInviteFriendGroupChatModal";
import { toast } from "sonner";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import useGroupChatBox from "@/hooks/useGroupChatBox";
import useGroupChat from "@/hooks/useGroupChat";
import useFriendMessages from "@/hooks/useFriendMessages";
export type CreateGroupChatValues = z.infer<typeof createGroupChatSchema>;
export default function CreateGroupChatBody() {
  const form = useForm<CreateGroupChatValues>({
    resolver: zodResolver(createGroupChatSchema),
  });

  const {
    addMedia,
    removeMedia,
    media,
    reset: resetForm,
  } = useCreateGroupChatModal();
  const { setCurrentGroup,} = useGroupChatBox()
  const {onOpen:openGroupChat} = useGroupChat()
  const {onClose} = useFriendMessages()
  const [isLoading, setIsLoading] = useState(false);
  const { userDetails } = useUser();
  const { peopleList, reset: resetInviteFriend } =
    useInviteFriendGroupChatModal();
  const [peopleListError, setPeopleListError] = useState(false);
  const { supabaseClient } = useSessionContext();
  const [grImageError, setGrImageError] = useState(false);

  const submitForm = async (values: CreateGroupChatValues) => {
    setIsLoading(true);
    const listCheckedPeople = peopleList.filter((item) => item.selected);
    if (listCheckedPeople.length <= 1 || !media) {
      if (listCheckedPeople.length <= 1) {
        setPeopleListError(true);
        toast.error("Please add more than 1 people to group");
      }
      if (!media) {
        setGrImageError(true);
        toast.error("Please add group image");
      }

      setIsLoading(false);
      return;
    }

    const groupId = uniqid();
    let groupAvaURL = "";
    if (media) {
      const imgId = uniqid();

      const { data, error } = await supabaseClient.storage
        .from("group_chat")
        .upload(`${userDetails?.name}/${groupId}/${imgId}`, media.file);

      if (error) {
        toast.error(error.message, {
          duration: 3000,
        });
        return;
      }
      const { data: imageURL } = supabaseClient.storage
        .from("group_chat")
        .getPublicUrl(data.path);
      groupAvaURL = imageURL.publicUrl;
    }

    const { data } = await supabaseClient
      .from("group_chat")
      .insert({
        name: values.name,
        image: groupAvaURL,
        creator: userDetails?.id,
        created_at: new Date(),
      })
      .select("*")
      .single();

    const { error } = await supabaseClient.from("group_users").insert([
      {
        user_id: userDetails?.id,
        role: "creator",
        group_id: data.id,
      },
      ...listCheckedPeople.map((item) => ({
        user_id: item.data.id,
        group_id: data.id,
        role: "member",
      })),
    ]);
    //add bot emssage to group
    let date = new Date()
    await supabaseClient.from("messages").insert([
      {
        content: `${userDetails?.name} have created the group`,
        created_at: data.created_at,
        group_id: data.id,
      },
      ...listCheckedPeople.map((item,ind) =>{
        let newDate = date
        newDate.setTime(date.getTime() + (ind+1)*500)
        return {
          content: `${item.data.name} have joined the group`,
          created_at: newDate,
          group_id: data.id,
        }
      } ),
    ]);

    if (!error) {
      toast.success("Create group success");
    } else {
      toast.error(error.message);
    }
    onClose()
    setCurrentGroup(data)
    openGroupChat()
    resetInviteFriend();
    resetForm();

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitForm)}
        className="space-y-10  max-h-[calc(100vh-180px)] mt-4 overflow-y-auto"
      >
        <div className=" flex px-5 w-full">
          <div className="flex w-2/5 justify-center ">
            <input
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  addMedia(files[0]);
                }
              }}
              type="file"
              name="gr-image"
              id="gr-image"
              className="hidden"
            />
            <label htmlFor="gr-image" className="cursor-pointer">
              <div
                className={cn(
                  "flex items-center justify-center w-32 h-32 relative rounded-full bg-background border-2 border-primary",
                  grImageError && "border-red-400"
                )}
              >
                {media?.preview && (
                  <div className="absolute rounded-full top-0 right-2 p-1 bg-red-400">
                    <FaXmark
                      className="text-white text-xl cursor-pointer"
                      onClick={() => removeMedia()}
                    />
                  </div>
                )}
                {media?.preview ? (
                  <Image
                    src={media.preview}
                    alt=""
                    width={0}
                    height={0}
                    sizes="0"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <User
                    className={cn(
                      "w-10 h-10 text-gray-400",
                      grImageError && "text-red-400"
                    )}
                  />
                )}
              </div>
            </label>
          </div>
          <div className="w-4/5 flex flex-col gap-y-6 justify-center">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="rounded-lg flex-1 flex items-center w-full bg-background px-4 py-2">
                      <MdOutlineEmojiEvents
                        className={cn(
                          "mr-4 text-2xl text-gray-400",
                          field.value && "text-white"
                        )}
                      />
                      <input
                        className="focus-visible:outline-none font-bold placeholder:text-gray-400 bg-background w-full h-8 pr-4 text-base"
                        placeholder="Enter group name"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 font-bold" />
                </FormItem>
              )}
            />
            <AddFriendInput err={peopleListError} />
          </div>
        </div>
        <div className="flex px-5 mt-5 justify-center items-center w-full ">
          <Button
            type={isLoading ? "button" : "submit"}
            disabled={isLoading}
            className="w-full relative"
          >
            Create Group
            {isLoading && (
              <ImSpinner2 className="animate-spin text-2xl absolute right-3" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
