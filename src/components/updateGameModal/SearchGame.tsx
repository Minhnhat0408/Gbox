import { FiSearch } from "react-icons/fi";

function SearchGame() {
  return (
    <div className="rounded-xl flex items-center w-full h-16 px-6 py-2 bg-gray-800">
      <FiSearch className="mr-4 text-2xl text-gray-400" />
      <input
        className="focus-visible:outline-none placeholder:text-gray-400 w-full h-8 pr-4 text-lg bg-gray-800"
        placeholder="Search anything..."
      />
    </div>
  );
}

export default SearchGame;
