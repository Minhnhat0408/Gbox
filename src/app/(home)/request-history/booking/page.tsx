import { CoachDataWithProfile } from "@/types/supabaseTableType";
import { Database } from "@/types/supabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const CoachManageStudentRequestPage = async () => {
  const supabaseClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  const { data, error } = (await supabaseClient
    .from("coach_profiles")
    .select("*, profiles(*)")
    .eq("user_id", user?.id!)
    .single()) as unknown as { data: CoachDataWithProfile | null; error: any };

  if (!data) {
    // not coach
    return redirect("/");
  }

  //TODO: fetch student request

  return <div></div>;
};

export default CoachManageStudentRequestPage;
