import RoomAudio from "@/components/room-audio";
import { Database } from "@/types/supabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RoomAudioPage({
  searchParams,
}: {
  searchParams: { room: string; userId: string };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: roomData, error: roomError } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", searchParams.room)
    .single();
  if (!roomData || roomError) {
    redirect("/");
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.id !== searchParams.userId) {
    redirect("/");
  }
  const { data: roomUser, error: roomUserError } = await supabase
    .from("room_users")
    .select("*,profiles(name)")
    .eq("room_id", searchParams.room)
    .eq("user_id", searchParams.userId)
    .single();
  if (!roomUser || roomUserError) {
    redirect("/");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/livekit?room=${
      searchParams.room
    }&username=${roomUser!.profiles!.name}`
  );
  const data = await res.json();

  return <RoomAudio token={data.token} />;
}
