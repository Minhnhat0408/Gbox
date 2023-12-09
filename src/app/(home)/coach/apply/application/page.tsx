import Accepted from "@/components/coach-application/Accepted";
import PageComponent from "@/components/coach-application/PageComponent";
import AboutApplyForm from "@/components/coach-application/about-form/AboutApplyForm";
import FinishForm from "@/components/coach-application/finish-form/FinishForm";
import SocialForm from "@/components/coach-application/social-form/SocialForm";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CoachApplicationType } from "@/types/supabaseTableType";
import { Database } from "@/types/supabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

// 1 person only have 1 application, if that application is denied, delete record from coach-application table

const ApplyCoachingPage = async () => {
  const supabaseClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: coachProfiles } = (await supabaseClient
    .from("coach_profiles")
    .select("*, profiles(*)")
    .eq("user_id", user?.id)
    .single()) as unknown as { data: CoachApplicationType; error: any };

  if (coachProfiles) {
    return <Accepted coachProfiles={coachProfiles} />;
  }

  return <PageComponent />;
};

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export default ApplyCoachingPage;
