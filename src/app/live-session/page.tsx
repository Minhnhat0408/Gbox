import CountDownAppointMent from "@/components/count-down/CountDown";
import { LiveSession } from "@/components/live-session";
import LiveSessionEnd from "@/components/live-session-end/LiveSessionEnd";
import { convertDurationToMinute } from "@/lib/convertDurationToMinute";
import { isCurrentTimeAfterAppointmentEnd } from "@/lib/isCurrentTimeAfterAppointment";
import {
  AppointmentType,
  DetailedAppointmentType,
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
  // Authorization Flow with room = appointmentID and userID = currentUserID (coach or student)

  const { userID, room } = searchParams;
  const supabaseClient = createServerComponentClient<Database>({ cookies });

  // identify user
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (user?.id !== userID) {
    // currentUser is not the same as the user in the URL
    return redirect("/");
  }

  // check if that room is exist (room = appointmentID)
  // which mean that appoitment is exist in database

  const { data: appoinmentData, error } = (await supabaseClient
    .from("appointment")
    .select(
      `*, 
      coach_data:profiles!appointment_coach_profile_id_fkey(*),
      student_data:profiles!appointment_student_id_fkey(*),
      course_session(*)
    `
    )
    .eq("id", room)
    .single()) as unknown as {
    data: DetailedAppointmentType;
    error: any;
  };

  //  redirect to home page if that room is not exist
  if (error || !appoinmentData) {
    console.error(error);
    return redirect("/");
  }

  // case that anyone have appointment ID but they are not identified as student or coach
  if (
    appoinmentData.student_id !== userID &&
    appoinmentData.coach_profile_id !== userID
  ) {
    return redirect("/");
  }

  // check if that room is not expired (appointment_date > now)
  if (new Date(appoinmentData.appointment_time) > new Date()) {
    return <CountDownAppointMent data={appoinmentData} />;
  }

  // check if the room is expired (appointment_date + duration > now)
  if (
    isCurrentTimeAfterAppointmentEnd(
      appoinmentData.appointment_time,
      convertDurationToMinute(appoinmentData.course_session.duration)
    )
  ) {
    return <LiveSessionEnd />;
  }

  let userName;

  if (appoinmentData.student_id === userID) {
    userName = appoinmentData.student_data.name;
  } else {
    userName = appoinmentData.coach_data.name;
  }

  // update presence of student or coach
  let updatePresence;

  if (appoinmentData.student_id === userID) {
    updatePresence = supabaseClient
      .from("appointment")
      .update({ student_verify: true })
      .eq("id", room);
  } else {
    updatePresence = supabaseClient
      .from("appointment")
      .update({ coach_verify: true })
      .eq("id", room);
  }

  const getToken = fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/livekit?room=${searchParams.room}&username=${userName}`
  );

  const [res, updatePresenceRes] = await Promise.all([
    getToken,
    updatePresence,
  ]);
  const data = await res.json();

  return <LiveSession token={data.token} />;
}
