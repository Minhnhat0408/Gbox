import { convertDurationToMinute } from "@/lib/convertDurationToMinute";
import { Database } from "@/types/supabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const CoachingPage = async () => {
  //TODO: fetch session and coach
  const supabaseClient = createServerComponentClient<Database>({ cookies });

  return (
    <div className="mx-8 !pt-[72px] px-14">
      See Coaching and Session Information Here
    </div>
  );
};

export default CoachingPage;
