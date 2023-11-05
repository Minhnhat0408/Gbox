import useMessageBox from "@/hooks/useMessageBox";
import { useUser } from "@/hooks/useUser";
import { MessageType } from "@/types/supabaseTableType";
import { useSessionContext } from "@supabase/auth-helpers-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
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

export default function MessageDetails() {
  const { currentMessage, isLoading, setIsLoading, newMsgLoading } =
    useMessageBox((set) => set);
  const { supabaseClient } = useSessionContext();
  const { user, userDetails } = useUser();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const lastPart = useRef<HTMLDivElement>(null);
  const chat = useRef<HTMLDivElement>(null);
  const [scrollBot, setScrollBot] = useState(false);
  const { isTyping, sendTypingEvent, setRoomName, payload } =
    useTypingIndicator({
      userAva: userDetails?.avatar ? userDetails.avatar : "/images/avatar.png",
    });
  useEffect(() => {
    if (currentMessage) {
      let newRoom = userDetails!.name + currentMessage.name;
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
            .order("created_at", { ascending: true });
          if (error) {
            toast.error(error.message);
          }
          if (data) {
            setMessages(data);
          }
          setIsLoading(false);
        }
      })();

      const channel = supabaseClient
        .channel(`realtime messages`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `sender_id=in.(${user?.id},${currentMessage?.id})`,
          },
          async (payload) => {
            if (
              payload.new.receiver_id === user?.id ||
              payload.new.receiver_id === currentMessage?.id
            ) {
              if (payload.new.sender_id === user?.id) {
                setScrollBot(true);
              }
              setMessages((prev) => [...prev, payload.new as MessageType]);
            }
          }
        )
        .subscribe();
      return () => {
        supabaseClient.removeChannel(channel);
      };
    }
  }, [currentMessage]);
  useEffect(() => {
    if (chat.current) {
      chat.current.scrollTop = chat.current.scrollHeight;
      setScrollBot(false);
    }
  }, [messages]); //ned fix`
  return (
    <div className="w-[620px]  pt-10 px-4 flex flex-col">
      {!isLoading ? (
        currentMessage ? (
          <>
            <div className="flex gap-4 py-4 w-full border-b-2">
              <div className=" flex flex-1">
                <Image
                  src={currentMessage.avatar || "/images/avatar.png"}
                  alt="image"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="rounded-full h-[60px] w-[60px] object-cover border-2 border-primary"
                />
                <div className="h-full flex items-center ml-2">
                  {currentMessage.name}{" "}
                </div>
              </div>

              <div className="flex items-center px-4">
                <div className="flex items-center">
                  <IoCall
                    className="w-[40px] h-[40px] hover:bg-primary rounded-full p-2"
                    size="30"
                  />
                  <BsThreeDots className="w-[40px] h-[40px] ml-6 hover:bg-primary rounded-full p-2" />
                </div>
              </div>
            </div>

            <div
              id="Chat"
              ref={chat}
              className="mt-6 gap-y-1  flex-1    flex flex-col scrollbar overflow-y-scroll"
            >
              {messages.map((message) => {
                return (
                  <MessageItem
                    key={message.id}
                    sender={message.sender_id === user?.id}
                    {...message}
                  />
                );
              })}
              {newMsgLoading && <MessageLoading />}

              <div ref={lastPart} className="relative w-full">
                <div
                  className={cn(
                    "hidden",
                    isTyping &&
                      "flex absolute items-center justify-center h-fit rounded-2xl bottom-0 left-1/2 -translate-x-1/2  animate-pulse  bg-primary  px-3 py-1  w-fit"
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
                  <span> is typing...</span>
                </div>{" "}
              </div>
            </div>
            <div className="flex py-6 h-fit justify-end ">
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
