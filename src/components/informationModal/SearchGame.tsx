import { Game, usePlayedGameForm } from "@/hooks/usePlayedGameForm";
import { shallow } from "zustand/shallow";
import { Command, CommandInput } from "../ui/command";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { searchGame } from "@/services/client/rawgClientService";

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
      const searchResponse = await searchGame(debouncedValue);
      console.log(searchResponse);

      if (searchResponse.status === 200) {
        const searchData = searchResponse.data.map((e) => {
          return {
            name: e.name,
            slug: e.slug,
            image_background: e.background_image,
          };
        });
        setTopGame(searchData);
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
