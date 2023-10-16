"use client";

import { useEffect, useRef } from "react";
import Plyr, { APITypes } from "plyr-react";
import "plyr-react/plyr.css";

type VideoPlayerProps = {
  src: string;
  options?: Plyr.Options;
};

const VideoPlayer = ({ src, options }: VideoPlayerProps) => {
  const ref = useRef<APITypes>(null);
  const plyrVideo = src ? (
    <Plyr
      ref={ref}
      // className="object-cover w-full h-full"
      source={{
        type: "video",
        sources: [
          {
            src: src,
            provider: "html5",
          },
        ],
      }}
      options={options}
    />
  ) : null;

  return <div className="video-player">{plyrVideo}</div>;
};

export default VideoPlayer;
