"use client";

import { useApplyInformationModal } from "@/hooks/useApplyInformationModa";
import Modal from "../modals/Modal";
import Image from "next/image";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
import { FaClockRotateLeft, FaUser } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { FaGlobeAfrica } from "react-icons/fa";
import { MdAlternateEmail, MdSignalWifiStatusbar3Bar } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { FaDiscord } from "react-icons/fa";
import { useKeenSlider } from "keen-slider/react";
import { PiPencilCircleBold } from "react-icons/pi";
import { FaTrophy } from "react-icons/fa";
import { BsFillAlarmFill } from "react-icons/bs";
import { RiInformationFill } from "react-icons/ri";
import ViewLarge from "../viewLarge";
dayjs.extend(localizedFormat);

const ViewApplyInformationModal = () => {
  const { data, isOpen, onClose } = useApplyInformationModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const [ref] = useKeenSlider<HTMLDivElement>({
    mode: "free",
    slides: {
      perView: "auto",
      spacing: 30,
    },
  });

  const imageSlider = useKeenSlider<HTMLDivElement>({
    mode: "free",
    slides: {
      perView: "auto",
      spacing: 30,
    },
  });

  if (!data) return null;

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[900px] max-h-[900px] bg-background pt-10 pb-12 pl-9 pr-0 !rounded-2xl remove-button"
    >
      <div className="flex flex-col gap-y-4 pl-2 pr-4 overflow-auto h-[812px]">
        <div className="flex justify-between">
          <div className="flex">
            <Image
              src={data.profiles.avatar!}
              alt="image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-12 h-12 rounded-full mr-3"
            />
            <div className="super font-bold text-lg">{data.profiles.name}</div>
          </div>
        </div>
        <div className="font-bold my-4 text-2xl text-teal-500">
          Submit Information
        </div>
        <div className="flex gap-y-6 flex-wrap">
          <div className="flex items-center w-1/2">
            <FaClockRotateLeft className="text-xl text-yellow-500 mr-6" />
            {<div>{dayjs(data.created_at).format("LLLL")}</div>}
          </div>
          <div className="flex items-center w-1/2">
            <FaUserAlt className="text-xl text-rose-400 mr-6" />
            {<div>{data.first_name + " " + data.last_name}</div>}
          </div>
          <div className="flex items-center w-1/2">
            <FaGlobeAfrica className="text-xl text-blue-400 mr-6" />
            {<div>{data.country}</div>}
          </div>
          <div className="flex items-center w-1/2">
            <MdSignalWifiStatusbar3Bar className="text-xl  text-orange-400 mr-6" />
            {
              <div className="line-clamp-1 capitalize max-w-[70%]">
                {data.is_accepted}{" "}
              </div>
            }
          </div>
          <div className="flex items-center mt-2">
            <PiPencilCircleBold className="text-2xl text-green-400 mr-6" />
            {<div className="max-w-[90%]">{data.description} </div>}
          </div>
        </div>
        <div className="font-bold my-4 text-2xl text-teal-500">
          Social Links
        </div>
        <div className="flex gap-y-6 flex-wrap">
          <div className="flex items-center w-1/2">
            <MdAlternateEmail className="text-xl text-yellow-400 mr-6" />
            {<div>{data.contact_email}</div>}
          </div>
          {data.social_links.discord && (
            <div className="flex items-center">
              <FaDiscord className="text-xl text-indigo-400 mr-6" />
              {
                <a
                  target="_blank"
                  href={data.social_links.discord}
                  className="hover:underline"
                >
                  {data.social_links.discord}
                </a>
              }
            </div>
          )}
          {data.social_links.facebook && (
            <div className="flex items-center">
              <FaFacebook className="text-xl text-blue-600 mr-6" />
              {
                <a
                  target="_blank"
                  href={data.social_links.facebook}
                  className="hover:underline"
                >
                  {data.social_links.facebook}
                </a>
              }
            </div>
          )}
          {data.social_links.youtube && (
            <div className="flex items-center">
              <IoLogoYoutube className="text-xl text-red-400 mr-6" />
              {
                <a
                  target="_blank"
                  href={data.social_links.youtube}
                  className="hover:underline"
                >
                  {data.social_links.youtube}
                </a>
              }
            </div>
          )}
        </div>
        <div className="font-bold mt-4 my-2 text-2xl text-teal-500">
          Game Experience
        </div>
        <div className="flex flex-col gap-y-6">
          {data.game_role_and_characters &&
            data.game_role_and_characters.length > 0 && (
              <div className="flex items-center">
                <FaTrophy className="text-xl text-green-400 mr-6" />
                <div className="">
                  <span className="font-bold mr-2">Characters and Role : </span>
                  <span>
                    {data.game_role_and_characters?.reduce(
                      (acc, prev, index) => {
                        if (index === 0) {
                          return prev;
                        }
                        return acc + ", " + prev;
                      }
                    )}
                  </span>
                </div>
              </div>
            )}
          <div ref={ref} className="keen-slider pt-1">
            {data.coach_games.map((game, index) => (
              <div
                key={index}
                className="keen-slider__slide center overflow-hidden rounded-xl !min-w-[250px] !max-w-[250px] h-[300px]"
              >
                <div
                  className="absolute z-0 w-full h-full bg-image"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)), url(${game.data.image})`,
                  }}
                ></div>
                <div className="z-10 relative w-full p-4 center flex-col">
                  <div className="font-bold text-center text-blue-300 line-clamp-2 text-xl">
                    {game.data.shortName || game.data.name}
                  </div>
                  {game.ingameName && (
                    <div className="mt-4 flex gap-x-4 items-center">
                      <FaUser className="text-base text-yellow-400" />
                      <div className="text-yellow-400 text-lg">
                        #{game.ingameName}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="font-bold mt-4 my-2 text-2xl text-teal-500">
          Support Information
        </div>
        <div className="flex flex-col gap-y-6">
          <div className="flex items-center">
            <BsFillAlarmFill className="text-xl text-orange-400 mr-6" />
            <span>Can coach {data.coach_time}</span>
          </div>
          {data.support_information && (
            <div className="flex items-center">
              <RiInformationFill className="text-2xl text-blue-400 mr-6" />
              <div className="flex-1 whitespace-pre-line">
                {data.support_information}
              </div>
            </div>
          )}
        </div>
        {data.support_images && data.support_images.length > 0 && (
          <>
            <div className="font-bold mt-4 my-2 text-2xl text-teal-500">
              Upload Images
            </div>
            <div
              ref={imageSlider[0]}
              className="keen-slider min-h-[200px] mt-0 pt-0"
            >
              {data.support_images.map((image, index) => (
                <ViewLarge
                  key={index}
                  alt="image"
                  className="object-center keen-slider__slide center !max-w-[300px] object-cover !w-[300px] !h-[200px] rounded-xl"
                  src={image}
                ></ViewLarge>
              ))}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ViewApplyInformationModal;
