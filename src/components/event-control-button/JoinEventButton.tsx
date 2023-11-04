"use client";

import {
  AiOutlineCheck,
  AiOutlineLoading3Quarters,
  AiTwotoneStar,
} from "react-icons/ai";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { useEventDetail } from "@/hooks/useEventDetail";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useEventMemberModal } from "@/hooks/useEventMemberModal";
import { useConfirmRulesModal } from "@/hooks/useConfirmRulesModal";

const JoinEventButton = () => {
  const {
    id,
    isPariticpated,
    event_participations,
    total_people,
    setParticipate,
    isHost,
    loading,
    setLoading,
    rules,
    end_date,
    start_date,
  } = useEventDetail();

  const { setMembers, removeMember } = useEventMemberModal();

  const { onOpen } = useConfirmRulesModal();

  const { supabaseClient } = useSessionContext();

  const { userDetails } = useUser();

  const joinEvent = async () => {
    if (!userDetails) return;
    if (start_date) {
      const endDate = new Date(start_date);
      const currentDate = new Date();
      if (currentDate > endDate) {
        return toast.error("Sorry, this event has ended 😞");
      }
    }
    if (rules && rules?.length > 0) {
      return onOpen();
    }

    setLoading(true);
    setParticipate(false);

    const { data: totalMember, error: queryError } = await supabaseClient
      .from("event_participations")
      .select("*, profiles(*)")
      .eq("event_id", id);

    if (queryError) {
      setLoading(false);
      setParticipate(false);
      return toast.error(queryError.message);
    }

    setMembers([...totalMember]);

    if (
      total_people !== "no-limit" &&
      totalMember.length + 1 === parseInt(total_people!)
    ) {
      setLoading(false);
      setParticipate(false);
      return toast.error("Sorry, this event is full for now 😞");
    }

    const { data, error } = await supabaseClient
      .from("event_participations")
      .insert({
        participation_id: userDetails.id,
        event_id: id,
      });
    if (error) {
      setLoading(false);
      setParticipate(false);
      return toast.error(error.message);
    }
    setMembers([
      {
        ...userDetails,
        event_id: id,
        joined_date: new Date().toISOString(),
        participation_id: userDetails.id,
        profiles: userDetails,
      },
      ...totalMember,
    ]);
    setParticipate(true);
    setLoading(false);
    toast.success("Welcome to the event ! 😁");
  };

  const outEvent = async () => {
    if (!userDetails) return;
    setLoading(true);
    setParticipate(true);
    const { data, error } = await supabaseClient
      .from("event_participations")
      .delete()
      .match({
        participation_id: userDetails.id,
        event_id: id,
      });
    if (error) {
      setLoading(false);
      setParticipate(true);
      return toast.error(error.message);
    }
    removeMember(0);
    setParticipate(false);
    setLoading(false);
    setParticipate(false);
  };

  if (isHost) return null;

  if (!loading && !isPariticpated) {
    return (
      <Button size="sm" onClick={joinEvent} className="">
        <AiTwotoneStar className="text-xl text-white mr-2" />
        <span className="text-white">Join Event</span>
      </Button>
    );
  }

  if (loading && !isPariticpated) {
    return (
      <Button disabled size="sm" className="">
        <AiOutlineLoading3Quarters className="text-xl text-white mr-2 animate-spin" />
        <span className="text-white">Join Event</span>
      </Button>
    );
  }

  if (isPariticpated && !loading) {
    return (
      <Button onClick={outEvent} size="sm" className="">
        <AiOutlineCheck className="text-xl text-white mr-2" />
        <span className="text-white">Joined Event</span>
      </Button>
    );
  }

  if (isPariticpated && loading) {
    return (
      <Button disabled size="sm" className="">
        <AiOutlineLoading3Quarters className="text-xl text-white mr-2 animate-spin" />
        <span className="text-white">Joined Event</span>
      </Button>
    );
  }
};

export default JoinEventButton;
