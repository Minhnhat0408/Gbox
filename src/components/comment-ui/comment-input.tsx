"use client";

import { FiSearch } from "react-icons/fi";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

export default function CommentInput() {
  return (
    <div className=" py-2 w-full flex justify-center">
      <div className="rounded-3xl w-full max-h-14 bg-[#00453F] px-6 py-2 flex items-center">
        <FiSearch className="mr-4 text-2xl text-gray-400" />
        <Input
          className="w-full h-8 bg-[#00453F] focus-visible:outline-none placeholder:text-gray-400 pr-4"
          placeholder="Comment something here..."
        />
      </div>
    </div>
  );
}
