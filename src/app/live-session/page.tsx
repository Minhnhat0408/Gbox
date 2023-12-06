import CountDownAppointMent from "@/components/count-down/CountDown";
import { LiveSession } from "@/components/live-session";
import LiveSessionEnd from "@/components/live-session-end/LiveSessionEnd";
import { convertDurationToMinute } from "@/lib/convertDurationToMinute";
import { isCurrentTimeAfterAppointmentEnd } from "@/lib/isCurrentTimeAfterAppointment";
import {
  AppointmentType,
  SessionApplicationType,
} from "@/types/supabaseTableType";
import { Database } from "@/types/supabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LiveSessionPage({
  searchParams,
}: {
  searchParams: { userID: string; room: string };
}) {
  // Authorization Flow

  const { userID, room } = searchParams;
  const supabaseClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (user?.id !== userID) {
    // currentUser is not the same as the user in the URL
    return redirect("/");
  }

  //TODO: check if that room is exist (room = appointmentID)

  const { data: appoinmentData, error } = (await supabaseClient
    .from("appointment")
    .select("*, course_session(*)")
    .eq("id", room)
    .single()) as unknown as {
    data: AppointmentType & {
      course_session: SessionApplicationType;
    };
    error: any;
  };

  // error or appointment not exist
  if (error || !appoinmentData) {
    console.error(error);
    return redirect("/");
  }

  console.log(appoinmentData);

  // case that anyone have appointment ID but they are not identified as student or coach
  if (
    appoinmentData.student_id !== userID &&
    appoinmentData.coach_profile_id !== userID
  ) {
    return redirect("/");
  }
  //TODO: check if that room is not expired (appointment_date > now)
  if (new Date(appoinmentData.appointment_time) > new Date()) {
    return <CountDownAppointMent data={appoinmentData} />;
  }

  if (
    isCurrentTimeAfterAppointmentEnd(
      appoinmentData.appointment_time,
      convertDurationToMinute(appoinmentData.course_session.duration)
    )
  ) {
    return <LiveSessionEnd />;
  }
  // const;

  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_SITE_URL}/api/livekit?room=${searchParams.room}&username=${username}`
  // );
  // const data = await res.json();
  return (
    <div>
      <div>room: {room}</div>
      <div>userID: {userID}</div>
    </div>
  );
  // return <LiveSession token={data.token} />;
}
