import useMessageBox from "@/hooks/useMessageBox";
import { useUser } from "@/hooks/useUser";
import { MessageType } from "@/types/supabaseTableType";
import { useSessionContext } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { NextRequest } from "next/server";
import React, { useEffect, useState } from "react";
import { BiSolidImage } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { IoCall } from "react-icons/io5";

export default function Message() {
  const { messageId } = useMessageBox((set) => set);
  const { supabaseClient } = useSessionContext();
  const { user } = useUser();
  const [messages, setMessages] = useState<MessageType[]>([]);
  
  useEffect(() => {
    (async () => {
      console.log(messageId, user?.id);
      if (user && messageId) {
        const { data, error } = await supabaseClient
          .from("messages")
          .select("*")
          // .or(`sender_id.eq(${user?.id}).and(receiver_id.eq(${messageId})),sender_id.eq(${messageId}).and(receiver_id.eq(${user?.id}))`)
          .eq("sender_id", user?.id)
          .eq("receiver_id", messageId)
          .order("created_at", { ascending: true })
        console.log(data);
        console.log(error);
      }
    })();
   
    const channel = supabaseClient
      .channel("realtime messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `receiver_id=eq.${user?.id}`,
        },
        async (payload) => {
          console.log(payload)
        }
      )
      .subscribe();
    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [messageId]);

  const handleSendMessage = async (req: NextRequest) => {
    const message =  req.nextUrl.searchParams.get("message");
    if (message) {
      const { data, error } = await supabaseClient
        .from("messages")
        .insert([
          {
            sender_id: user?.id,
            receiver_id: messageId,
            content: message,
          },
        ]);
      console.log(data);
    }
  }
  const handleDelete = async () => {
    // get id message
    const id = "";
    const { data, error } = await supabaseClient
      .from("messages")
      .delete()
      .eq("id", id);
  };

  return (
    <div className="w-[500px]">
      <div className="p-2 pr-6">
        <div className="flex gap-4 py-4 w-full border-b-2">
          <div className="w-[400px] flex">
            <Image
              src="https://inybkzznasdhmswsixhd.supabase.co/storage/v1/object/public/images/profile-91a4f96f-1c89-4907-910e-82a244e9d7fa-lno1fele"
              alt="image"
              width={1000}
              height={1000}
              className="rounded-full h-[60px] w-[60px]"
            />
            <div className="h-full flex items-center ml-2">Messiiiii</div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center">
              <IoCall
                className="w-[40px] h-[40px] hover:bg-[#333345] rounded-full p-2"
                size="30"
              />
              <BsThreeDots className="w-[40px] h-[40px] ml-6 hover:bg-[#333345] rounded-full p-2" />
            </div>
          </div>
        </div>
      </div>
      <div id="Time" className="text-sm w-full text-center mt-6 pl-2">
        09:56 PM
      </div>

      <div id="Chat" className="mt-6 space-y-6 h-[67vh] overflow-y-auto pl-2">
        <div
          id="Sender"
          className="max-w-[300px] bg-[#333345] p-4 rounded-tr-2xl rounded-bl-2xl flex float-left break-all"
        >
          Hello, Thank you for reaching out. I&lsquo;m currently unavailable as
          I&lsquo;m offline or away from my desk. Your message is important to
          me, and I will get back to you as soon as I&lsquo;m back online ˚ʚ♡ɞ˚
        </div>

        <div
          id="Receiver"
          className="max-w-[300px] mr-6 bg-[#333345] p-4 rounded-tl-2xl rounded-br-2xl flex float-right break-all mt-6"
        >
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </div>

        <div
          id="Sender"
          className="max-w-[300px] bg-[#333345] p-4 rounded-tr-2xl rounded-bl-2xl flex float-left break-all"
        >
          Hello, Thank you for reaching out. I&lsquo;m currently unavailable as
          I&lsquo;m offline or away from my desk. Your message is important to
          me, and I will get back to you as soon as I&lsquo;m back online ˚ʚ♡ɞ˚
        </div>

        <div
          id="Receiver"
          className="max-w-[300px] mr-6 bg-[#333345] p-4 rounded-tl-2xl rounded-br-2xl flex float-right break-all mt-6"
        >
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </div>

        <div
          id="Sender"
          className="max-w-[300px] bg-[#333345] p-4 rounded-tr-2xl rounded-bl-2xl flex float-left break-all"
        >
          Hello, Thank you for reaching out. I&lsquo;m currently unavailable as
          I&lsquo;m offline or away from my desk. Your message is important to
          me, and I will get back to you as soon as I&lsquo;m back online ˚ʚ♡ɞ˚
        </div>

        <div
          id="Receiver"
          className="max-w-[300px] mr-6 bg-[#333345] p-4 rounded-tl-2xl rounded-br-2xl flex float-right break-all mt-6"
        >
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </div>

        <div
          id="Sender"
          className="max-w-[300px] bg-[#333345] p-4 rounded-tr-2xl rounded-bl-2xl flex float-left break-all"
        >
          Hello, Thank you for reaching out. I&lsquo;m currently unavailable as
          I&lsquo;m offline or away from my desk. Your message is important to
          me, and I will get back to you as soon as I&lsquo;m back online ˚ʚ♡ɞ˚
        </div>

        <div
          id="Receiver"
          className="max-w-[300px] mr-6 bg-[#333345] p-4 rounded-tl-2xl rounded-br-2xl flex float-right break-all mt-6"
        >
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </div>
      </div>

      <div
        id="Send"
        className="absolute bottom-4 w-[476px] pl-2 flex items-center"
      >
        <input type="file" hidden id="file" />
        <label htmlFor="file" className="mr-4 cursor-pointer">
          <BiSolidImage size="25" color="#004741" />
        </label>
        <input
          type="text"
          className="outline-none bg-[#333345] py-2 px-6 rounded-full w-full"
          placeholder="Aa"
        />
      </div>
    </div>
  );
}
