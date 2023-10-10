"use client";
import { useEffect, useRef, useState } from "react";
import NewsItem from "./news-item";
import { cn } from "@/lib/utils";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GameNewsData } from "@/types/ign/GameNewsType";
import { getAllNews } from "@/services/client/ignClientService";
import { useDimensions } from "@/hooks/useDimensions";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import NewsLoading from "./news-loading";

export default function NewsList() {
  // 1 item = 240px
  let currentIndex = useRef(0); // index hiện tại của news
  const [transX, setTransX] = useState(0);
  const [news, setNews] = useState<GameNewsData[]>([]);
  const ref = useRef(null);
  const currentNews = useRef(10);
  const { width, height } = useDimensions(ref);
  let distance = useRef(width + 32);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    distance.current = width + 32;
  }, [width]);
  const handleClickRight = async function () {
    // Tính toán vị trí mới của news list
    const newTransX = transX - distance.current;
    // Tăng currentIndex lên 1
    currentIndex.current += 1;
    if (currentIndex.current === news.length - 3) {
      setLoading(true);
      currentNews.current += 10;
      const { data, status } = await getAllNews(currentNews.current, 10);
      if (status === 200) {
        setNews([...news, ...data]);
        setLoading(false);
      }
    }

    setTransX(newTransX);
  };

  const handleClickLeft = function () {
    // Tính toán vị trí mới của news list
    const newTransX = transX + distance.current;
    currentIndex.current -= 1;
    setTransX(newTransX);
  };

  useEffect(() => {
    const fetchNews = async () => {
      const { data, status } = await getAllNews(currentNews.current, 10);
      if (status === 200) {
        setNews(data);
        console.log(data)
      }
    };
    fetchNews();
  }, []);

  return (
    <section className="w-full relative flex  pl-10 mb-10   scrollbar clip-end ">
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
      <div
        style={{ transform: `translateX(${transX}px)` }}
        className="w-full duration-500 gap-x-8 flex"
      >
        {news.length > 0 ? (
          news.map((item, ind) => {
            let url = item.url
            if(!url.includes('https://www.ign.com')) {
              url = 'https://www.ign.com' + url
            }

            return (
              <NewsItem
                ref={ind === currentIndex.current ? ref : null}
                key={ind}
                src={item.feedImage.url}
                href={url}
                title={item.title}
                first={ind === currentIndex.current}
                // last={ind === currentIndex.current + 3}
              />
            );
          })
        ) : (
          <>
            <NewsLoading first />
            <NewsLoading />
            <NewsLoading />
            <NewsLoading />
          </>
        )}
      </div>

      <div
        className={cn(
          "absolute top-0 bottom-0 gradient-r  w-16 right-0 z-20  cursor-pointer text-primary text-3xl flex justify-center items-center duration-500 "
        )}
        onClick={() => {
          if (!loading) {
            handleClickRight();
          }
        }}
      >
        {loading ? (
          <div className="text-3xl animate-spin">
            <AiOutlineLoading3Quarters />
          </div>
        ) : (
          <IoIosArrowForward />
        )}
      </div>
    </section>
  );
}
