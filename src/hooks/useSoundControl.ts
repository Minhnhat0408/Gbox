import sound from "@/constants/sound";
import { create } from "zustand";

const { Howl } = require("howler");
type SoundControlProps = {
  gameMatching: any;
  gameMatchingState: "play" | "pause" | "stop";
  controlGameMatching: (actions: "play" | "pause" | "stop") => void;
  setGameMatchingState: (actions: "play" | "pause" | "stop") => void;
};

const initValue = {
  gameMatching: new Howl({ src: sound.gameMatching, loop: true, volume: 0.07 }),
  gameMatchingState: "stop" as "play" | "pause" | "stop",

};


export const useSoundControl = create<SoundControlProps>((set) => ({
  ...initValue,
  setGameMatchingState: (actions) => set({ gameMatchingState: actions }),
  controlGameMatching: (actions) =>
    set((state) => {
      if (actions === "play") {
        state.gameMatching.play();
    
      } else if (actions === "pause") {
        state.gameMatching.pause();
     
      } else {
        state.gameMatching.stop();
     
      }
      return state
    }),
}));

