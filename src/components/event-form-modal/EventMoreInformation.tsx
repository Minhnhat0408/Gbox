import { AiOutlineTags } from "react-icons/ai";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { BsShieldLock } from "react-icons/bs";

const EventMoreInformation = () => {
  return (
    <div className="w-full flex flex-col gap-y-5">
      <div className="w-full flex gap-x-4">
        <div className="rounded-lg flex items-center !w-[440px] bg-background px-4 py-2">
          <AiOutlineTags className="mr-4 text-2xl text-gray-400" />
          <input
            className="focus-visible:outline-none placeholder:text-gray-400 bg-background w-full h-4 pr-4 text-sm"
            placeholder="Event tags..."
            onChange={(e) => {}}
          />
        </div>
        <Select onValueChange={(value) => {}}>
          <SelectTrigger className="w-[278px] focus:ring-0 focus:ring-offset-0 ring-offset-0">
            <SelectValue className="" placeholder="Select total people" />
          </SelectTrigger>
          <SelectContent
            side="bottom"
            className="max-h-[230px] overflow-y-hidden bg-background"
          >
            <SelectGroup>
              {Array.from({ length: 24 }, (_, i) => i + 1).map(
                (item, index) => {
                  return (
                    <SelectItem
                      key={index}
                      className="bg-background hover:bg-muted transition"
                      value={item + ""}
                    >
                      {item}
                    </SelectItem>
                  );
                }
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-lg flex items-center w-full bg-background px-4 py-2">
        <BsShieldLock className="mr-4 text-2xl text-gray-400" />
        <input
          className="focus-visible:outline-none placeholder:text-gray-400 bg-background w-full h-4 pr-4 text-sm"
          placeholder="Add some rules for your event..."
          onChange={(e) => {}}
        />
      </div>
    </div>
  );
};

export default EventMoreInformation;
