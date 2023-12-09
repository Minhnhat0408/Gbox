"use client";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import { AppointmentType } from "@/types/supabaseTableType";
import CountDown2 from "../box-count/CountDownBox";

dayjs.extend(localizedFormat);

const CountDownAppointMent = ({ data }: { data: AppointmentType }) => {
  return (
    <div className="w-full p-20 h-full center">
      <div className="flex items-center flex-col gap-y-10">
        <h1 className="super font-bold text-5xl mb-4">
          {"IT'S NOT TIME YET "}
          <span className="text-white">🥲</span>
        </h1>
        <div className="text-4xl font-bold">
          Please wait until your session start{" "}
        </div>
        <CountDown2 date={data.appointment_time} />
      </div>
    </div>
  );
};

export default CountDownAppointMent;
