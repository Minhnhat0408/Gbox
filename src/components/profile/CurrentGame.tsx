import Image from "next/image";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { FaCheckCircle, FaStopCircle, FaPauseCircle } from "react-icons/fa";
import { PiCirclesThreeFill } from "react-icons/pi";
import { RiMenu5Fill } from "react-icons/ri";

export default function CurrentGame({ data }: { data: any }) {
  const calBgcolor = (stt: string) => {
    if (stt === "play") {
      return "#0b97ac";
    } else if (stt === "beat") {
      return "#7faa36";
    } else if (stt === "pause") {
      return "#e38523";
    } else if (stt === "backlog") {
      return "#174787";
    } else if (stt === "quit") {
      return "#f65f58";
    } else if (stt === "wishlist") {
      return "#42495b";
    }
  };

  return (
    <div className="flex space-x-8 mt-2 overflow-x-auto scroll-smooth [&>div]:flex-shrink-0 w-full min-h-[290px] max-h-[310px] rounded-lg">
      {data.map((currentgame: any, index: number) => {
        if (index <= 9) {
          return (
            <div className="mb-2 w-[150px]" key={index}>
              <Link
                href={"https://ign.com" + currentgame.game_meta_data.url}
                target="_blank"
              >
                <div id="Image" className="relative">
                  <Image
                    src={currentgame.game_meta_data.image}
                    alt=""
                    width={300}
                    height={400}
                    className="rounded-lg w-[150px] h-[200px] object-cover object-center"
                  />
                  <div
                    className="absolute bottom-2 right-2 flex px-2 py-1 rounded-lg text-[13px]"
                    style={{ backgroundColor: calBgcolor(currentgame.status) }}
                  >
                    <p className="flex items-center justify-center mr-1 text-center">
                      {currentgame.status}
                    </p>
                    {currentgame.status === "pause" ? (
                      <FaPauseCircle size="25" />
                    ) : null}
                    {currentgame.status === "beat" ? (
                      <FaCheckCircle size="25" />
                    ) : null}
                    {currentgame.status === "play" ? (
                      <PiCirclesThreeFill size="25" className="rotate-90" />
                    ) : null}
                    {currentgame.status === "quit" ? (
                      <FaStopCircle size="25" />
                    ) : null}
                    {currentgame.status === "backlog" ? (
                      <RiMenu5Fill size="25" />
                    ) : null}
                    {currentgame.status === "wishlist" ? (
                      <AiFillStar size="25" />
                    ) : null}
                  </div>
                </div>

                <div className="text-left w-full h-7 mt-2 font-semibold text-[12px]">
                  <div className="line-clamp-2 text-base font-bold text-white">
                    {currentgame.game_meta_data.name}
                  </div>
                  <div className="line-clamp-2 text-gray-300 text-[13px] uppercase">
                    {currentgame.game_meta_data.producer}
                  </div>
                </div>
              </Link>
            </div>
          );
        }
      })}
    </div>
  );
}
