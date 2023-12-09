import ImageNew from "@/components/new-image/Image";
import { Button } from "@/components/ui/button";
import { CoachDataWithProfile } from "@/types/supabaseTableType";
import { Database } from "@/types/supabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const supabaseClient = createServerComponentClient<Database>({ cookies });

  const { data, error } = (await supabaseClient
    .from("coach_profiles")
    .select("*, profiles(*)")) as unknown as {
    data: CoachDataWithProfile[];
    error: any;
  };

  if (error) {
    console.log(error.message);
    return redirect("/coach");
  }
  if (!data) {
    return redirect("/coach");
  }

  return (
    <div className="mx-8 !pt-[72px] px-14">
      <div className="w-full center my-12">
        <h1 className="text-3xl super font-bold">Gbox Verifed Coach</h1>
      </div>
      <div className="w-full center mt-14">
        <div className="xl:grid-cols-5 grid gap-y-12 w-full md:grid-cols-1">
          {data.map((coach, index) => (
            <Link
              key={index}
              className="inline-block shrink-0 px-3 h-[375px] "
              href={`/coach/${coach.profile_name}`}
            >
              <div className="w-full group overflow-hidden h-full rounded-xl">
                <div className="w-full h-[240px] overflow-hidden rounded-xl">
                  <ImageNew
                    src={coach.profiles.avatar!}
                    className="w-full h-[240px] rounded-xl object-cover object-center scale-100 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex my-3 items-center justify-between">
                  <div className="max-w-[100%] line-clamp-1 font-bold text-lg">
                    {coach.full_name}
                  </div>
                </div>
                <div className="mt-3 text-zinc-400 text-sm block">
                  <div className="line-clamp-3">{coach.description}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
