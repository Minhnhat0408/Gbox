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
import { month, date, year } from "@/constants/time";
import { Avatar as AvatarUI, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

export default function PersonalForm() {
  const { setFormType } = useInformationModal();

  return (
    <SlideLeft>
      <DialogHeader>
        <DialogTitle className="capitalize mb-5 text-3xl">
          {"It's time to customize your profile !"}
        </DialogTitle>
      </DialogHeader>
      <div className="gap-y-2 flex flex-col items-start mb-5">
        <label className="font-bold">Avatar</label>
        <div className="flex w-full my-3">
          <div className="gap-x-2 flex flex-1 pl-10">
            <AvatarUI className="w-[150px] h-[150px] border-solid border-4 border-primary">
              <AvatarImage src={"/avatar.jpg"} />
              <AvatarFallback>A</AvatarFallback>
            </AvatarUI>
          </div>
          <div className="justify-evenly flex flex-col flex-1 w-full">
            <p className="text-left">
              Your avatar must be .JPG, .JPEG or .PNG and cannot exceed 5M.
            </p>
            <Button className="self-end w-1/2 mt-4 text-white bg-[#11998e]/80 hover:bg-[#11998e]/100">
              Upload
            </Button>
          </div>
        </div>
      </div>
      <Separator className="bg-primary mb-5" />
      <div className="gap-y-2 flex flex-col items-start mb-2">
        <label className="font-bold">Gender</label>
        <Select>
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
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue className="" placeholder="Date" />
            </SelectTrigger>
            <SelectContent
              side="bottom"
              className="max-h-[230px] overflow-y-hidden bg-background"
            >
              <SelectGroup>
                {date.map((item) => (
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
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue className="" placeholder="Month" />
            </SelectTrigger>
            <SelectContent
              side="bottom"
              className="max-h-[230px] overflow-y-hidden bg-background"
            >
              <SelectGroup>
                {month.map((item) => (
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
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue className="" placeholder="Year" />
            </SelectTrigger>
            <SelectContent
              side="bottom"
              className="max-h-[230px] overflow-y-hidden bg-background"
            >
              <SelectGroup>
                {year.map((item) => (
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
      <DialogFooter className="mt-6">
        <Button
          type="submit"
          onClick={() => {
            setFormType("gaming-form");
          }}
        >
          Save change
        </Button>
      </DialogFooter>
    </SlideLeft>
  );
}
