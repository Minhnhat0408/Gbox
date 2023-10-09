"use client";

import { FiSearch } from "react-icons/fi";

function Search() {
  return (
    <div className="rounded-3xl w-[320px] max-h-14 bg-[#00453F] px-6 py-2 ml-4 flex items-center">
      <FiSearch className="mr-4 text-2xl text-gray-400" />
      <input
        className="w-full h-8 bg-[#00453F] focus-visible:outline-none placeholder:text-gray-400 pr-4"
        placeholder="Search anything..."
      />
    </div>
  );
}

export default Search;
