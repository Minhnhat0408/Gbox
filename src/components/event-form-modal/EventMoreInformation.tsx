import { AiOutlineTags, AiOutlineClose } from "react-icons/ai";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { BsShieldLock } from "react-icons/bs";
import { useEventMoreInformation } from "@/hooks/useEventMoreInformation";

const EventMoreInformation = () => {
  const {
    tags,
    addTags,
    removeTags,
    setInputRules,
    setInputTags,
    inputRules,
    inputTags,
    rules,
    addRules,
    removeRules,
    setPeople,
    people,
  } = useEventMoreInformation();

  return (
    <div className="w-full flex flex-col gap-y-5">
      <div className="w-full flex gap-x-4">
        <div className="rounded-lg flex items-center !w-[440px] bg-background px-4 py-2">
          <AiOutlineTags className="mr-4 text-2xl text-gray-400" />
          <input
            className="focus-visible:outline-none placeholder:text-gray-400 bg-background w-full h-4 pr-4 text-sm"
            placeholder="Event tags..."
            value={inputTags}
            onChange={(e) => {
              setInputTags(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
              if (e.key === "Enter" && inputTags.trim() !== "") {
                addTags(inputTags.trim());
                setInputTags("");
              }
            }}
          />
        </div>
        <Select
          onValueChange={(value) => {
            setPeople(value);
          }}
          value={people}
        >
          <SelectTrigger className="w-[278px] focus:ring-0 focus:ring-offset-0 ring-offset-0">
            <SelectValue className="" placeholder="Select total people" />
          </SelectTrigger>
          <SelectContent
            side="bottom"
            className="max-h-[230px] overflow-y-hidden bg-background"
          >
            <SelectGroup>
              <SelectItem
                key={30}
                className="bg-background hover:bg-muted transition"
                value={"no-limit"}
              >
                {"No limit"}
              </SelectItem>
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
      {tags.length > 0 && (
        <div className="flex flex-wrap items-start cursor-pointer overflow-auto pt-2 pb-1 w-full min-h-[34px] text-[14px]">
          {tags.map((e, index) => (
            <div
              key={index}
              className="flex rounded-sm items-center flex-shrink min-w-0 max-w-full h-8 pl-2 pr-0 text-[14px] leading-[120%] text-white bg-black/20 hover:bg-black/30 mr-3 mb-3 whitespace-nowrap overflow-hidden text-ellipsis"
            >
              <div className="whitespace-nowrap overflow-hidden text-ellipsis inline-flex items-center h-5 leading-5">
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {e}
                </span>
              </div>
              <div
                onClick={(e) => {
                  removeTags(index);
                }}
                className="select-none cursor-pointer flex items-center justify-center grow-0 shrink-0 mx-[2px] w-5 h-5"
              >
                <AiOutlineClose />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="rounded-lg flex items-center w-full bg-background px-4 py-2">
        <BsShieldLock className="mr-4 text-2xl text-gray-400" />
        <input
          className="focus-visible:outline-none placeholder:text-gray-400 bg-background w-full h-4 pr-4 text-sm"
          placeholder="Add some rules for your event..."
          value={inputRules}
          onChange={(e) => {
            setInputRules(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
            if (e.key === "Enter" && inputRules.trim() !== "") {
              addRules(inputRules.trim());
              setInputRules("");
            }
          }}
        />
      </div>
      {rules.length > 0 && (
        <div className="space-y-4 w-full p-4 bg-black/10 rounded-lg">
          {rules.map((e, index) => {
            return (
              <div
                className="flex w-full justify-between items-center"
                key={index}
              >
                <div className=" w-[calc(100%-41px)]">
                  <span className="mr-3">{index + 1}.</span>
                  {e}
                </div>
                <div
                  onClick={(e) => {
                    removeRules(index);
                  }}
                  className="select-none cursor-pointer flex items-center justify-center grow-0 shrink-0 mx-[2px] w-5 h-5"
                >
                  <AiOutlineClose />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventMoreInformation;
