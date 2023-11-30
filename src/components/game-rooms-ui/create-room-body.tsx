"use client";

import { createRoomSchema } from "@/schema/create-room-schema";
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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useUser } from "@/hooks/useUser";
import { MdGroups2, MdOutlineEmojiEvents } from "react-icons/md";
import { Button } from "../ui/button";
import CreateRoomGameInput from "./search-game";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
  TooltipContent,
} from "../ui/tooltip";
import * as z from "zod";
import { useRoomSearchGame } from "@/hooks/useRoomSearchGame";
import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { ImSpinner2 } from "react-icons/im";
import { getGameMetaData } from "@/actions/getGameMetadata";
import { toast } from "sonner";
import { useMatchingRoom } from "@/hooks/useMatchingRoom";
import { useCreateRoomModal } from "@/hooks/useCreateRoomModal";
export type CreateRoomValues = z.infer<typeof createRoomSchema>;
export default function CreateRoomBody() {
  const { userDetails } = useUser();
  const { setErr, currentGame } = useRoomSearchGame();
  const { supabaseClient } = useSessionContext();
  const [isLoading, setIsLoading] = useState(false);
  const { setRoomId, onOpen } = useMatchingRoom((set) => set);
  const { onClose } = useCreateRoomModal((set) => set);
  const form = useForm<CreateRoomValues>({
    resolver: zodResolver(createRoomSchema),
  });
  const submitForm = async (values: CreateRoomValues) => {
    setIsLoading(true);

    if (!currentGame) {
      setErr(true);
    } else {
      const { data, error } = await supabaseClient
        .from("rooms")
        .insert({
          name: values?.name ? values.name : userDetails?.name + "'s room",
          game_name: currentGame ? getGameMetaData(currentGame).name : null,
          game_meta_data: currentGame ? getGameMetaData(currentGame) : null,
          current_people: values.currentPeople,
          total_people: values.totalPeople,
          state: "idle",
          host_id: userDetails?.id,
        })
        .select()
        .single();
      if (error) {
        toast.error(error.message);
      }

      await supabaseClient.from("room_users").insert({
        room_id: data.id,
        user_id: userDetails?.id,
        is_host: true,
      });
      setRoomId(data.id);
      onClose();
      onOpen();
    }
    //delete old room if user has one
    await supabaseClient
      .from("rooms")
      .delete()
      .eq("host_id", userDetails?.id)
      .eq("state", "closed");
    
    
    setIsLoading(false);
  };
  useEffect(() => {
    setErr(false);
  }, []);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitForm)}
        className="space-y-5 max-h-[calc(100vh-180px)] mt-4 overflow-y-auto"
      >
        <div className="space-y-5 px-5">
          <div className="flex items-center">
            <Avatar className="w-[50px] h-[50px] border-solid border-2 border-primary">
              <AvatarImage
                className="object-cover object-center w-auto h-full"
                src={userDetails?.avatar || "/avatar.jpg"}
              />
              <AvatarFallback>{userDetails?.name || "X"}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-emerald-400 ml-2 font-bold">
                {userDetails?.name}
              </div>
              <div className="ml-2 text-sm text-gray-300">is hosted</div>
            </div>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="rounded-lg flex items-center w-full bg-background px-4 py-2">
                    <MdOutlineEmojiEvents
                      className={cn(
                        "mr-4 text-2xl text-gray-400",
                        field.value && "text-white"
                      )}
                    />
                    <input
                      className="focus-visible:outline-none font-bold placeholder:text-gray-400 bg-background w-full h-8 pr-4 text-base"
                      placeholder="Enter room name"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400 font-bold" />
              </FormItem>
            )}
          />
          <CreateRoomGameInput />
          <div className="flex gap-x-10">
            <FormField
              control={form.control}
              name="currentPeople"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="rounded-lg flex w-[282px] items-center bg-background px-4 py-2">
                            <MdGroups2
                              className={cn(
                                "mr-4 text-2xl text-gray-400",
                                field.value && "text-white"
                              )}
                            />
                            <input
                              className="focus-visible:outline-none font-bold placeholder:text-gray-400 bg-background w-full h-8 pr-4 text-base"
                              placeholder="Type in current players"
                              {...field}
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="left" className=" p-4 w-[200px]">
                          The current number of player you already
                          have(don&apos;t have to be in this room)
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage className="text-red-400 font-bold" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalPeople"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SelectTrigger
                              className={cn(
                                " w-[282px] h-12 focus:ring-0 text-base focus:ring-offset-0 ring-offset-0 text-gray-400 font-bold",
                                field.value && "text-white"
                              )}
                            >
                              <SelectValue placeholder="Select Total Players" />
                            </SelectTrigger>
                          </TooltipTrigger>
                          <TooltipContent
                            side="right"
                            className=" p-4 w-[200px]"
                          >
                            The total of player this room required (usually base
                            on the game)
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormControl>
                    <SelectContent className="max-h-[230px] overflow-y-hidden bg-background">
                      <SelectItem
                        className="bg-background  hover:bg-muted transition"
                        value={"1"}
                      >
                        1
                      </SelectItem>
                      <SelectItem
                        className="bg-background  hover:bg-muted transition"
                        value={"2"}
                      >
                        2
                      </SelectItem>
                      <SelectItem
                        className="bg-background  hover:bg-muted transition"
                        value={"3"}
                      >
                        3
                      </SelectItem>
                      <SelectItem
                        className="bg-background  hover:bg-muted transition"
                        value={"5"}
                      >
                        5
                      </SelectItem>
                      <SelectItem
                        className="bg-background  hover:bg-muted transition"
                        value={"6"}
                      >
                        6
                      </SelectItem>
                      <SelectItem
                        className="bg-background  hover:bg-muted transition"
                        value={"8"}
                      >
                        8
                      </SelectItem>
                      <SelectItem
                        className="bg-background  hover:bg-muted transition"
                        value={"10"}
                      >
                        10
                      </SelectItem>
                      <SelectItem
                        className="bg-background  hover:bg-muted transition"
                        value={"12"}
                      >
                        12
                      </SelectItem>
                      <SelectItem
                        className="bg-background  hover:bg-muted transition"
                        value={"15"}
                      >
                        15
                      </SelectItem>
                      <SelectItem
                        className="bg-background  hover:bg-muted transition"
                        value={"20"}
                      >
                        20
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage className="text-red-400 font-bold" />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex px-5 justify-center items-center w-full ">
          <Button
            type={isLoading ? "button" : "submit"}
            disabled={isLoading}
            className="w-full relative"
          >
            Create Room
            {isLoading && (
              <ImSpinner2 className="animate-spin text-2xl absolute right-3" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
