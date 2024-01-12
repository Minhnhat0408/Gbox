import { useUser } from "@/hooks/useUser";
import { MessageGroupType, MessageType } from "@/types/supabaseTableType";
import { useSessionContext } from "@supabase/auth-helpers-react";
import Image from "next/image";
import React, { use, useCallback, useEffect, useRef, useState } from "react";
import { BiDotsHorizontal, BiSolidImage } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { IoCall } from "react-icons/io5";
import { toast } from "sonner";
import MessageLoading from "../message-ui/message-loading";
import { useTypingIndicator } from "@/hooks/useTypingDictator";
import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import IsTyping from "../message-ui/is-typing-ui";
import dayjs from "dayjs";

import useFriendMessages from "@/hooks/useFriendMessages";
import { MdOutlineGroupAdd } from "react-icons/md";
import { useCreateGroupChatModal } from "@/hooks/useCreateGroupChatModal";
import GroupChatItem from "./group-chat-item";
import GroupChatInput from "./group-chat-input";
import useGroupChatBox from "@/hooks/useGroupChatBox";
import { useChatScroll } from "@/hooks/useChatScroll";
import { Loader2 } from "lucide-react";
import GroupChatWelcome from "./group-chat-welcome";
import useGroupChat from "@/hooks/useGroupChat";
import GroupChatOptions from "./group-chat-options";
import useGroupMembers from "@/hooks/useGroupMembers";

export default function GroupChatDetails() {
  const {
    currentGroup,
    isLoading,
    setIsLoading,
    newMsgLoading,
    setCurrentGroup,
    setUserUniqueLastMsg,
    userUniqueLastMsg,
    reloadSeen,
  } = useGroupChatBox((set) => set);
  const { members, setMembers, setCurrentMember, currentMember } =
    useGroupMembers();
  const {
    inComingMessage,
    setInComingMessage,
    setGroupChatHeads,
    groupChatHeads,
  } = useGroupChat();
  const { supabaseClient } = useSessionContext();
  const { user, userDetails } = useUser();
  const [messages, setMessages] = useState<MessageGroupType[]>([]);
  const chat = useRef<HTMLDivElement>(null);
  const currentDay = useRef<string>("");
  const currentUser = useRef<string>("");
  const latestTimeSeen = useRef<string>("0");
  const { isTyping, sendTypingEvent, setRoomName, payload } =
    useTypingIndicator({
      userAva: userDetails?.avatar ? userDetails.avatar : "/images/avatar.png",
    });
  const [isFetchingNextPage, setIsFetchingNextPage] = useState<boolean>(false);
  const [scrolBottom, setScrollBottom] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  const fetchMoreMessages = useCallback(async () => {
    if (!currentGroup) return;
    setIsFetchingNextPage(true);
    const { data, error } = await supabaseClient
      .from("messages")
      .select("*,profiles!messages_sender_id_fkey(avatar,name)")
      .eq("group_id", currentGroup.id)
      .order("created_at", { ascending: false })
      .range(messages.length, messages.length + 14);

    if (error) {
      console.error("Error fetching more messages:", error);
    }
    if (data) {
      if (data?.length < 15) setHasMore(false);
      setMessages((prev) => [...prev, ...data]);
      for (let i = 0; i < data.length; i++) {
        if (data[i].group_seen.length > 0) {
          // add all the id that not yet in the group_seen to the usersUnique

          for (let j = 0; j < data[i].group_seen.length; j++) {
            if (!(data[i].group_seen[j] in userUniqueLastMsg)) {
              userUniqueLastMsg[data[i].group_seen[j]] = data[i].id;
            }
          }
        }
        if (Object.keys(userUniqueLastMsg).length === members?.length) {
          break;
        }
      }
      setUserUniqueLastMsg(userUniqueLastMsg);
      reloadSeen();
    }

    setIsFetchingNextPage(false);
  }, [members, currentGroup, messages, userUniqueLastMsg]);

  useChatScroll({
    chatRef: chat,
    bottomRef,
    loadMore: fetchMoreMessages,
    shouldLoadMore: !isFetchingNextPage && hasMore,
  });
  useEffect(() => {
    if (!currentGroup) return;

    setRoomName(currentGroup.id);

    (async () => {
      if (user) {
        setIsLoading(true);

        const { data, error } = await supabaseClient
          .from("messages")
          .select("*,profiles!messages_sender_id_fkey(avatar,name,id)")
          .eq("group_id", currentGroup.id)
          .order("created_at", { ascending: false })
          .range(0, 14);
        const { data: groupMembers, error: groupMembersError } =
          await supabaseClient
            .from("group_users")
            .select("*, profiles(name,avatar)")
            .eq("group_id", currentGroup.id);

        if (groupMembersError) {
          toast.error(groupMembersError.message);
        }
        if (groupMembers) {
          //set the currentMemer
          const tmp = groupMembers.filter(
            (item) => item.user_id === user?.id
          )[0];
          inComingMessage[currentGroup.id] = 0;

          const { data: groupSeen, error } = await supabaseClient
            .from("messages")
            .select("id,group_seen")
            .eq("group_id", currentGroup.id)
            .not("group_seen", "cs", `{"${user?.id}"}`);

          if (error || !groupSeen) {
            toast.error(error.message);
          } else {
            //update the group_seen to include the current user
            await Promise.all(
              groupSeen.map((item) => {
                return supabaseClient
                  .from("messages")
                  .update({
                    group_seen: [...item.group_seen, user?.id],
                  })
                  .eq("id", item.id);
              })
            );
          }

          setCurrentMember(tmp);
          setMembers(groupMembers);
        }
        if (error) {
          toast.error(error.message);
        }
        if (data) {
          if (data.length < 15) setHasMore(false);

          for (let i = 0; i < data.length; i++) {
            if (data[i].group_seen.length > 0) {
              // add all the id that not yet in the group_seen to the usersUnique

              for (let j = 0; j < data[i].group_seen.length; j++) {
                if (!(data[i].group_seen[j] in userUniqueLastMsg)) {
                  userUniqueLastMsg[data[i].group_seen[j]] = data[i].id;
                }
              }
            }
            if (
              Object.keys(userUniqueLastMsg).length === groupMembers?.length
            ) {
              break;
            }
          }
          setUserUniqueLastMsg(userUniqueLastMsg);
          reloadSeen();
          setMessages(data);
        }

        setIsLoading(false);
      }
    })();

    return () => {
      inComingMessage[currentGroup.id] = 0;
      setInComingMessage(inComingMessage);
    };
  }, [currentGroup]);

  useEffect(() => {
    if (!currentGroup) return;
    const channel = supabaseClient
      .channel(`realtime group`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `group_id=eq.${currentGroup.id}`,
        },
        async (payload) => {
          if (payload.eventType === "INSERT") {
            if (payload.new.group_id === currentGroup.id) {
              if (payload.new.sender_id !== user?.id) {
                //update the group_user to include the current user
                await supabaseClient
                  .from("messages")
                  .update({
                    group_seen: [...payload.new.group_seen, user?.id],
                  })
                  .eq("id", payload.new.id);
              }
              reloadSeen();
              const newMsg = {
                ...payload.new,
                profiles:
                  members.filter(
                    (item) => item.user_id === payload.new.sender_id
                  ).length > 0
                    ? members.filter(
                        (item) => item.user_id === payload.new.sender_id
                      )[0].profiles
                    : undefined,
              };

              setMessages((prev) => [newMsg as MessageGroupType, ...prev]);
              setScrollBottom(0);
            }
          } else if (payload.eventType === "UPDATE") {
            if (
              payload.new.group_id === currentGroup?.id &&
              payload.new.sender_id === user?.id
            ) {
              const current = new Date(payload.new.created_at);
              const latest = new Date(latestTimeSeen.current);

              if (current > latest) {
                latestTimeSeen.current = payload.new.created_at;

                //update the userUniqueLastMsg
                for (let i = 0; i < payload.new.group_seen.length; i++) {
                  userUniqueLastMsg[payload.new.group_seen[i]] = payload.new.id;
                }
                setUserUniqueLastMsg(userUniqueLastMsg);
                reloadSeen();
                setMessages((prev) => {
                  return prev.map((item) => {
                    if (item.id === payload.new.id) {
                      return {
                        ...item,
                        group_seen: payload.new.group_seen,
                      };
                    }
                    return item;
                  });
                });
              }
            }
          }
        }
      )
      .subscribe();
    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [currentGroup, members, userUniqueLastMsg]);

  useEffect(() => {
    if (!currentGroup) return;
    const channel = supabaseClient
      .channel(`realtime group users`)
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "group_users",
        },
        async (payload) => {
          const { data: groupMembers, error: groupMembersError } =
            await supabaseClient
              .from("group_users")
              .select("*, profiles(name,avatar)")
              .eq("group_id", currentGroup.id);
          if (groupMembers) {
            //set the currentMemer
            const tmp = groupMembers.filter(
              (item) => item.user_id === user?.id
            )[0];

            if (tmp) {
              setCurrentMember(tmp);
              setMembers(groupMembers);
            } else {
              setCurrentMember(undefined);
              setCurrentGroup(undefined);
              //filter the gropu out of groupchatheads
              const newGroupChatHeads = groupChatHeads.filter(
                (item) => item.id !== currentGroup.id
              );
              setGroupChatHeads(newGroupChatHeads);

              setMembers([]);
            }
          } else {
            setCurrentMember(undefined);
            setCurrentGroup(undefined);
            //filter the gropu out of groupchatheads
            const newGroupChatHeads = groupChatHeads.filter(
              (item) => item.id !== currentGroup.id
            );
            setGroupChatHeads(newGroupChatHeads);

            setMembers([]);
          }
        }
      )
      .subscribe();
    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [currentGroup]);
  useEffect(() => {
    if (chat.current && scrolBottom < 2) {
      chat.current.scrollTop = chat.current.scrollHeight;
      setScrollBottom((prev) => prev + 1);
    }
  }, [currentGroup, scrolBottom, messages]); //ned fix`'

  useEffect(() => {
    setScrollBottom(0);
  }, [currentGroup]);
  return (
    <div className="w-[620px]  pt-10 px-4 flex flex-col">
      {!isLoading ? (
        currentGroup ? (
          <>
            <div className="flex gap-4 py-4 w-full border-b-2">
              <div className=" flex flex-1">
                <Image
                  src={currentGroup.image || "/images/avatar.png"}
                  alt="image"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="rounded-full h-[60px] w-[60px] object-cover border-2 border-primary"
                />
                <div className="h-full flex flex-col ml-2 justify-center">
                  <span className="text-xl font-bold">
                    {currentGroup.name}{" "}
                  </span>
                  <span className="text-muted-foreground text-sm italic">
                    is created by {currentGroup.creator_name}
                  </span>
                </div>
              </div>

              <div className="flex items-center px-4">
                <div className="flex items-center gap-x-5">
                  <IoCall
                    className="w-[40px] h-[40px] hover:bg-primary cursor-pointer rounded-full p-2"
                    size="24"
                    onClick={() => {
                      window.open(
                        `${process.env.NEXT_PUBLIC_SITE_URL}/call?senderID=${userDetails?.id}&groupID=${currentGroup.id}`,
                        "CallWindow",
                        "width=1240,height=860"
                      );
                    }}
                  />
                  <GroupChatOptions />
                </div>
              </div>
            </div>

            <div
              ref={chat}
              className="mt-6 flex-1  h-full  flex flex-col scrollbar overflow-y-auto"
            >
              {!hasMore && <GroupChatWelcome />}
              {hasMore && (
                <div className="flex justify-center">
                  {isFetchingNextPage ? (
                    <Loader2 className="h-6 w-6 text-primary animate-spin my-4" />
                  ) : (
                    <button
                      onClick={() => fetchMoreMessages()}
                      className="text-primary  text-xs my-4 transition"
                    >
                      Load previous messages
                    </button>
                  )}
                </div>
              )}
              <div className="flex flex-col-reverse gap-y-1 ">
                {newMsgLoading && <MessageLoading />}
                {messages.map((message, ind) => {
                  let tmp = dayjs(message.created_at).format(
                    "ddd, MMM D, YYYY"
                  );
                  let consecutive = true;
                  if (ind === 0) {
                    currentDay.current = tmp;
                    currentUser.current = "";
                  }

                  if (currentUser.current !== message.sender_id) {
                    currentUser.current = message.sender_id || "";
                    consecutive = false;
                  }
                  //create a list of user that seen this message from the userUniqueLastMsg

                  if (tmp !== currentDay.current) {
                    let prev = currentDay.current;
                    currentDay.current = tmp;
                    return (
                      <GroupChatItem
                        key={message.id}
                        sender={message.sender_id === user?.id}
                        groupLastSeen={userUniqueLastMsg}
                        isNewDay={prev}
                        consecutive={consecutive}
                        {...message}
                      />
                    );
                  } else {
                    return (
                      <GroupChatItem
                        key={message.id}
                        sender={message.sender_id === user?.id}
                        {...message}
                        consecutive={consecutive}
                        groupLastSeen={userUniqueLastMsg}
                      />
                    );
                  }
                })}

                <div ref={bottomRef} />
              </div>
            </div>
            <div className="flex py-6  h-fit justify-end relative ">
              <div
                className={cn(
                  "hidden",
                  isTyping &&
                    "flex absolute items-center justify-center h-fit rounded-2xl -top-9 left-1/2 -translate-x-1/2   bg-primary  px-2 py-[2px]   w-fit"
                )}
              >
                <Image
                  src={payload?.userAva || "/image 1.png"}
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt="ava"
                  className="w-8 h-8 object-cover bg-center border-2 border-primary rounded-full mr-1"
                />
                <IsTyping />
              </div>
              <GroupChatInput typingIndicator={sendTypingEvent} />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <Image
              src={"/images/logo.png"}
              width={0}
              height={0}
              sizes="100vw"
              alt="ava"
              className="w-40 h-40 "
            />
            <p className="text-2xl text-primary">
              Select a chat to start messaging
            </p>
          </div>
        )
      ) : (
        <div className="flex-1 h-full w-full flex justify-center items-center ">
          <div className="text-3xl animate-spin">
            <AiOutlineLoading3Quarters />
          </div>
        </div>
      )}
    </div>
  );
}
