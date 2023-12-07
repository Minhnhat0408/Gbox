"use client";
import Image from "next/image";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";
import { cn } from "@/lib/utils";
import TextareaAutosize from "react-textarea-autosize";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { BsImages } from "react-icons/bs";
import { FaFile, FaXmark } from "react-icons/fa6";
import { useSessionContext } from "@supabase/auth-helpers-react";
import useMessageBox from "@/hooks/useMessageBox";
import uniqid from "uniqid";
import { toast } from "sonner";
import { File } from "lucide-react";
import { EmojiPicker } from "../emoji-picker";



export default function MessageInput({
  typingIndicator,
}: {
  typingIndicator: () => void;
}) {
  const [text, setText] = useState("");
  const [file, setFile] = useState<{ url: string; file: File }[]>([]);

  const { userDetails } = useUser();
  const { currentMessage,setNewMsgLoading } = useMessageBox((set) => set);
  const { supabaseClient } = useSessionContext();

  const handlePreviewFile = (e: any) => {
    Array.prototype.forEach.call(e.target.files, (file: File) => {
      const type = file.type.split("/")[0];

      if (file && (type === "image" || type === "video" || type === "application")) {
        setFile((prev) => [...prev, { url: URL.createObjectURL(file), file }]);
      } 
   
    });

  };
  const handleUploadMessage = async () => {
    setNewMsgLoading(true);
    const uploadedMedia: { url: string; type: string }[] = [];
    const uploadedApplication: { name: string; url: string; type: string }[] =
      [];
    setText("");
    setFile([]);
    if (text) {
      await supabaseClient.from("messages").insert({
        content: text,
        sender_id: userDetails?.id,
        receiver_id: currentMessage?.id,
      });
    }
    if (file.length > 0) {
      await Promise.all(
        file.map(async (file) => {
          const fileType = file.file.type.split("/")[0];
          const fileId = uniqid();

          const { data, error } = await supabaseClient.storage
            .from("messages")
            .upload(
              `${userDetails?.name || userDetails?.id}/${
                currentMessage?.id
              }/${fileId}`,
              file.file
            );

          if (error) {
            toast.error(error.message, {
              duration: 3000,
            });
            return;
          }
          const { data: fileUrl } = supabaseClient.storage
            .from("messages")
            .getPublicUrl(data.path);
          if (fileType === "image" || fileType === "video") {
            uploadedMedia.push({ url: fileUrl.publicUrl, type: fileType });
          } else if (fileType === "application") {
            uploadedApplication.push({
              name: file.file.name,
              url: fileUrl.publicUrl,
              type: file.file.type.split("/")[1],
            });
          }
   
        })
      );

      if (uploadedMedia.length > 0) {
        await supabaseClient.from("messages").insert({
          media: uploadedMedia,
          sender_id: userDetails?.id,
          receiver_id: currentMessage?.id,
        });
      }

      if (uploadedApplication.length > 0) {
        uploadedApplication.forEach(async (file) => {
          await supabaseClient.from("messages").insert({
            application: file,
            sender_id: userDetails?.id,
            receiver_id: currentMessage?.id,
          });
        });
      }
    }

    setNewMsgLoading(false);
  };
  return (
    <div
      className={cn(
        "   w-full bg-[#00453F] px-6 duration-500 h-fit   border-[2px] border-primary rounded-3xl relative "
      )}
    >
      <div className="rounded-3xl w-full   py-2 flex border-0    items-center">
        <Image
          src={userDetails?.avatar || "/image 1.png"}
          width={0}
          height={0}
          sizes="100vw"
          alt="ava"
          className={cn(
            "w-10 h-10 rounded-full duration-500 border-[2px] border-primary",
            status === "down" && "border-red-400"
          )}
        />
        <TextareaAutosize
          value={text}
          autoFocus
          minRows={1}
          onKeyDown={(e) => {
            typingIndicator();
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleUploadMessage();
            }
          }}
          wrap="on"
          onPaste={(e) => {
            const file = e.clipboardData.files[0];
            if (file && file.type && file.type.includes("image")) {
              setFile((prev) => [
                ...prev,
                { url: URL.createObjectURL(file), file },
              ]);
            }
          }}
          onChange={(e) => setText(e.target.value)}
          maxRows={3}
          placeholder="Type a comment..."
          className="w-full h-10 bg-[#00453F] resize-none !border-0 border-transparent focus-visible:ring-0 rounded-3xl ml-4 text-white  focus-visible:outline-none placeholder:text-muted-foreground px-4"
        />

        <TooltipProvider delayDuration={500}>
          <Tooltip>
          <TooltipTrigger className={cn(
                  "text-muted-foreground w-12 h-full text-2xl flex items-center  cursor-pointer hover:text-primary  justify-center",
                  status === "down" && "hover:text-red-400"
                )}>
        
              <EmojiPicker
                onChange={(emoji: string) => {
                  // field.onChange(`${field.value} ${emoji}`)
                  setText(text + emoji);
                }}
              />
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Choose your emoji</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={500}>
          <Tooltip>
            <TooltipTrigger>
              <input
                id="img"
                name="img"
                multiple
                onChange={handlePreviewFile}
                type="file"
                className="hidden"
              />
              <label
                htmlFor="img"
                className={cn(
                  "text-muted-foreground w-12 h-full text-2xl flex items-center  cursor-pointer hover:text-primary  justify-center",
                  status === "down" && "hover:text-red-400"
                )}
              >
                <BsImages />
              </label>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Upload Image</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {file.length > 0 && (
        <div className="flex gap-x-5 overflow-x-scroll ">
          {file.map((obj, ind) => {
            if (obj.file.type.includes("image")) {
              return (
                <div key={ind} className="my-2  min-w-[80px] relative">
                  <Image
                    src={obj.url}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt="ava"
                    className=" object-cover h-20 w-auto "
                  />
                  <div
                    className="absolute -right-4 top-0 cursor-pointer "
                    onClick={() => {
                      setFile((prev) => prev.filter((_, i) => i !== ind));
                    }}
                  >
                    <FaXmark />
                  </div>
                </div>
              );
            } else if (obj.file.type.includes("video")) {
              return (
                <div key={ind} className="my-2 w-full min-w-[112px]  relative">
                  <video src={obj.url} className="object-cover h-20 w-28" />
                  <div
                    className="absolute -right-4 top-0 cursor-pointer "
                    onClick={() => {
                      setFile((prev) => prev.filter((_, i) => i !== ind));
                    }}
                  >
                    <FaXmark />
                  </div>
                </div>
              );
            }else if(obj.file.type.includes('application')){
              return (
                <div key={ind} className="my-2 min-w-[160px] w-40  relative">
                  <a href={obj.url} target="_blank" className="flex w-full  items-center card-container py-2 px-2  rounded-2xl h-fit  ">
                    <div className="text-xl "><FaFile/></div>
                    <span className="text-white ml-2 line-clamp-2 ">{obj.file.name}</span>
                  </a>
                  <div
                    className="absolute -right-4 top-0 cursor-pointer "
                    onClick={() => {
                      setFile((prev) => prev.filter((_, i) => i !== ind ));
                    }}
                  >
                    <FaXmark />
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}
