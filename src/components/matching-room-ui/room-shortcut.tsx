"use client";

import { useMatchingRoom } from "@/hooks/useMatchingRoom";

export default function RoomShortCut() {
  const { onOpen } = useMatchingRoom((set) => set);
  return (
    <button
      onClick={() => {
        onOpen();
        // toast.custom((t) => (
        //     <div className="bg-home">
        //       This is a custom component <button onClick={() => toast.dismiss(t)}>close</button>
        //     </div>
        //   ),{
        //     duration: 5000,
        //     position: 'top-right',
        //   });
       
      }}
      className="fixed bottom-10 left-1/2 fancy -translate-x-1/2 py-3 px-6 bg-muted flex justify-center  rounded-full "
    >
      <span className="font-bold z-10 tracking-wider super ">
        Return to room
      </span>
      <span className="btn-hexagon absolute inset-0 border-primary"></span>
    </button>
  );
}
