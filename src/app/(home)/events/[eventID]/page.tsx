import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AiFillHome, AiOutlineUser } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoGameController } from "react-icons/io5";

type EventProps = {
  params: {
    eventID: string;
  };
};

const EventPage = ({ params }: EventProps) => {
  const { eventID } = params;

  return (
    <main className="px-8 2xl:my-10 my-7 flex w-full h-full !mt-[72px]">
      <section
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/syndra.jpg)`,
        }}
        className="bg-center pt-12 rich-screen:pt-20 relative bg-cover w-full h-[calc(100vh-140px)] rounded-2xl mt-4 py-4 px-12"
      >
        <div className="flex w-full h-[calc(100%-150px)]">
          <article className="w-3/5 flex flex-col justify-center">
            <h1 className="font-bold text-5xl max-w-[90%] super line-clamp-2">
              Flex rank saturday
            </h1>
            <h3 className="my-6 max-w-[90%] line-clamp-5">
              Esse occaecat mollit aute ad nisi nostrud incididunt anim ut est
              cillum. Cillum minim consectetur tempor tempor commodo enim
              excepteur ullamco anim do cillum cupidatat incididunt. Consectetur
              quis labore nisi sint officia qui sint voluptate ipsum enim mollit
              ipsum qui Lorem. Consequat sint amet cupidatat qui enim et aliqua
              elit officia id duis proident ipsum labore. Mollit officia nulla
              ea incididunt esse nisi do mollit nostrud officia consectetur ut
              eiusmod. Et laboris id sint eiusmod occaecat excepteur.
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <AiFillHome className="text-3xl mr-6 text-emerald-300" />
                <p className="text-xl">
                  is hosted by{" "}
                  <Link
                    href="/user/thanhdung0207"
                    className="underline super font-bold"
                  >
                    ThanhDung
                  </Link>
                </p>
              </div>
              <div className="flex items-center">
                <IoGameController className="text-2xl mr-6 text-emerald-300" />
                <p className="text-xl">League of Legends</p>
              </div>
              <div className="flex items-center">
                <BsFillPeopleFill className="text-2xl mr-6 text-emerald-300" />
                <p className="text-xl">10 people</p>
              </div>
            </div>
          </article>
          <div className="w-2/5 flex justify-end items-center h-full">
            <div
              className="bg-cover bg-center border-4 border-solid border-green-400 bg-no-repeat rounded-lg w-[260px] h-[330px]"
              style={{
                backgroundImage: `url(/avatar_game.jpg)`,
              }}
            ></div>
          </div>
        </div>
        <div className="flex w-full h-[150px] items-center justify-center space-x-16">
          <div className="font-bold flex flex-col space-y-2 items-center">
            <span className="text-3xl super">12</span>
            <span className="text-base font-normal">days</span>
          </div>
          <div className="font-bold flex flex-col space-y-2 items-center">
            <span className="text-3xl super">8</span>
            <span className="text-base font-normal">hours</span>
          </div>
          <div className="font-bold flex flex-col space-y-2 items-center">
            <span className="text-3xl super">56</span>
            <span className="text-base font-normal">minutes</span>
          </div>
          <div className="font-bold flex flex-col space-y-2 items-center">
            <span className="text-3xl super">12</span>
            <span className="text-base font-normal">seconds</span>
          </div>
        </div>
        <div className="absolute right-0 left-0 w-full -bottom-5 flex justify-center items-center">
          <Button className="shine text-white" size="lg">
            More Information
          </Button>
        </div>
      </section>
    </main>
  );
};

export default EventPage;
