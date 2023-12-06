import { ActionTooltip } from "@/components/action-tooltips/ActionToolTips";
import { DetailedAppointmentType } from "@/types/supabaseTableType";
import { Database } from "@/types/supabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FaInfoCircle } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import { TiWarning } from "react-icons/ti";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Link from "next/link";
import ViewMoreButton from "@/components/appointment-page/ViewMoreButton";
import AppointmentInformationModal from "@/components/appointment-page/AppointmentInformationModal";

dayjs.extend(relativeTime);

const dayJSLocalize = dayjs;

dayJSLocalize.extend(localizedFormat);

const AppointmentPage = async () => {
  const supabaseClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  // select if current user is coach or student
  const { data, error } = (await supabaseClient
    .from("appointment")
    .select(
      `*, 
      coach_data:profiles!appointment_coach_profile_id_fkey(*),
      student_data:profiles!appointment_student_id_fkey(*),
      course_session(*)
    `
    )
    .or(
      `coach_profile_id.eq.${user?.id},student_id.eq.${user?.id}`
    )) as unknown as {
    data: DetailedAppointmentType[];
    error: any;
  };

  if (error) {
    console.log(error);
    return redirect("/");
  }

  // TODO: create room when session is accepted

  return (
    <div className="mx-8 !pt-[72px] pb-20 px-14">
      <h1 className="super font-bold mt-8 text-3xl">Session Appointment</h1>
      <div className="mt-10 mb-5 flex items-start">
        <span>
          <FaInfoCircle className="text-2xl mr-5 text-green-400" />
        </span>
        All your session appointment with your coach or with your student will
        be shown here.
      </div>
      <div className="mt-8 mb-5 flex items-start">
        <span>
          <TiWarning className="text-2xl mr-5 text-red-500" />
        </span>
        <span>
          You have to follow refund policy if you want to cancel the session or
          reschedule as a coach or a student
        </span>
        <ActionTooltip
          className="bg-layout"
          label={
            <div className="text-xs text-left leading-[140%] tracking-0.01 pt-1 pb-2 pr-1">
              <h1 className="super font-medium mb-3">Cancelation policy</h1>
              <ul className="max-w-[15.75rem] space-y-2">
                <li className="flex space-x-2">
                  <div className="h-1 w-1 shrink-0 bg-green-400 rounded-full mt-[0.4rem]"></div>
                  <p className="text-ondark-primary">
                    Cancel or reschedule your session for free up to 24 hours
                    ahead of the start time.
                  </p>
                </li>
                <li className="flex space-x-2">
                  <div className="h-1 w-1 shrink-0 bg-green-400 rounded-full mt-[0.4rem]"></div>
                  <p className="text-ondark-primary">
                    50% of the lesson price is applied as a fee to reschedule or
                    cancel a session within 24 hours of the start time.
                  </p>
                </li>
              </ul>
            </div>
          }
          side="top"
        >
          <div className="center w-[19px] ml-4 h-[19px] bg-white rounded-full">
            <IoMdInformationCircle className="w-[20px] h-[20px] text-rose-400 cursor-pointer" />
          </div>
        </ActionTooltip>
      </div>
      {data.length > 0 ? (
        <div className="flex flex-col gap-y-5 px-4 mt-16">
          <AppointmentInformationModal />
          <Table>
            <TableCaption>
              Showing your {data.length} session appointments
            </TableCaption>
            {/* 
              1. Appointment ID
              2. Created Date
              3. Coach
              4. Student 
              5. Session Date
              6. Money Hold
              7. Course Name 
              8. View More Information
              */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead className="w-[150px] text-center">
                  Created At
                </TableHead>
                <TableHead className="w-[210px]">Coach</TableHead>
                <TableHead className="w-[210px]">Student</TableHead>
                <TableHead className="w-[160px] text-center">
                  Course Name
                </TableHead>
                <TableHead className="w-[210px] text-center">
                  Session Date
                </TableHead>
                <TableHead className="text-center">Money Hold</TableHead>
                <TableHead className="text-center w-[150px]">
                  More Information
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((appointment, index) => (
                <TableRow key={index}>
                  <TableCell className="w-[100px]">
                    <div className="max-w-[80%] line-clamp-1">
                      {appointment.id}
                    </div>
                  </TableCell>
                  <TableCell className="w-[150px] text-sm break-words text-center">
                    {dayjs(appointment.created_at).fromNow()}
                  </TableCell>
                  <TableCell className="w-[210px]">
                    <div className="inline-flex items-center gap-x-4">
                      <Image
                        src={appointment.coach_data.avatar!}
                        alt="avatar"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-8 h-8 rounded-full"
                      />
                      <Link
                        href={`/user/${appointment.coach_data.name}`}
                        className="line-clamp-1 hover:underline max-w-[90%]"
                      >
                        {appointment.coach_data.name}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell className="w-[210px]">
                    <div className="inline-flex items-center gap-x-4">
                      <Image
                        src={appointment.student_data.avatar!}
                        alt="avatar"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-8 h-8 rounded-full"
                      />
                      <Link
                        href={`/user/${appointment.student_data.name}`}
                        className="line-clamp-1 hover:underline max-w-[90%]"
                      >
                        {appointment.student_data.name}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell className="w-[160px] break-words text-center">
                    {appointment.course_session.name}
                  </TableCell>
                  <TableCell className="w-[210px] text-center">
                    <div className="space-y-2">
                      {[appointment.appointment_time].map((session, index) => (
                        <div
                          className="flex w-full items-center gap-x-2"
                          key={index}
                        >
                          <div className="h-1 w-1 bg-green-400 rounded-full"></div>
                          <div>{dayJSLocalize(session).format("lll")}</div>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="inline-flex items-center">
                      <span className="font-bold text-xl">
                        {appointment.money_hold}
                      </span>
                      <span className="text-teal-500 text-2xl ml-1 font-bold">
                        G
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center w-[150px]">
                    <ViewMoreButton data={appointment} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="w-full center py-12">
          <div className="flex flex-col items-center">
            <Image
              src="/images/logo.png"
              alt="image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-[150px] mb-5 h-auto"
            />
            <div className="text-xl text-center text-gray-300">
              {
                "You currently have no appointment from your coach or student right now 🥲"
              }
            </div>
            <div className="text-xl mt-2 text-center text-gray-300"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentPage;
