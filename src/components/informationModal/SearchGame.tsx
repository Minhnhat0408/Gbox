import { Game, usePlayedGameForm } from "@/hooks/usePlayedGameForm";
import { shallow } from "zustand/shallow";
import { Command, CommandInput } from "../ui/command";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { searchGame } from "@/services/client/rawgClientService";
import { searchGameIGN } from "@/services/client/ignClientService";

type SearchGameType = {
  className: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTopGame: (topGame: Game[]) => void;
};

function SearchGame({ className, setLoading, setTopGame }: SearchGameType) {
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const searchGames = async () => {
      setLoading(true);
      const searchResponse = await searchGameIGN(debouncedValue, 30, 0);

      if (searchResponse.status === 200) {
        setTopGame(searchResponse.data);
      }
      setLoading(false);
    };
    if (debouncedValue !== "") {
      searchGames();
    }
  }, [debouncedValue, setTopGame]);

  return (
    <Command className={className}>
      <CommandInput
        placeholder="Search"
        onValueChange={(e) => {
          setValue(e.trim());
        }}
      />
    </Command>
  );
}

export default SearchGame;
