"use client";
import "@livekit/components-styles";
import {
  LiveKitRoom,
  VideoConference,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  ControlBar,
  useTracks,
  WidgetState,
  LayoutContextProvider,
  useCreateLayoutContext,
  Chat,
  ConnectionStateToast,
} from "@livekit/components-react";
import { useEffect, useState } from "react";
import { Track } from "livekit-client";

import { Loader2 } from "lucide-react";

export default function RoomAudio({ token }: { token: string }) {
  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center w-full h-full items-center">
        <Loader2 className="h-7 w-7 text-3xl text-primary animate-spin my-4" />
        <p className="text-xl text-primary  ">Loading...</p>
      </div>
    );
  }
  return (
    <LiveKitRoom
      video={false}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      // Use the default LiveKit theme for nice styles.
      data-lk-theme="default"
      style={{ height: "100dvh" }}
    >

      <MyVideoConference />
    </LiveKitRoom>
  );
}

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const [widgetState, setWidgetState] = useState<WidgetState>({
    showChat: false,
    unreadMessages: 0,
  });
  const widgetUpdate = (state: WidgetState) => {
    setWidgetState(state);
  };
  const layoutContext = useCreateLayoutContext();
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );
  return (
    <div className="lk-video-conference">
      <LayoutContextProvider
        value={layoutContext}
        // onPinChange={handleFocusStateChange}
        onWidgetChange={widgetUpdate}
      >
        <div className="lk-video-conference-inner">
          <div className="lk-grid-layout-wrapper">
            <GridLayout tracks={tracks}>
              <ParticipantTile />
            </GridLayout>
          </div>

          <ControlBar
            controls={{ chat: true, camera: false, screenShare: false }}
          />
        </div>
        <Chat style={{ display: widgetState.showChat ? "grid" : "none" }} />
      </LayoutContextProvider>

      <RoomAudioRenderer />
      <ConnectionStateToast />
    </div>
  );
}
