"use client";

import {
  CreateRoomValues,
  createRoomSchema,
} from "@/schema/crreate-room-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { useUser } from "@/hooks/useUser";
import { EventGameInput } from "../event-form-modal/EventGameInput";
import { Textarea } from "../ui/textarea";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { Button } from "../ui/button";
import CreateRoomGameInput from "./search-game";
export default function CreateRoomBody() {
  const { userDetails } = useUser();
  const form = useForm<CreateRoomValues>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const submitForm = async (data: CreateRoomValues) => {};
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitForm)}
        className="space-y-5 max-h-[calc(100vh-180px)] mt-4 overflow-y-auto"
      >
        {/* <div
          className="w-full h-[200px] bg-black/50 relative mb-3  bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('}')`,
          }}
        >
          <label
            htmlFor="eventImage"
            className="absolute bottom-5 right-5 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 hover:bg-gray-600/70 text-white z-0 bg-gray-600"
          >
            <FiImage className="w-4 h-4 mr-2" />
            Add Cover Photo
          </label>
          <Input
            onChange={(e) => {
              setImage(e.target.files![0]);
            }}
            type="file"
            accept="image/*"
            id="eventImage"
            className="hidden"
          />
        </div> */}
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
                    <MdOutlineEmojiEvents className="mr-4 text-2xl text-gray-400" />
                    <input
                      className="focus-visible:outline-none font-bold placeholder:text-gray-400 bg-background w-full h-8 pr-4 text-base"
                      placeholder="Event name..."
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400 font-bold" />
              </FormItem>
            )}
          />
          <CreateRoomGameInput />
          <div className="flex">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Event description..."
                      {...field}
                      className="rounded-lg !bg-background resize-none h-[210px] py-4 px-5 appearance-none focus:outline-none leading-[1.25] placeholder-white/20 text-neutral-100"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 font-bold" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Event description..."
                      {...field}
                      className="rounded-lg !bg-background resize-none h-[210px] py-4 px-5 appearance-none focus:outline-none leading-[1.25] placeholder-white/20 text-neutral-100"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 font-bold" />
                </FormItem>
              )}
            />
          </div>

          {/* <Accordion type="single" collapsible className="w-full">
            <AccordionItem className="border-0" value="item-1">
              <AccordionTrigger className="flex w-full rounded-lg py-7 h-10 px-3 bg-black/20 hover:bg-black/40 transition">
                <div className="flex">
                  <BiBookAdd className="mr-2 text-2xl text-gray-400" />
                  <span className="text-base">Add more event information</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <EventMoreInformation />
              </AccordionContent>
            </AccordionItem>
          </Accordion> */}
        </div>
        <div className="flex px-5 justify-center items-center w-full ">
          <Button
            // type={isPosting ? "button" : "submit"}
            // disabled={isPosting}
            className="w-full relative"
          >
            Create Event
            {/* {isPosting && (
              <ImSpinner2 className="animate-spin text-2xl absolute right-3" />
            )} */}
          </Button>
        </div>
      </form>
    </Form>
  );
}
