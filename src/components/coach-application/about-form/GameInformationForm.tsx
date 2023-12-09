"use client";

import { useApplyFormData } from "@/hooks/useApplyFormData";
import { ChooseGameInput } from "./GameChooseInput";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { Trash } from "lucide-react";

const GameInformationForm = () => {
  const {
    choosedGame,
    removeChoosedGame,
    addIngameName,
    addAnotherGame,
    removeAnotherGame,
    anotherGame,
    setChooseGameError,
    chooseGameError,
  } = useApplyFormData();

  const [inputCount, setInputCount] = useState(anotherGame.length);

  return (
    <div className="space-y-7 mt-6 p-6 rounded-xl bg-home w-full border-2 border-primary">
      <div className="space-y-2">
        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          What game(s) are you a Partner in and would like to coach?
        </Label>
        <ChooseGameInput />
        {chooseGameError && (
          <div className="text-sm font-medium text-red-400">
            {chooseGameError}
          </div>
        )}
        {choosedGame.length > 0 && (
          <div className="w-full space-y-4 pt-3">
            {choosedGame.map((game, index) => (
              <div
                className="flex justify-between items-center w-full gap-x-5"
                key={index}
              >
                <div className="flex gap-x-2 relative items-center p-2 rounded-lg bg-background w-[60%]">
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-8 h-8 rounded-lg mr-1"
                    src={game.data.primaryImage.url}
                    alt={"image"}
                  />
                  <div className="font-bold line-clamp-1 text-sm max-w-[70%]">
                    {game.data.metadata.names.name ||
                      game.data.metadata.names.short}
                  </div>
                  <AiOutlineClose
                    onClick={() => {
                      removeChoosedGame(index);
                    }}
                    className="text-base absolute right-3 cursor-pointer"
                  />
                </div>
                <Input
                  onChange={(e) => {
                    if (e.target.value.trim()) {
                      addIngameName(index, e.target.value.trim());
                    }
                  }}
                  placeholder="Ingame ID (optional)  "
                  className="flex-1 h-12"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Is there a character/role/deck in game you use most often?
        </Label>
        <Input
          onChange={(e) => {
            if (e.target.value.trim()) {
              addAnotherGame(e.target.value.trim(), 0);
            }
          }}
          className="h-12"
        />
        {inputCount > 0 &&
          [...Array(inputCount)].map((_, index) => (
            <div className="w-full relative pt-1" key={index}>
              <Input
                onChange={(e) => {
                  addAnotherGame(e.target.value.trim(), index + 1);
                }}
                value={anotherGame[index + 1] || ""}
                className="h-12 w-full"
              ></Input>
              <Trash
                onClick={() => {
                  setInputCount(inputCount - 1);
                  removeAnotherGame(index + 1);
                }}
                className="absolute right-3 top-4 text-sm cursor-pointer w-5 h-5 text-primary"
              />
            </div>
          ))}
        <div
          onClick={() => {
            setInputCount(inputCount + 1);
          }}
          className="flex w-fit items-center pt-2 cursor-pointer"
        >
          <FaPlus className="w-[10px] h-[10px] text-white mr-2" />
          <span className="text-xs text-white">Add more</span>
        </div>
      </div>
    </div>
  );
};

export default GameInformationForm;
