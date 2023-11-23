"use client";

import { useUser } from "@/hooks/useUser";
import { BadgeEuroIcon } from "lucide-react";
import Image from "next/image";

export default function MatchingRoomBody() {
  const { userDetails } = useUser();
  return (
    <section className="w-full px-10 py-4 gap-x-8 flex justify-center ">
      <div
        className=" h-[500px] max-w-[200px] w-full relative  "
        
      > 
        <div style={{ backgroundColor: "rgba(0,0,0,0.5)" }} className="h-[500px] max-w-[200px]  w-full room-user"></div>
        <div className="absolute top-0 -left-2 flex flex-col room-user h-[450px] mt-10 bg-primary w-full max-w-[200px]">
          <div className="flex room-user  ">
            <div className="bg-primary w-6 h-[400px] relative ">
              <span className=" rotate-90 absolute w-fit h-fit top-24 -left-12 font-bold ">
                MinhMatMong
              </span>
            </div>
            <div className="w-full overflow-hidden h-[400px]">
              <Image
                src={"/images/login-bg.png"}
                width={0}
                height={0}
                alt="ava"
                sizes="100vw"
                className="h-full w-auto object-cover"
              />
            </div>
          </div>
          <div className="w-full h-">
            <BadgeEuroIcon className=""/>
          </div>
        </div>
      </div>
      <div
        className=" h-[500px] max-w-[200px] w-full relative  "
        
      > 
        <div style={{ backgroundColor: "rgba(0,0,0,0.5)" }} className="h-[500px] max-w-[200px]  w-full room-user"></div>
        <div className="absolute top-0 -left-2 flex flex-col room-user h-[450px] mt-10 bg-primary w-full max-w-[200px]">
          <div className="flex room-user  ">
            <div className="bg-primary w-6 h-[400px] relative ">
              <span className=" rotate-90 absolute w-fit h-fit top-24 -left-12 font-bold ">
                MinhMatMong
              </span>
            </div>
            <div className="w-full overflow-hidden h-[400px]">
              <Image
                src={"/images/login-bg.png"}
                width={0}
                height={0}
                alt="ava"
                sizes="100vw"
                className="h-full w-auto object-cover"
              />
            </div>
          </div>
          <div className="w-full h-">
            <BadgeEuroIcon className=""/>
          </div>
        </div>
      </div>
      <div
        className=" h-[500px] max-w-[200px] w-full relative  "
        
      > 
        <div style={{ backgroundColor: "rgba(0,0,0,0.5)" }} className="h-[500px] max-w-[200px]  w-full room-user"></div>
        <div className="absolute top-0 -left-2 flex flex-col room-user h-[450px] mt-10 bg-primary w-full max-w-[200px]">
          <div className="flex room-user  ">
            <div className="bg-primary w-6 h-[400px] relative ">
              <span className=" rotate-90 absolute w-fit h-fit top-24 -left-12 font-bold ">
                MinhMatMong
              </span>
            </div>
            <div className="w-full overflow-hidden h-[400px]">
              <Image
                src={"/images/login-bg.png"}
                width={0}
                height={0}
                alt="ava"
                sizes="100vw"
                className="h-full w-auto object-cover"
              />
            </div>
          </div>
          <div className="w-full h-">
            <BadgeEuroIcon className=""/>
          </div>
        </div>
      </div>
      <div
        className=" h-[500px] max-w-[200px] w-full relative  "
        
      > 
        <div style={{ backgroundColor: "rgba(0,0,0,0.5)" }} className="h-[500px] max-w-[200px]  w-full room-user"></div>
        <div className="absolute top-0 -left-2 flex flex-col room-user h-[450px] mt-10 bg-primary w-full max-w-[200px]">
          <div className="flex room-user  ">
            <div className="bg-primary w-6 h-[400px] relative ">
              <span className=" rotate-90 absolute w-fit h-fit top-24 -left-12 font-bold ">
                MinhMatMong
              </span>
            </div>
            <div className="w-full overflow-hidden h-[400px]">
              <Image
                src={"/images/login-bg.png"}
                width={0}
                height={0}
                alt="ava"
                sizes="100vw"
                className="h-full w-auto object-cover"
              />
            </div>
          </div>
          <div className="w-full h-">
            <BadgeEuroIcon className=""/>
          </div>
        </div>
      </div>
      <div
        className=" h-[500px] max-w-[200px] w-full relative  "
        
      > 
        <div style={{ backgroundColor: "rgba(0,0,0,0.5)" }} className="h-[500px] max-w-[200px]  w-full room-user"></div>
        <div className="absolute top-0 -left-2 flex flex-col room-user h-[450px] mt-10 bg-primary w-full max-w-[200px]">
          <div className="flex room-user  ">
            <div className="bg-primary w-6 h-[400px] relative ">
              <span className=" rotate-90 absolute w-fit h-fit top-24 -left-12 font-bold ">
                MinhMatMong
              </span>
            </div>
            <div className="w-full overflow-hidden h-[400px]">
              <Image
                src={"/images/login-bg.png"}
                width={0}
                height={0}
                alt="ava"
                sizes="100vw"
                className="h-full w-auto object-cover"
              />
            </div>
          </div>
          <div className="w-full h-">
            <BadgeEuroIcon className=""/>
          </div>
        </div>
      </div>
      {/* <div
        className=" h-[500px] max-w-[200px] w-full relative  "
        
      > 
        <div style={{ backgroundColor: "rgba(0,0,0,0.5)" }} className="h-[500px] max-w-[200px]  w-full room-user"></div>
        <div className="absolute top-0 -left-2 flex flex-col room-user h-[450px] mt-10 bg-primary w-full max-w-[200px]">
          <div className="flex room-user  ">
            <div className="bg-primary w-6 h-[400px] relative ">
              <span className=" rotate-90 absolute w-fit h-fit top-24 -left-12 font-bold ">
                MinhMatMong
              </span>
            </div>
            <div className="w-full overflow-hidden h-[400px]">
              <Image
                src={"/images/login-bg.png"}
                width={0}
                height={0}
                alt="ava"
                sizes="100vw"
                className="h-full w-auto object-cover"
              />
            </div>
          </div>
          <div className="w-full h-">
            <BadgeEuroIcon className=""/>
          </div>
        </div>
      </div>
      <div
        className=" h-[500px] max-w-[200px] w-full relative  "
        
      > 
        <div style={{ backgroundColor: "rgba(0,0,0,0.5)" }} className="h-[500px] max-w-[200px]  w-full room-user"></div>
        <div className="absolute top-0 -left-2 flex flex-col room-user h-[450px] mt-10 bg-primary w-full max-w-[200px]">
          <div className="flex room-user  ">
            <div className="bg-primary w-6 h-[400px] relative ">
              <span className=" rotate-90 absolute w-fit h-fit top-24 -left-12 font-bold ">
                MinhMatMong
              </span>
            </div>
            <div className="w-full overflow-hidden h-[400px]">
              <Image
                src={"/images/login-bg.png"}
                width={0}
                height={0}
                alt="ava"
                sizes="100vw"
                className="h-full w-auto object-cover"
              />
            </div>
          </div>
          <div className="w-full h-">
            <BadgeEuroIcon className=""/>
          </div>
        </div>
      </div>
      <div
        className=" h-[500px] max-w-[200px] w-full relative  "
        
      > 
        <div style={{ backgroundColor: "rgba(0,0,0,0.5)" }} className="h-[500px] max-w-[200px]  w-full room-user"></div>
        <div className="absolute top-0 -left-2 flex flex-col room-user h-[450px] mt-10 bg-primary w-full max-w-[200px]">
          <div className="flex room-user  ">
            <div className="bg-primary w-6 h-[400px] relative ">
              <span className=" rotate-90 absolute w-fit h-fit top-24 -left-12 font-bold ">
                MinhMatMong
              </span>
            </div>
            <div className="w-full overflow-hidden h-[400px]">
              <Image
                src={"/images/login-bg.png"}
                width={0}
                height={0}
                alt="ava"
                sizes="100vw"
                className="h-full w-auto object-cover"
              />
            </div>
          </div>
          <div className="w-full h-">
            <BadgeEuroIcon className=""/>
          </div>
        </div>
      </div>
      <div
        className=" h-[500px] max-w-[200px] w-full relative  "
        
      > 
        <div style={{ backgroundColor: "rgba(0,0,0,0.5)" }} className="h-[500px] max-w-[200px]  w-full room-user"></div>
        <div className="absolute top-0 -left-2 flex flex-col room-user h-[450px] mt-10 bg-primary w-full max-w-[200px]">
          <div className="flex room-user  ">
            <div className="bg-primary w-6 h-[400px] relative ">
              <span className=" rotate-90 absolute w-fit h-fit top-24 -left-12 font-bold ">
                MinhMatMong
              </span>
            </div>
            <div className="w-full overflow-hidden h-[400px]">
              <Image
                src={"/images/login-bg.png"}
                width={0}
                height={0}
                alt="ava"
                sizes="100vw"
                className="h-full w-auto object-cover"
              />
            </div>
          </div>
          <div className="w-full h-">
            <BadgeEuroIcon className=""/>
          </div>
        </div>
      </div>
      <div
        className=" h-[500px] max-w-[200px] w-full relative  "
        
      > 
        <div style={{ backgroundColor: "rgba(0,0,0,0.5)" }} className="h-[500px] max-w-[200px]  w-full room-user"></div>
        <div className="absolute top-0 -left-2 flex flex-col room-user h-[450px] mt-10 bg-primary w-full max-w-[200px]">
          <div className="flex room-user  ">
            <div className="bg-primary w-6 h-[400px] relative ">
              <span className=" rotate-90 absolute w-fit h-fit top-24 -left-12 font-bold ">
                MinhMatMong
              </span>
            </div>
            <div className="w-full overflow-hidden h-[400px]">
              <Image
                src={"/images/login-bg.png"}
                width={0}
                height={0}
                alt="ava"
                sizes="100vw"
                className="h-full w-auto object-cover"
              />
            </div>
          </div>
          <div className="w-full h-">
            <BadgeEuroIcon className=""/>
          </div>
        </div>
      </div> */}
    </section>
  );
}
