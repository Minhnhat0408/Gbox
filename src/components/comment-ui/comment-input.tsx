"use client";

import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { LuSwords } from "react-icons/lu";
import {
  FaPaperPlane,
  FaRegFaceGrinBeam,
  FaShieldHalved,
  FaXmark,
} from "react-icons/fa6";
import TextareaAutosize from "react-textarea-autosize";
import { BsImages } from "react-icons/bs";
import { cn } from "@/lib/utils";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";
import dynamic from "next/dynamic";
import { useSessionContext } from "@supabase/auth-helpers-react";
import uniqid from "uniqid";
import uuid from "react-uuid";
import { toast } from "sonner";
import usePostDetailsModal from "@/hooks/usePostDetailsModal";
import { shallow } from "zustand/shallow";
import { EmojiStyle } from "emoji-picker-react";
import useCommentsControl from "@/hooks/useCommentsControl";
import { CommentType } from "@/types/supabaseTableType";
const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);
export default function CommentInput({ replyId }: { replyId?: string }) {
  const { userDetails, user } = useUser();
  const [text, setText] = useState<string>("");
  const [img, setImg] = useState<{ url: string; file: File }>();
  const [displayEmoji, setDisplayEmoji] = useState(false);
  const [status, setStatus] = useState<"up" | "down">("up");
  const { supabaseClient } = useSessionContext();
  const { postId } = usePostDetailsModal((set) => set, shallow);
  const { setIsLoading, setComments, comments, setScroll } = useCommentsControl(
    (set) => set
  );
  const reset = () => {
    setText("");
    setImg(undefined);
    setStatus("up");
  };
  async function handleOnEnter() {
    let uploadedImgURL = { url: "", type: "" };
    const cmtId = uuid();
    reset();
    setIsLoading(true);
    if (!replyId) {
      setScroll(true);
    }
    if (img) {
      const fileType = img.file.type.split("/")[0];
      const imgId = uniqid();

      const { data, error } = await supabaseClient.storage
        .from("comments")
        .upload(`${userDetails?.name || user?.id}/${cmtId}/${imgId}`, img.file);

      if (error) {
        toast.error(error.message, {
          duration: 3000,
        });
        return;
      }
      const { data: imageURL } = supabaseClient.storage
        .from("comments")
        .getPublicUrl(data.path);
      uploadedImgURL.url = imageURL.publicUrl;
      uploadedImgURL.type = fileType;
    }

    if (text !== "" || img) {
      const { data, error } = await supabaseClient.from("comments").insert({
        id: cmtId,
        user_id: user?.id,
        post_id: postId,
        reply_comment_id: replyId, //father comment Id
        media: uploadedImgURL.url !== "" ? uploadedImgURL : null,
        text: text !== "" ? text : null,
        type: status,
      });
      if (error) {
        toast.error(error.message, {
          duration: 3000,
        });
        return;
      }
      if (data) {
        setText("");
        setImg(undefined);
        setStatus("up");
        toast.success("Commented", {
          duration: 3000,
        });
      }
    }
    setIsLoading(false);

    setComments([
      ...comments,

      {
        id: cmtId,
        text: text !== "" ? text : null,
        media: { url: img?.url, type: img?.file.type.split("/")[0] },
        type: status,
        user_id: user?.id,
        post_id: postId,
        created_at: new Date().toISOString(),
        modified_at: new Date().toISOString(),
        reply_comment_id: replyId,
        reactions: [],
        profiles: {
          name: userDetails?.name,
          avatar: userDetails?.avatar,
          location: userDetails?.location,
        },
      } as CommentType,
    ]);
  }
  const handlePreviewImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImg({ url: URL.createObjectURL(file), file });
    }
  };
  return (
    <div className="   w-full bg-[#00453F] px-6   border-[2px] border-primary rounded-3xl relative ">
      <div className="rounded-3xl w-full   py-2 flex border-0    items-center">
        <Image
          src={userDetails?.avatar || "/image 1.png"}
          width={0}
          height={0}
          sizes="100vw"
          alt="ava"
          className="w-10 h-10 rounded-full border-[2px] border-primary"
        />
        <TextareaAutosize
          value={text}
          minRows={1}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleOnEnter();
            }
          }}
          wrap="on"
          onPaste={(e) => {
            const file = e.clipboardData.files[0];
            if (file && file.type && file.type.includes("image")) {
              setImg({ url: URL.createObjectURL(file), file });
            }
          }}
          onChange={(e) => setText(e.target.value)}
          maxRows={3}
          placeholder="Type a comment..."
          className="w-full h-10 bg-[#00453F] !border-0 border-transparent focus-visible:ring-0 rounded-3xl ml-4 text-white  focus-visible:outline-none placeholder:text-muted-foreground px-4"
        />

        <TooltipProvider delayDuration={500}>
          <Tooltip>
            <TooltipTrigger>
              <div
                onClick={() => {
                  setDisplayEmoji(!displayEmoji);
                }}
                className="text-muted-foreground w-12 h-full text-2xl flex items-center  cursor-pointer hover:text-primary  justify-center"
              >
                <FaRegFaceGrinBeam />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Upload Image</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {displayEmoji && (
          <div className="absolute w-fit -top-[460px] right-0">
            <Picker
              onEmojiClick={(e) => {
                setText(text + e.emoji);
                setDisplayEmoji(false);
              }}
              lazyLoadEmojis={false}
              searchPlaceHolder="Search emoji"
              emojiStyle={EmojiStyle.TWITTER}
              previewConfig={{
                showPreview: true,
                defaultEmoji: "1f92a",
                defaultCaption: "Your selected emoji",
              }}
              searchDisabled={false}
            />
          </div>
        )}

        <TooltipProvider delayDuration={500}>
          <Tooltip>
            <TooltipTrigger>
              <input
                id="img"
                name="img"
                onChange={handlePreviewImage}
                type="file"
                className="hidden"
              />
              <label
                htmlFor="img"
                className="text-muted-foreground w-12 h-full text-2xl flex items-center  cursor-pointer hover:text-primary  justify-center"
              >
                <BsImages />
              </label>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Upload Image</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={500}>
          <Tooltip>
            <TooltipTrigger>
              <div
                onClick={() => {
                  setStatus("up");
                }}
                className={cn(
                  "text-muted-foreground w-12 h-full text-2xl flex items-center  cursor-pointer hover:text-primary  justify-center",
                  status === "up" && "text-primary"
                )}
              >
                <LuSwords />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Win</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={500}>
          <Tooltip>
            <TooltipTrigger>
              <div
                onClick={() => {
                  setStatus("down");
                }}
                className={cn(
                  "text-muted-foreground w-12 h-full text-2xl flex items-center  cursor-pointer hover:text-red-400  justify-center",
                  status === "down" && "text-red-400"
                )}
              >
                <FaShieldHalved />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Lose</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {!replyId && (
          <TooltipProvider delayDuration={500}>
            <Tooltip>
              <TooltipTrigger>
                <div
                  onClick={() => {
                    handleOnEnter();
                  }}
                  className="text-primary w-12 h-full text-2xl cursor-pointer flex hover:scale-125 duration-500 items-center justify-center"
                >
                  <FaPaperPlane />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Post your comment</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      {img && (
        <div className="my-2 w-fit relative">
          <Image
            src={img.url}
            width={0}
            height={0}
            sizes="100vw"
            alt="ava"
            className="w-auto object-cover h-20 "
          />
          <div
            className="absolute -right-6 top-0 cursor-pointer "
            onClick={() => {
              setImg(undefined);
            }}
          >
            <FaXmark />
          </div>
        </div>
      )}
    </div>
  );
}
