import useInformationModal from "@/hooks/useInformationModal";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../ui/select";
import SlideLeft from "../animations/slide-left";
import { months, dates, years } from "@/constants/time";
import { Avatar as AvatarUI, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Gender, userPersonalForm } from "@/hooks/usePersonalForm";
import { shallow } from "zustand/shallow";
import { User, useSessionContext } from "@supabase/auth-helpers-react";
import { ChangeEvent, useEffect, useState } from "react";
import uniqid from "uniqid";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useUser } from "@/hooks/useUser";

type PersonalFormError = {
  image?: string | undefined;
  other?: string | undefined;
};

export default function PersonalForm() {
  const [error, setError] = useState<PersonalFormError>({
    image: undefined,
    other: undefined,
  });

  const {
    avatar,
    setAvatar,
    date,
    setDate,
    month,
    setMonth,
    year,
    setYear,
    gender,
    setGender,
  } = userPersonalForm((set) => set, shallow);

  const [previewImage, setPreviewImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { setFormType } = useInformationModal();

  const { supabaseClient } = useSessionContext();

  const { user } = useUser();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    // handle image choose
    const image = e.target.files?.[0];
    if (image && image.type.includes("image")) {
      setAvatar(image);
      setPreviewImage(URL.createObjectURL(image));
      setError({
        other: error.other,
        image: undefined,
      });
    }
  };

  const removeError = () => {
    if (!!date && !!month && !!year && !!gender) {
      setError({
        image: error.image,
        other: undefined,
      });
    }
  };

  const handleClick = async () => {
    // user with no default avatar and not upload avatr
    if (
      !(user?.user_metadata.avatar_url || user?.user_metadata.picture) &&
      !avatar
    ) {
      return setError({
        other: error.other,
        image: "Please upload an avatar",
      });
    }

    // user not field in other field
    if (!date || !month || !year || !gender) {
      return setError({
        image: error.image,
        other: "Please fill in all field",
      });
    }

    setLoading(true);

    // upload image
    let avatarImage =
      user?.user_metadata.avatar_url || user?.user_metadata.picture;

    if (avatar) {
      const uuid = uniqid();
      const { data: imageData, error: uploadError } =
        await supabaseClient.storage
          .from("images")
          .upload(`profile-${user?.id}-${uuid}`, avatar, {
            cacheControl: "3600",
            upsert: false,
          });
      if (uploadError)
        setError({ image: error.image, other: uploadError.message });

      const { data: imageURL } = supabaseClient.storage
        .from("images")
        .getPublicUrl(imageData!.path);
      avatarImage = imageURL.publicUrl;
    }

    // update table
    const { data: updateData, error: updateError } = await supabaseClient
      .from("profiles")
      .update({
        avatar: avatarImage,
        gender: gender,
        dob: new Date(`${year}-${month}-${date}`),
      })
      .eq("id", user?.id);

    if (updateError)
      setError({ image: error.image, other: updateError.message });
    setLoading(false);
    setFormType("gaming-form");
  };

  useEffect(() => {
    removeError();
  }, [gender, date, month, year]);

  return (
    <SlideLeft>
      <DialogHeader>
        <DialogTitle className="mb-5 text-3xl capitalize">
          {"It's time to customize your profile !"}
        </DialogTitle>
      </DialogHeader>
      <div className="gap-y-2 flex flex-col items-start mb-5">
        <label className="font-bold">Avatar</label>
        <div className="flex w-full my-3">
          <div className="gap-x-2 flex flex-1 pl-10">
            <AvatarUI className="w-[150px] h-[150px] border-solid border-4 border-primary">
              <AvatarImage
                src={
                  previewImage ||
                  user?.user_metadata.avatar_url ||
                  user?.user_metadata.picture ||
                  "/avatar.jpg"
                }
              />
              <AvatarFallback>A</AvatarFallback>
            </AvatarUI>
          </div>
          <div className="justify-evenly flex flex-col flex-1 w-full">
            <p className="text-left">
              {"You can use your default avatar or upload  <= 5M image"}
            </p>
            <input
              className="hidden"
              id="upload-image"
              type="file"
              accept="image/*"
              onChange={onChange}
            ></input>
            <Button
              type="button"
              className="self-end flex justify-center items-center w-1/2 mt-4 text-white bg-[#11998e]/80 hover:bg-[#11998e]/100"
            >
              <label
                htmlFor="upload-image"
                className="w-[146.5px] min-w[146.5px] flex justify-center items-center px-12 h-[40px] flex-1"
              >
                <span>Upload</span>
              </label>
            </Button>
            {error.image && (
              <p className="self-end mt-3 font-bold text-red-400">
                {error.image}
              </p>
            )}
          </div>
        </div>
      </div>
      <Separator className="bg-primary mb-5" />
      <div className="gap-y-2 flex flex-col items-start mb-2">
        <label className="font-bold">Gender</label>
        <Select
          onValueChange={(value: Gender) => {
            setGender(value);
          }}
        >
          <SelectTrigger className=" w-full">
            <SelectValue className="" placeholder="Please select your gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem className="bg-background hover:bg-muted" value="male">
                Male
              </SelectItem>
              <SelectItem
                className="bg-background hover:bg-muted"
                value="female"
              >
                Female
              </SelectItem>
              <SelectItem
                className="bg-background hover:bg-muted"
                value="other"
              >
                Other
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="gap-y-2 flex flex-col items-start my-4">
        <label className="font-bold">Date of birth</label>
        <div className="gap-x-3 flex justify-between w-full">
          <Select
            onValueChange={(value: string) => {
              setDate(value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue className="" placeholder="Date" />
            </SelectTrigger>
            <SelectContent
              side="bottom"
              className="max-h-[230px] overflow-y-hidden bg-background"
            >
              <SelectGroup>
                {dates.map((item) => (
                  <SelectItem
                    className="bg-background hover:bg-muted"
                    value={item + ""}
                    key={item}
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value: string) => {
              setMonth(value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue className="" placeholder="Month" />
            </SelectTrigger>
            <SelectContent
              side="bottom"
              className="max-h-[230px] overflow-y-hidden bg-background"
            >
              <SelectGroup>
                {months.map((item) => (
                  <SelectItem
                    className="bg-background hover:bg-muted"
                    value={item + ""}
                    key={item}
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value: string) => {
              setYear(value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue className="" placeholder="Year" />
            </SelectTrigger>
            <SelectContent
              side="bottom"
              className="max-h-[230px] overflow-y-hidden bg-background"
            >
              <SelectGroup>
                {years.map((item) => (
                  <SelectItem
                    className="bg-background hover:bg-muted"
                    value={item + ""}
                    key={item}
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {error.other && (
        <p className="mt-2 font-bold text-red-500">{error.other}</p>
      )}
      <DialogFooter className="mt-6">
        {loading ? (
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
            onClick={handleClick}
            className="flex items-center justify-center w-[125px]"
          >
            <p>Save change</p>
            {/* 124,48 */}
          </Button>
        )}
      </DialogFooter>
    </SlideLeft>
  );
}
