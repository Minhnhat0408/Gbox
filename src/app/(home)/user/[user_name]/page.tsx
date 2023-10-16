import ProfileHeader from "./components/ProfileHeader";
import ProfileBody from "./components/ProfileBody";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabaseTypes";
import { cookies } from "next/headers";
import { ProfilesType } from "@/types/supabaseTableType";

type UserProfileProps = { params: { user_name: string } };

async function UserPage({ params }: UserProfileProps) {

  const supabase = createServerComponentClient<Database>({ cookies });

  const { data, error } = await supabase.from('profiles').select('').eq('name', params.user_name).single() as { data: ProfilesType; error: any };


  return (
    <div className="mx-8">
      <ProfileHeader  data={data} />

      <ProfileBody profile={data} />
    </div>
  )
}

export default UserPage;
