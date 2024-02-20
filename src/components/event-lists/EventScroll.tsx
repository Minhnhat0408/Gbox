"use client";

import { EventReturnType } from "@/types/supabaseTableType";
import EventCard from "./EventCard";
import { Button } from "../ui/button";
import { useEventList } from "@/hooks/useEventList";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ImSpinner2 } from "react-icons/im";
import { wait } from "@/lib/wait";
import { useSupabase } from "@/hooks/useSupabaseClient";

const EventScroll = ({ events }: { events: EventReturnType[] }) => {
  const { eventsList, setEventsList } = useEventList();

  const [loading, setLoading] = useState(false);

  const [loadMore, setLoadMore] = useState(true);

  const supabase = useSupabase();

  useEffect(() => {
    setEventsList(events);
  }, [events, setEventsList]);

  const loadMoreEvent = async () => {
    try {
      setLoading(true);
      const { data, error } = (await supabase
        .from("events")
        .select("*, profiles(name)")
        .range(eventsList.length, eventsList.length + 8)
        .order("start_date", { ascending: false })) as {
        data: EventReturnType[] | null;
        error: any;
      };

      if (!data || error) {
        return toast.error(error.message);
      }

      if (data.length < 8) {
        setLoadMore(false);
        setLoading(false);
        setEventsList([...eventsList, ...data]);
      }

      setEventsList([...eventsList, ...data]);

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="w-full center">
        <div className="grid-cols-3 md:grid-cols-1 w-[1144px] lg:grid-cols-2 xl:grid-cols-3 grid gap-x-8 gap-y-12">
          {eventsList.length > 0
            ? eventsList.map((event, index) => {
                return <EventCard key={index} data={event} />;
              })
            : events.map((event, index) => {
                return <EventCard key={index} data={event} />;
              })}
        </div>
      </div>
      <div className="w-full center py-14">
        {loadMore && (
          <Button
            className="shine w-[149px]"
            onClick={loadMoreEvent}
            size={"lg"}
          >
            {loading ? (
              <>
                Loading <ImSpinner2 className="text-xl ml-2 animate-spin" />
              </>
            ) : (
              "Load more"
            )}
          </Button>
        )}
      </div>
    </>
  );
};

export default EventScroll;
