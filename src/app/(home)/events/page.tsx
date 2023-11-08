import EventLists from "@/components/event-lists/EventLists";
import CreateEventButton from "@/components/events/CreateEventButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function Events() {
  return (
    <div className="px-8 bg-center bg-cover bg-no-repeat 2xl:my-10 my-7 w-full h-full !mt-[72px] relative">
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/syndra.jpg)`,
        }}
        className="bg-center bg-cover w-full h-[calc(100vh-122px)] flex justify-between rounded-2xl mt-4 pl-20 pr-20 py-32"
      >
        <article>
          <h1 className="super text-7xl mb-16 font-bold tracking-wide">
            Events
          </h1>
          <div className="flex leading-relaxed">
            <section className="space-y-4 h-[120px] flex flex-col justify-between max-w-[250px]">
              <div>Joining community play-party events and make friends</div>
              <a href="#event-lists" className="inline-block w-full">
                <Button className="shine hover:bg-[##89f7fe] bg-[#00d9f5] w-full">
                  Browse Events
                </Button>
              </a>
            </section>
            <div className="border-primary mx-10 border-r border-solid"></div>
            <section className="space-y-4 h-[120px] flex flex-col justify-between max-w-[250px]">
              <div>Or create your own events and invinte people!</div>
              <CreateEventButton />
            </section>
          </div>
        </article>
        <Image
          src={"/images/logo.png"}
          width={0}
          height={0}
          sizes="100vw"
          className="animate w-44 h-44 mt-10"
          alt="logo"
        />
      </div>
      <EventLists />
    </div>
  );
}

export const fetchCache = "force-no-store";

export default Events;
