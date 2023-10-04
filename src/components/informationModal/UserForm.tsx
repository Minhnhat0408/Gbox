import useInformationModal from "@/hooks/useInformationModal";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../ui/select";
import SlideLeft from "../animations/slide-left";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldValues } from "react-hook-form";
import { userFormSchema, UserFormType } from "@/schema/user-form-schema";
import {
  useSessionContext,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type ErrorMessage = {
  message: string;
  error: boolean;
};

function UserForm() {
  const [location, setLocation] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [userNameError, setUserNameError] = useState<ErrorMessage>({
    message: "",
    error: false,
  });

  const supabaseClient = useSupabaseClient();

  const user = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormType>({ resolver: zodResolver(userFormSchema) });

  const { setFormType } = useInformationModal();

  const onSubmit = async (data: UserFormType) => {
    if (location === "") return setError(true);
    const { data: userData, error: queryError } = await supabaseClient
      .from("profiles")
      .select("*");

    if (queryError)
      return setUserNameError({
        message: queryError.message,
        error: true,
      });

    if (
      userData?.some((a) => {
        return a.name === data.userName;
      })
    ) {
      return setUserNameError({
        message: "Username already exist",
        error: true,
      });
    }

    const { data: updateData, error } = await supabaseClient
      .from("profiles")
      .insert({
        id: user?.id,
        bio: data.bio,
        name: data.userName,
        location: location,
      });

    if (error)
      return setUserNameError({
        message: error.message,
        error: true,
      });
    setFormType("information-form");
  };

  return (
    <SlideLeft>
      <DialogHeader>
        <DialogTitle className="mb-8 text-3xl capitalize">
          {"Hi gamers, Tell us more about yourself"}
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="gap-y-2 flex flex-col items-start !mb-5">
          <label className="font-bold">Username</label>
          <Input
            {...register("userName")}
            onChange={(e) => {
              setUserNameError({
                message: "",
                error: false,
              });
            }}
            className=" bg-background"
            type="text"
            placeholder="Your username"
          />
          {errors.userName && (
            <p className="mt-2 font-bold text-red-500">
              {errors.userName.message}
            </p>
          )}
          {userNameError.error && (
            <p className="mt-2 font-bold text-red-500">
              {userNameError.message}
            </p>
          )}
        </div>
        <div className="gap-y-2 flex flex-col items-start !mb-5">
          <label className="font-bold">Bio</label>
          <Input
            {...register("bio")}
            className="bg-background "
            placeholder="Please write some words about yourself (option)"
          />
          {errors.bio && (
            <p className="mt-2 font-bold text-red-500">{errors.bio.message}</p>
          )}
        </div>
        <div className="gap-y-2 flex flex-col items-start !mb-5">
          <label className="font-bold">Location</label>
          <Select
            onValueChange={(value: string) => {
              setLocation(value);
              setError(false);
            }}
          >
            <SelectTrigger className=" w-full">
              <SelectValue className="" placeholder="Where is your server" />
            </SelectTrigger>
            <SelectContent className="bg-background">
              <SelectGroup>
                <SelectItem
                  className="bg-background hover:bg-muted"
                  value="SEA (South East Asia)"
                >
                  SEA (South East Asia)
                </SelectItem>
                <SelectItem
                  className="bg-background hover:bg-muted"
                  value="VN (Vietnam)"
                >
                  VN (Vietnam)
                </SelectItem>
                <SelectItem
                  className="bg-background hover:bg-muted"
                  value="NA (North America)"
                >
                  NA (North America)
                </SelectItem>
                <SelectItem
                  className="bg-background hover:bg-muted"
                  value="EU (Europian)"
                >
                  EU (Europian)
                </SelectItem>
                <SelectItem
                  className="bg-background hover:bg-muted"
                  value="OCE (Oceania)"
                >
                  OCE (Oceania)
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {error && (
            <p className="mt-2 font-bold text-red-500">
              Please select your server location
            </p>
          )}
        </div>

        <DialogFooter className="mt-6">
          {isSubmitting ? (
            <Button
              type="button"
              disabled
              className="disabled:opacity-25 flex items-center justify-center w-[125px]"
            >
              <AiOutlineLoading3Quarters className="animate-spin mr-3" />
              <p>Loading</p>
            </Button>
          ) : (
            <Button
              type="submit"
              className="flex items-center justify-center w-[125px]"
            >
              <p>Save change</p>
              {/* 124,48 */}
            </Button>
          )}
        </DialogFooter>
      </form>
    </SlideLeft>
  );
}

export default UserForm;
