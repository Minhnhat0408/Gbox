import { LiveSession } from "@/components/live-session";

export default async function LiveSessionPage({
  params,
}: {
  params: { username: string; room: string };
}) {
  //TODO get param and authenticated user then get token
 
 
  const res = await fetch(
    `/api/livekit?room=${params.room}&username=${params.username}`
  );
  const data = await res.json();
  return <LiveSession token={data.token} />;
}
