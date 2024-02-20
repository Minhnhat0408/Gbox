import { EventReturnType } from "@/types/supabaseTableType";
import { Database } from "@/types/supabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import axios from "axios";
import EventScroll from "./EventScroll";

export default async function EventLists() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data, error } = (
    await supabase
    .from("events")
    .select("*, profiles(name)")
    .range(0, 8)
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
      <EventScroll events={data} />
    </div>
  );
}
