"use client";
import { useRef, useState } from "react";
import NewsItem from "./news-item";
import { cn } from "@/lib/utils";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const data = [
  {
    src: "/images/login-bg.png",
    title: "League of Legends",
  },
  {
    src: "/images/login-bg.png",
    title: "League of Legends",
  },
  {
    src: "/images/login-bg.png",
    title: "League of Legends",
  },
  {
    src: "/images/login-bg.png",
    title: "League of Legends",
  },
  {
    src: "/images/login-bg.png",
    title: "League of Legends",
  },
  {
    src: "/images/login-bg.png",
    title: "League of Legends",
  },
];
export default function NewsList() {
  const TRANSX = 240;// 1 item = 240px
  let currentIndex = useRef(0);// index hiện tại của news
  const [transX, setTransX] = useState(0);

  const handleClickRight = function () {
    // Tính toán vị trí mới của news list
    const newTransX = transX - TRANSX;
    // Tăng currentIndex lên 1
    currentIndex.current += 1;
    setTransX(newTransX);
  };

  const handleClickLeft = function () {
    // Tính toán vị trí mới của news list
    const newTransX = transX + TRANSX;
    currentIndex.current -= 1;
    setTransX(newTransX);
  };
  return (
    <section className="w-full relative flex  pl-10 mb-10  scrollbar clip-end">
      {transX !== 0 && (
        <div
          className={cn(
            "absolute top-0 bottom-0 w-16 flex justify-center items-center left-2 z-20 rounded-s-3xl cursor-pointer text-3xl text-primary gradient-l opacity-0 hover:opacity-100 transition-opacity duration-500 "
          )}
          onClick={handleClickLeft}
        >
          <IoIosArrowBack />
        </div>
      )}
      <div style={{ transform: `translateX(${transX}px)` }} className="w-full duration-500 gap-x-8 flex">
        {data.map((item, ind) => {
          return (
            <NewsItem
              key={ind}
              src={item.src}
              href="/"
              title={item.title}
              first={ind === currentIndex.current}
              last= {ind === currentIndex.current + 3}
            />
          );
        })}
      </div>
        {
          currentIndex.current !== data.length - 3 && ( <div
            className={cn(
              "absolute top-0 bottom-0  w-16 right-0 z-20  cursor-pointer text-primary text-3xl flex justify-center items-center duration-500 "
            )}
            onClick={handleClickRight}
          >
            <IoIosArrowForward />
          </div>)
        }
     
    </section>
  );
}
