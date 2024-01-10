import { LiveSession } from "@/components/live-session";
import { Database } from "@/types/supabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function CallPage({
  searchParams,
}: {
  searchParams: {
    senderID: string;
    receiverID?: string;
    groupID?: string;
  };
}) {
  // Authorization Flow with room = appointmentID and userID = currentUserID (coach or student)

  const { senderID, receiverID, groupID } = searchParams;
  const supabaseClient = createServerComponentClient<Database>({ cookies });

  // identify user
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (user?.id !== senderID) {
    // currentUser is not the same as the user in the URL
    return redirect("/");
  }

  // check if it a direct call or group call
  let room = "";
  if (receiverID) {
    room = senderID + receiverID;

    room = room.split("").sort().join("");

    // check if the user in the room
    let { data: contacts, error } = await supabaseClient.rpc(
      "get_user_friends_and_contacts",
      {
        user_id: user.id,
      }
    );

    // check if contact list contain the receiverID
    if (error) {
      console.error(error);
      return redirect("/");
    }
    if (contacts) {
      const contact = contacts.find((contact) => contact.id === receiverID);
      if (!contact) {
        return redirect("/");
      }
    }
  } else if (groupID) {
    room = groupID;

    // check if the user in the group
    let { data: groups, error } = await supabaseClient.rpc(
      "get_latest_group_messages",
      {
        _user_id: user.id,
      }
    );

    if (error) {
      console.error(error);
      return redirect("/");
    }

    if (groups) {
      const group = groups.find((group) => group.id === senderID);
      if (!group) {
        return redirect("/");
      }
    }
  }
  const { data: userData, error: userError } = await supabaseClient
    .from("profiles")
    .select("name")
    .eq("id", senderID)
    .single();

  if (userError || !userData) {
    console.error(userError);
    return redirect("/");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/livekit?room=${room}&username=${userData.name}`
  );

  const data = await res.json();

  return <LiveSession token={data.token} />;
}
