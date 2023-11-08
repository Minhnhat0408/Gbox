import { EventReturnType } from "@/types/supabaseTableType";
import EventCard from "./EventCard";
import { Database } from "@/types/supabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function EventLists() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data, error } = (await supabase
    .from("events")
    .select("*, profiles(name)")
    .order("start_date", { ascending: false })) as {
    data: EventReturnType[] | null;
    error: any;
  };

  if (!data || error) {
    return (
      <div className="space-y-10 pt-5 pb-10" id="event-lists">
        <div>
          <h1 className="text-4xl super text-center font-bold mt-4">
            Lists Event
          </h1>
          <h3 className="text-xl text-center mt-3">
            Choose what event you wanna join{" "}
          </h3>
        </div>
        <div className="w-full center mt-8">
          <h1 className="super font-bold text-3xl">
            Something happened! Please refresh the page
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pt-5 pb-10" id="event-lists">
      <div>
        <h1 className="text-4xl super text-center font-bold mt-4">
          Lists Event
        </h1>
        <h3 className="text-xl text-center mt-3">
          Choose what event you wanna join{" "}
        </h3>
      </div>
      <div className="w-full center">
        <div className="grid-cols-3 md:grid-cols-1 w-[1144px] lg:grid-cols-2 xl:grid-cols-3 grid gap-x-8 gap-y-12">
          {data.map((event, index) => {
            return <EventCard key={index} data={event} />;
          })}
        </div>
      </div>
    </div>
  );
}
