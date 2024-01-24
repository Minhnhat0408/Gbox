import useMessageBox from "@/hooks/useMessageBox";
import { useUser } from "@/hooks/useUser";
import { MessageType } from "@/types/supabaseTableType";
import { useSessionContext } from "@supabase/auth-helpers-react";
import Image from "next/image";
import React, { use, useEffect, useRef, useState } from "react";
import { BiDotsHorizontal, BiSolidImage } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { IoCall } from "react-icons/io5";
import MessageItem from "./message-item";
import MessageInput from "./message-input";
import { toast } from "sonner";
import MessageLoading from "./message-loading";
import { useTypingIndicator } from "@/hooks/useTypingDictator";
import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import IsTyping from "./is-typing-ui";
import dayjs from "dayjs";
import MessageOptions from "./message-options";
import useFriendMessages from "@/hooks/useFriendMessages";
import { MdOutlineGroupAdd } from "react-icons/md";
import { useCreateGroupChatModal } from "@/hooks/useCreateGroupChatModal";
import MessageWelcome from "./message-welcome";
import { useChatScroll } from "@/hooks/useChatScroll";
import { Loader2 } from "lucide-react";

export default function MessageDetails() {
  const { currentMessage, isLoading, setIsLoading, newMsgLoading } =
    useMessageBox((set) => set);
  const { inComingMessage, setInComingMessage } = useFriendMessages(
    (set) => set
  );
  const { supabaseClient } = useSessionContext();
  const { user, userDetails } = useUser();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const chat = useRef<HTMLDivElement>(null);
  const currentDay = useRef<string | undefined>();
  const [isFetchingNextPage, setIsFetchingNextPage] = useState<boolean>(false);
  const [scrolBottom, setScrollBottom] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [lastSeen, setLastSeen] = useState<string>(
    "December 17, 1000   03:24:00"
  );
  const latestTimeSeen = useRef<string>("0");
  const { isTyping, sendTypingEvent, setRoomName, payload } =
    useTypingIndicator({
      userAva: userDetails?.avatar ? userDetails.avatar : "/images/avatar.png",
    });
  const { onOpen: openCreateGroup } = useCreateGroupChatModal((set) => set);

  const bottomRef = useRef<HTMLDivElement>(null);
  const fetchMoreMessages = async () => {
    if (!currentMessage) return;
    setIsFetchingNextPage(true);
    const { data, error } = await supabaseClient
      .from("messages")
      .select("*")
      .or(`sender_id.eq.${user?.id},receiver_id.eq.${user?.id}`)
      .or(
        `sender_id.eq.${currentMessage.id},receiver_id.eq.${currentMessage.id}`
      )

      .order("created_at", { ascending: false })
      .range(messages.length, messages.length + 14);

    if (error) {
      console.error("Error fetching more messages:", error);
    }
    if (data) {
      if (data?.length < 15) setHasMore(false);
      setMessages((prev) => [...prev, ...data]);
    }

    setIsFetchingNextPage(false);
  };
  useChatScroll({
    chatRef: chat,
    bottomRef,
    loadMore: fetchMoreMessages,
    shouldLoadMore: !isFetchingNextPage && hasMore,
  });
  useEffect(() => {
    if (!currentMessage) return;

    let newRoom = userDetails!.name! + currentMessage.name;
    newRoom = newRoom.split("").sort().join("");
    setRoomName(newRoom);

    (async () => {
      if (user) {
        setIsLoading(true);

        const { data, error } = await supabaseClient
          .from("messages")
          .select("*")
          .or(`sender_id.eq.${user?.id},receiver_id.eq.${user?.id}`)
          .or(
            `sender_id.eq.${currentMessage.id},receiver_id.eq.${currentMessage.id}`
          )
          .order("created_at", { ascending: false })
          .range(0, 14);
        if (error) {
          toast.error(error.message);
        }

        if (data) {
          if (data.length < 15) setHasMore(false);
          const tmp = [...data];
          inComingMessage[currentMessage.id] = 0;
          await Promise.all(
            tmp
              .filter((item) => !item.is_seen && item.receiver_id === user?.id)
              .map((item) => {
                return supabaseClient
                  .from("messages")
                  .update({ is_seen: true })
                  .eq("id", item.id);
              })
          );

          for (let i = 0; i < data.length; i++) {
            if (data[i].is_seen && data[i].sender_id === user?.id) {
              setLastSeen(data[i].id);
              break;
            }
          }
          setMessages(data);
        }
        setIsLoading(false);
      }
    })();

    return () => {
      inComingMessage[currentMessage.id] = 0;
      setInComingMessage(inComingMessage);
    };
  }, [currentMessage]);

  useEffect(() => {
    if (!currentMessage) return;
    const channel = supabaseClient
      .channel(`realtime messages`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `sender_id=in.(${user?.id},${currentMessage.id})`,
        },
        async (payload) => {
          if (
            payload.new.receiver_id === user?.id ||
            payload.new.receiver_id === currentMessage.id
          ) {
            if (payload.new.receiver_id === user?.id) {
              await supabaseClient
                .from("messages")
                .update({ is_seen: true })
                .eq("id", payload.new.id);
              setLastSeen(payload.new.id);
            }
            setMessages((prev) => [payload.new as MessageType, ...prev]);
            setScrollBottom(0);
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "messages",
          filter: `sender_id=in.(${user?.id},${currentMessage?.id})`,
        },
        (payload) => {
          if (payload.new.receiver_id === currentMessage?.id) {
            const current = new Date(payload.new.created_at);
            const latest = new Date(latestTimeSeen.current);

            if (current > latest) {
              latestTimeSeen.current = payload.new.created_at;
              setLastSeen(payload.new.id);
            }
          }
        }
      )
      .subscribe();
    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [currentMessage]);

  useEffect(() => {
    if (chat.current && scrolBottom < 2) {
      chat.current.scrollTop = chat.current.scrollHeight;
      setScrollBottom((prev) => prev + 1);
    }
  }, [currentMessage, scrolBottom, messages]); //ned fix`'

  useEffect(() => {
    setScrollBottom(0);
  }, [currentMessage]);

  return (
    <div className="w-[620px]  pt-10 px-4 flex flex-col">
      {!isLoading ? (
        currentMessage ? (
          <>
            <div className="flex gap-4 py-4 w-full border-b-2">
              <div className=" flex flex-1 gap-x-2">
                <Image
                  src={currentMessage.avatar || "/images/avatar.png"}
                  alt="image"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="rounded-full h-[60px] w-[60px] object-cover border-2 border-primary"
                />
                <div className="h-full flex flex-col ml-2 justify-center">
                  <span className="text-xl font-bold">
                    {currentMessage.name}{" "}
                  </span>
                  <span className="text-muted-foreground text-sm italic">
                    {currentMessage.location}
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
                        `${process.env.NEXT_PUBLIC_SITE_URL}/call?senderID=${userDetails?.id}&receiverID=${currentMessage.id}`,
                        "CallWindow",
                        "width=1240,height=860"
                      );
                    }}
                  />
                  <div
                    onClick={() => {
                      openCreateGroup(currentMessage.id);
                    }}
                    className="w-[40px] h-[40px] hover:bg-primary cursor-pointer rounded-full p-2 text-2xl flex justify-center items-center "
                  >
                    <MdOutlineGroupAdd />
                  </div>
                  <MessageOptions />
                </div>
              </div>
            </div>

            <div
              id="Chat"
              ref={chat}
              className="mt-6  flex-1  h-full  flex flex-col scrollbar overflow-y-auto"
            >
              {!hasMore && <MessageWelcome />}
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
                  if (ind === 0) {
                    currentDay.current = tmp;
                  }

                  if (tmp !== currentDay.current) {
                    let prev = currentDay.current;
                    currentDay.current = tmp;
                    return (
                      <MessageItem
                        key={message.id}
                        sender={message.sender_id === user?.id}
                        isLastSeen={
                          message?.last_seen ? currentMessage.avatar : undefined
                        }
                        isNewDay={prev}
                        {...message}
                      />
                    );
                  } else {
                    return (
                      <MessageItem
                        key={message.id}
                        sender={message.sender_id === user?.id}
                        {...message}
                        isLastSeen={
                          lastSeen === message.id
                            ? currentMessage?.avatar
                            : undefined
                        }
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
              <MessageInput typingIndicator={sendTypingEvent} />
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
