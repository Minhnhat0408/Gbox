"use client";

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaRegFaceGrinBeam } from "react-icons/fa6";

interface EmojiPickerProps {
  onChange: (value: string) => void;
  className?: string;
}

export const EmojiPicker = ({ onChange, className }: EmojiPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <FaRegFaceGrinBeam />
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="bg-transparent border-none shadow-none drop-shadow-none "
      >
        <Picker
          theme={"dark"}
          data={data}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  );
};
