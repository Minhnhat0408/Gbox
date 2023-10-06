"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import ComboboxLoadData, {
  useComboboxLoadData,
} from "@/components/ui/comboboxLoadData";
import Popup, { PopupControl, usePopupControl } from "@/components/ui/popup";
import { pagingGame } from "@/services/client/rawgClientService";
import { GameSearchDetail } from "@/types/gameSearchType";
import style from "./postForm.module.css";
import {
  useSessionContext,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, useFieldArray } from "react-hook-form";
import { BsImageFill } from "react-icons/bs";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Schema } from "zod";
interface PostFormProps {
  formControl: PopupControl;
}

interface FormValues {
  title: string;
  content: string;
  game: string;
}

// tạo schema để validate
const schema = yup
  .object({
    title: yup.string().required(),
    content: yup.string().required(),
    game: yup.string().required(),
  })
  .required();

async function getCurrentGamedata(
  page: number,
  textSearch: string
): Promise<Array<GameSearchDetail>> {
  const result = await pagingGame(textSearch, page, 10);
  return result.data;
}

function getCurrentTime(): string {
  let currentTime = new Date();
  let hours = `${currentTime.getHours()}`;
  let minutes = `${currentTime.getMinutes()}`;
  let seconds = `${currentTime.getSeconds()}`;
  // Để đảm bảo rằng giờ, phút và giây luôn hiển thị dưới dạng hai chữ số
  hours = (Number.parseInt(hours) < 10 ? "0" : "") + hours;
  minutes = (Number.parseInt(minutes) < 10 ? "0" : "") + minutes;
  seconds = (Number.parseInt(seconds) < 10 ? "0" : "") + seconds;

  var timeString = hours + ":" + minutes + ":" + seconds;
  return timeString;
}

const PostForm = React.forwardRef<HTMLAudioElement, PostFormProps>(
  ({ formControl }, ref) => {
    const comboboxLoadGameData = useComboboxLoadData(
      "id",
      "name",
      getCurrentGamedata
    );

    const user = useUser();
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [currentTime, setCurrentTime] = useState<string>(getCurrentTime());

    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm<FormValues>({ resolver: yupResolver(schema) });

    useLayoutEffect(() => {
      const timeInterval = setInterval(() => {
        setCurrentTime(getCurrentTime());
      }, 1000);
      return () => clearInterval(timeInterval);
    }, []);

    useEffect(() => {
      setValue("game", comboboxLoadGameData.value);
    }, [comboboxLoadGameData.value]);

    async function onSubmit(data: FormValues) {
      console.log(data);
      console.log(errors);
    }

    return (
      <div className="bg-[#242526]">
        <Popup title="Create your post" popupControl={formControl}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`w-[800px] max-h-[800px] overflow-y-auto border-t-1 border-[#666] p-5 bg-[#242526] ${style.form__content} ${style["custom-scrollbar"]}`}
          >
            <div className="flex items-center justify-start gap-x-5">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src={user?.user_metadata.avatar_url} alt="" />
              </div>
              <div className="flex flex-col items-start justify-start gap-y-1">
                <span>{user?.user_metadata.full_name}</span>
                <span>{currentTime ?? ""}</span>
              </div>
            </div>
            <div className="flex flex-col gap-y-4 mt-5 items-start">
              <div className="flex flex-col gap-y-2 items-start w-full">
                <Label htmlFor="form_post_title">Tiêu đề</Label>
                <Input
                  {...register("title")}
                  type="text"
                  id="form_post_title"
                  placeholder="Nhập tiêu đề"
                ></Input>
                <span className="text-red-500 text-sm">
                  {errors.title?.message}
                </span>
              </div>
              <div className="flex flex-col gap-y-2 items-start w-full">
                <Label htmlFor="form_post_content">Nội dung</Label>
                <Textarea
                  {...register("content")}
                  id="form_post_content"
                  placeholder="Nhập nội dung"
                  className="h-[80px] resize-none"
                ></Textarea>
                <span className="text-red-500 text-sm">
                  {errors.content?.message}
                </span>
              </div>
              <div className="flex flex-col gap-y-2 items-start w-full">
                <Label htmlFor="form_post_game">Game liên quan</Label>
                <ComboboxLoadData
                  comboboxControl={comboboxLoadGameData}
                ></ComboboxLoadData>
                <span className="text-red-500 text-sm">
                  {errors.game?.message}
                </span>
              </div>
              <div className="inline-flex items-center justify-start gap-x-2 cursor-pointer">
                <div className="w-6 h-6">
                  <BsImageFill className="w-full h-full"></BsImageFill>
                </div>
                <div>Image/video</div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full font-semibold mt-5 text-white"
            >
              Đăng
            </Button>
          </form>
        </Popup>
      </div>
    );
  }
);

PostForm.displayName = "PostForm";

export default PostForm;
