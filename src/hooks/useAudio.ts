
import { useEffect, useRef } from "react";

import useInteraction from "./useInteraction";

const { Howl } = require('howler');
export default function useAudio(soundPath:string,options?: { loop?:boolean,volume?:number}) {
  const hasInteracted = useInteraction();
  const audioRef = useRef<any>();

  useEffect(() => {
    if (!hasInteracted) {
      return;
    }
    let audio = new Howl({ src: soundPath,loop:options?.loop || false,volume:options?.volume || 1 });
    audioRef.current = audio;
    return () => audio.unload();
  }, [ hasInteracted, soundPath ]);

  return {play: () => audioRef.current?.play(), stop: () => audioRef.current?.stop()};
}