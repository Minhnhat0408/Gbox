"use client";

import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { RiMoneyPoundCircleFill } from "react-icons/ri";
import Modal from "@/components/modals/Modal";
import { Separator } from "@/components/ui/separator";
import { useCoachProfile } from "@/hooks/useCoachDetail";
import { useCreateCoachSessionModal } from "@/hooks/useCreateCoachSessionModal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUser";
import { Label } from "@/components/ui/label";
import { MdAlternateEmail } from "react-icons/md";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { ChooseGameInput } from "./ChooseGameInput";
import { Button } from "@/components/ui/button";
import { PiTextAaFill } from "react-icons/pi";
import { useChooseGameForSession } from "@/hooks/useChooseGameForSession";
import { toast } from "sonner";
import { useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import uuid from "react-uuid";
import { getGameMetaData } from "@/actions/getGameMetadata";
import { wait } from "@/lib/wait";
import LoadingAnimation from "@/components/loading-components/LoadingAnimation";

const availableDuration = {
  "30 min": "30 min",
  "1 hour": "1 hour",
  "1 hour 30 min": "1 hour 30 min",
  "2 hours": "2 hours",
  "2 hours 30 min": "2 hours 30 min",
  "3 hours": "3 hours",
  "3 hours 30 min": "3 hours 30 min",
  "4 hours": "4 hours",
  "4 hours 30 min": "4 hours 30 min",
  "5 hours": "5 hours",
};

const formSchema = z.object({
  name: z
    .string({
      required_error: "Session name is required",
    })
    .min(5, {
      message: "Session name must be at least 5 characters",
    })
    .max(100, {
      message: "Session name must be less than 100 characters",
    }),
  description: z
    .string({
      required_error: "Session description is required",
    })
    .min(5, {
      message: "Session description must be at least 5 characters",
    })
    .max(2000, {
      message: "Session description must be less than 2000 characters",
    }),
  price: z.coerce.number({
    required_error: "Price is required",
    invalid_type_error: "Price must be a number",
  }),
  duration: z.nativeEnum(availableDuration, {
    required_error: "Please select one option",
  }),
});

const CreateCoachSessionModal = () => {
  const {
    isOpen,
    onClose,
    onOpen,
    setError,
    error,
    reset: resetModal,
  } = useCreateCoachSessionModal();

  const { data } = useCoachProfile();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: undefined,
      duration: undefined,
    },
  });

  const { currentGame, reset } = useChooseGameForSession();

  const { userDetails } = useUser();

  const [loading, setLoading] = useState(false);

  const { supabaseClient } = useSessionContext();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!currentGame) {
      return setError("Please select game you wanna coach");
    }
    try {
      setLoading(true);

      const { data: submittedData, error: submittedError } =
        await supabaseClient.from("session_application").insert({
          id: uuid(),
          coach_id: data.id,
          coach_profile_id: data.profiles.id,
          name: values.name,
          description: values.description,
          price: values.price,
          duration: values.duration,
          created_at: new Date(),
          game_meta_data: getGameMetaData(currentGame),
        });

      if (submittedError) {
        throw submittedError;
      }

      setLoading(false);
      toast.success("Session created successfully, please wait for approval");
      reset();
      resetModal();
      form.reset();
      onClose();
    } catch (error: any) {
      console.log(error.message);
      setLoading(false);
      toast.error("Something went wrong, please try again");
    }
  }

  if (!data) {
    return null;
  }

  const onChange = (open: boolean) => {
    if (!open) {
      form.reset();
      reset();
      resetModal();
      onClose();
    }
  };

  // 1. session name
  // 2. session description
  // 3. session price
  // 5. session game name
  // 6. session duration

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[800px] remove-button flex flex-col items-center bg-layout !pt-0 !pb-0 !px-0 !rounded-3xl gap-0"
    >
      <div className="w-full h-full pt-7 pb-7 !px-8 flex flex-col items-center relative !rounded-3xl">
        {loading && (
          <div className="absolute bg-black/40 rounded-3xl z-50 center top-0 right-0 left-0 bottom-0">
            <LoadingAnimation
              className="w-16 h-16 text-primary"
              fill="#00F0FF"
            />
          </div>
        )}
        <h1 className="text-center super font-bold  text-3xl">
          Create Coaching Session
        </h1>
        <Separator className="my-6 bg-black/20 w-full" />

        <Form {...form}>
          <form
            className="flex flex-col gap-y-5 w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex items-center">
              <Avatar className="w-[50px] h-[50px] border-solid border-2 border-primary">
                <AvatarImage
                  className="object-cover object-center w-auto h-full"
                  src={userDetails?.avatar || "/avatar.jpg"}
                />
                <AvatarFallback>{"A"}</AvatarFallback>
              </Avatar>
              <div>
                <div className="super ml-2 text-xl font-bold">
                  {data.full_name}
                </div>
                <div className="ml-2 text-sm text-gray-300 italic">
                  @{userDetails?.name}
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Label className="font-bold text-lg">Session Name</Label>
                  <FormControl>
                    <div className="w-full relative">
                      <MdAlternateEmail className="text-2xl absolute top-3 left-3 text-white" />
                      <Input
                        disabled={loading}
                        placeholder="Enter your session name..."
                        className="h-12 pl-12"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Label className="font-bold text-lg">
                    Session Description
                  </Label>
                  <FormControl>
                    <div className="w-full relative">
                      <PiTextAaFill className="text-2xl absolute top-3 left-3 text-white" />
                      <Input
                        disabled={loading}
                        placeholder="Enter your session description..."
                        className="h-12 pl-12"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-y-3">
              <Label className="font-bold text-lg">Coaching Game</Label>
              <ChooseGameInput />
              {error && (
                <p className="text-sm font-medium text-red-400">{error}</p>
              )}
            </div>
            <div className="flex gap-x-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Label className="font-bold text-lg">Price</Label>
                    <FormControl>
                      <div className="w-full relative">
                        <RiMoneyPoundCircleFill className="text-2xl absolute top-3 left-3 text-white" />
                        <Input
                          disabled={loading}
                          placeholder="Enter your session price, Exp: 20, 20.5, ..."
                          className="h-12 pl-12"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Label className="font-bold text-lg">Durations</Label>
                    <Select
                      disabled={loading}
                      {...field}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 relative pl-12">
                          <MdOutlineAccessTimeFilled className="text-2xl absolute top-3 left-3  text-white" />
                          <SelectValue placeholder="Select how long session will last..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(availableDuration).map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={loading} className="w-full mt-4" size={"lg"}>
              Submit Session
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateCoachSessionModal;
