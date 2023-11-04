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
    total_people,
    setParticipate,
    isHost,
    loading,
    setLoading,
    rules,
    start_date,
    user_id,
    event_name,
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

    const addToEvent = supabaseClient.from("event_participations").insert({
      participation_id: userDetails.id,
      event_id: id,
    });

    const checkNotification = supabaseClient
      .from("notifications")
      .select("*")
      .eq("notification_type", "event_notify")
      .eq("link_to", `/events/${id}`);

    const [addToEventRes, checkNotificationRes] = await Promise.all([
      addToEvent,
      checkNotification,
    ]);

    if (addToEventRes.error) {
      setLoading(false);
      setParticipate(false);
      return toast.error(addToEventRes.error.message);
    }

    if (checkNotificationRes.error) {
      return toast.error(checkNotificationRes.error.message);
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

    // id of the event will have format of yourID-eventID-event_notify
    // how event notify will work
    // 1. when user hit join button, check if how many notification have made with the link_to = event/eventID
    // 2. Check the amount of notification relate to the eventID
    // 3a. - If there is no notification, create a individual notification for that user
    //     - Notification = user has join your "event_name" event
    // 3b. - If there is >= 5 notification, create a group notification for that user
    //     - Notification = user and total_participations other people has join your "event_name" event
    // if user spam the join button, it will only create 1 notification
    if (checkNotificationRes.data.length < 5) {
      // check if user already in the notification with the id
      const isInNotification = checkNotificationRes.data.find(
        (item) => item.sender_id === userDetails.id
      );

      if (isInNotification) {
        const { data, error } = await supabaseClient
          .from("notifications")
          .upsert({
            id: `${userDetails?.id}-${id}-event_notify`,
            created_at: new Date(),
          });

        if (error) {
          console.log("Error update notification: ", error.message);
        }
        return;
      }

      const { data, error } = await supabaseClient
        .from("notifications")
        .insert({
          id: `${userDetails?.id}-${id}-event_notify`,
          created_at: new Date(),
          content: `${userDetails.name} jas joined your "${event_name}" event`,
          sender_id: userDetails?.id,
          receiver_id: user_id,
          link_to: `/events/${id}`,
          notification_type: "event_notify",
          notification_meta_data: {
            event_id: id,
            sender_avatar: userDetails?.avatar,
            sender_name: userDetails?.name,
          },
        });

      if (error) {
        console.log("Error create notification: ", error.message);
      }
    } else {
      const { data, error } = await supabaseClient
        .from("notifications")
        .upsert({
          id: `${user_id}-${id}-event_group_notify`,
          created_at: new Date(),
          content: `${userDetails.name} and other ${totalMember.length} people has joined your "${event_name}" event`,
          sender_id: userDetails?.id,
          link_to: `/events/${id}`,
          notification_type: "event_notify",
          notification_meta_data: {
            event_id: id,
            sender_avatar: userDetails?.avatar,
            sender_name: userDetails?.name,
          },
        });
    }
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
