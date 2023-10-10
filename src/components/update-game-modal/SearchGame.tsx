import { useDebounce } from "@/hooks/useDebounce";
import useUpdateGameModal from "@/hooks/useUpdateGameModal";
import { searchGameIGN } from "@/services/client/ignClientService";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

function SearchGame() {
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  const { setIsLoading, setGameData, popularGame } = useUpdateGameModal();

  useEffect(() => {
    const searchGames = async () => {
      setIsLoading(true);
      const { status, data } = await searchGameIGN(debouncedValue, 20, 0);
      if (status === 200) {
        setGameData(data);
      }
      setIsLoading(false);
    };

    if (debouncedValue.trim() !== "") {
      searchGames();
    } else {
      setGameData(popularGame);
    }
  }, [debouncedValue]);

  return (
    <div className="rounded-xl flex items-center w-full h-16 px-6 py-2 bg-gray-800">
      <FiSearch className="mr-4 text-2xl text-gray-400" />
      <input
        className="focus-visible:outline-none placeholder:text-gray-400 w-full h-8 pr-4 text-lg bg-gray-800"
        placeholder="Search anything..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}

export default SearchGame;
