import { Button } from "@/components/ui/button";
import Image from "next/image";

function Events() {
  return (
    <div className="px-8 bg-center bg-cover bg-no-repeat 2xl:my-10 my-7 flex w-full h-full !mt-[72px] relative">
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/wallpaper.jpg)`,
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
              <Button className="shine hover:bg-[##89f7fe] bg-[#00d9f5]">
                Browse Events
              </Button>
            </section>
            <div className="border-primary mx-10 border-r border-solid"></div>
            <section className="space-y-4 h-[120px] flex flex-col justify-between max-w-[250px]">
              <div>Or create your own events and invinte people!</div>
              <Button className="shine hover:bg-[#0cebeb] bg-[#29ffc6]">
                Create Events
              </Button>
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
    </div>
  );
}

export default Events;
