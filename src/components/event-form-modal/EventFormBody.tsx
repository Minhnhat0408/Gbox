"use client";

import { Button } from "../ui/button";
import { FiImage } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/hooks/useUser";
import { useEventFormBodyModal } from "@/hooks/useEventFormBody";
import PickTimeline from "./PickTimeLine";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";
import { Textarea } from "../ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useForm } from "react-hook-form";
import { BiBookAdd } from "react-icons/bi";
import EventMoreInformation from "./EventMoreInformation";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventFormValues, eventFormSchema } from "@/schema/event-form-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useEventMoreInformation } from "@/hooks/useEventMoreInformation";
import { Input } from "../ui/input";
import { toast } from "sonner";

const EventFormBody = () => {
  const { userDetails } = useUser();

  const {
    startDate,
    startTime,
    setError,
    error,
    endDate,
    endTime,
    image,
    setImage,
  } = useEventFormBodyModal();

  const { tags, people, rules } = useEventMoreInformation();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: "",
      gameName: "",
      description: "",
    },
  });

  const submitForm = (data: EventFormValues) => {
    if (!startDate && startTime) {
      return setError({
        ...error,
        startDate: "Please select event start time",
      });
    }
    if (!startTime && startDate) {
      return setError({
        ...error,
        startTime: "Please select event start time",
      });
    }
    if (!startTime && !startDate) {
      return setError({
        ...error,
        startTime: "Please select event start time",
        startDate: "Please select event start time",
      });
    }
    if (!image || !image.preview)
      return toast.error("Please select event cover photo");
    console.log({
      ...data,
      people,
      tags,
      rules,
      startDate,
      startTime,
      endDate,
      endTime,
      image: image.file,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitForm)}
        className="space-y-5 max-h-[calc(100vh-180px)] overflow-y-auto"
      >
        <div
          className="w-full h-[200px] bg-black/50 relative mb-3  bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${
              image && image.preview ? image.preview : "/images/wallpaper.jpg"
            }')`,
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
        </div>
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
          <FormField
            control={form.control}
            name="gameName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="rounded-lg flex items-center w-full bg-background px-4 py-2">
                    <IoGameControllerOutline className="mr-4 text-2xl text-gray-400" />
                    <input
                      className="focus-visible:outline-none placeholder:text-gray-400 bg-background w-full h-8 pr-4 text-base"
                      placeholder="Game name..."
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400 font-bold" />
              </FormItem>
            )}
          />
          <PickTimeline />
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

          <Accordion type="single" collapsible className="w-full">
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
          </Accordion>
        </div>
        <div className="z-10 flex px-5 justify-center items-center w-full absolute bottom-[10px] left-0 right-0">
          <Button type="submit" className="w-full">
            Create Event
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventFormBody;
