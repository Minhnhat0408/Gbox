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
import { useState } from "react";
import { toast } from "sonner";
import { useEventMemberModal } from "@/hooks/useEventMemberModal";

const JoinEventButton = () => {
  const {
    id,
    isPariticpated,
    user_id,
    event_participations,
    total_people,
    setParticipate,
  } = useEventDetail();

  const { setMembers, removeMember } = useEventMemberModal();

  const [joinState, setJoinState] = useState({
    loading: false,
    joined: isPariticpated,
  });
  const { supabaseClient } = useSessionContext();

  const { userDetails } = useUser();

  const joinEvent = async () => {
    if (!userDetails) return;
    if (
      total_people !== "no-limit" &&
      event_participations.length + 1 === parseInt(total_people!)
    ) {
      return toast.error("Sorry, this event is full for now 😞");
    }
    setJoinState({
      loading: true,
      joined: false,
    });
    const { data, error } = await supabaseClient
      .from("event_participations")
      .insert({
        participation_id: userDetails.id,
        event_id: id,
      });
    if (error) {
      toast.error(error.message);
      return setJoinState({
        loading: false,
        joined: false,
      });
    }
    setMembers([
      {
        ...userDetails,
        event_id: id,
        joined_date: new Date().toISOString(),
        participation_id: userDetails.id,
        profiles: userDetails,
      },
      ...event_participations,
    ]);
    setParticipate(true);
    setJoinState({
      loading: false,
      joined: true,
    });
  };

  const outEvent = async () => {
    if (!userDetails) return;
    setJoinState({
      loading: true,
      joined: true,
    });
    const { data, error } = await supabaseClient
      .from("event_participations")
      .delete()
      .match({
        participation_id: userDetails.id,
        event_id: id,
      });
    if (error) {
      toast.error(error.message);
      return setJoinState({
        loading: false,
        joined: true,
      });
    }
    removeMember(0);
    setParticipate(false);
    setJoinState({
      loading: false,
      joined: false,
    });
  };

  if (userDetails && userDetails.id === user_id) return null;

  if (!joinState.loading && !joinState.joined) {
    return (
      <Button size="sm" onClick={joinEvent} className="">
        <AiTwotoneStar className="text-xl text-white mr-2" />
        <span className="text-white">Join Event</span>
      </Button>
    );
  }

  if (joinState.loading && !joinState.joined) {
    return (
      <Button disabled size="sm" className="">
        <AiOutlineLoading3Quarters className="text-xl text-white mr-2 animate-spin" />
        <span className="text-white">Join Event</span>
      </Button>
    );
  }

  if (joinState.joined && !joinState.loading) {
    return (
      <Button onClick={outEvent} size="sm" className="">
        <AiOutlineCheck className="text-xl text-white mr-2" />
        <span className="text-white">Joined Event</span>
      </Button>
    );
  }

  if (joinState.joined && joinState.loading) {
    return (
      <Button disabled size="sm" className="">
        <AiOutlineLoading3Quarters className="text-xl text-white mr-2 animate-spin" />
        <span className="text-white">Joined Event</span>
      </Button>
    );
  }
};

export default JoinEventButton;
