import dayjs from "dayjs";
import { FaCheck, FaInfoCircle, FaSpinner } from "react-icons/fa";
import { TiWarning } from "react-icons/ti";
import {
  CoachDataWithProfile,
  StudentRequestTypeWithStudentAndCourse,
} from "@/types/supabaseTableType";
import { Database } from "@/types/supabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
import localizedFormat from "dayjs/plugin/localizedFormat";
import { FaXmark } from "react-icons/fa6";
import ViewMoreButton from "@/components/student-booking-page/ViewMoreButton";
import ViewStudentBookingRequestModal from "@/components/student-booking-page/ViewStudentBookingRequestModal";

dayjs.extend(relativeTime);

const dayJSLocalize = dayjs;

dayJSLocalize.extend(localizedFormat);

const CoachManageStudentRequestPage = async () => {
  const supabaseClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  const { data, error } = (await supabaseClient
    .from("coach_profiles")
    .select("*, profiles(*)")
    .eq("user_id", user?.id!)
    .single()) as unknown as { data: CoachDataWithProfile | null; error: any };

  if (!data) {
    // not coach
    return redirect("/");
  }

  const { data: appointmentData, error: appointmentError } =
    (await supabaseClient
      .from("appointment_request")
      .select(
        "*, course_session(*), profiles!appointment_request_request_user_id_fkey(*)"
      )
      .eq("coach_id", data?.id!)
      .order("modified_at", { ascending: false })) as unknown as {
      data: StudentRequestTypeWithStudentAndCourse[];
      error: any;
    };

  if (appointmentError) {
    console.error(appointmentError);
    return redirect("/");
  }

  // 1. send user
  // 2. send date
  // 3. course requested
  // 4. game requested
  // 5. status
  // 6. money_hold
  // 7. sessions time
  // 8. status

  return (
    <div className="mx-8 !pt-[72px] pb-20 px-16">
      <h1 className="super font-bold mt-8 text-3xl">Student Booking Request</h1>
      <div className="mt-10 mb-5 flex items-start">
        <span>
          <FaInfoCircle className="text-2xl mr-5 text-green-400" />
        </span>
        All the student booking request will be show here. Each request will
        expire after 24 hours so you need to check this page regularly.
      </div>
      <div className="mt-8 mb-5 flex items-start">
        <span>
          <FaInfoCircle className="text-2xl mr-5 text-green-400" />
        </span>
        You will receive 50% of the lesson price if student cancel 24 hours
        before the session start
      </div>
      <div className="mt-8 mb-5 flex items-start">
        <span>
          <TiWarning className="text-2xl mr-5 text-red-500" />
        </span>
        If you reject a request, please provide a reason for the student.
      </div>
      {appointmentData.length === 0 ? (
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
            <div className="text-lg text-center text-gray-300">
              {"You have no booking for session right now🥲"}
            </div>
            <div className="text-lg  leading-loose mt-3 w-[70%] text-center text-gray-300">
              {
                <span>
                  P/S: The more your{" "}
                  <Link
                    href={`/user/${data.profiles.name}`}
                    className="super font-bold"
                  >
                    Gbox Profile
                  </Link>{" "}
                  and{" "}
                  <Link
                    href={`/coach/${data.profiles.name}`}
                    className="super font-bold"
                  >
                    Coaching Profile
                  </Link>{" "}
                  good is, the more the student will come see your session and
                  booking 😊
                </span>
              }
            </div>
          </div>
        </div>
      ) : (
        <>
          <ViewStudentBookingRequestModal />
          <Table className="mt-7">
            <TableCaption>
              Showing {appointmentData.length} student booking requests
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[140px]">Request ID</TableHead>
                <TableHead className="w-[180px]">Request User</TableHead>
                <TableHead className="w-[130px] text-center">
                  Send Date
                </TableHead>
                <TableHead className="w-[200px] text-center">Course</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="w-[210px]">Booked Sessions</TableHead>
                <TableHead className="text-center">Hold Money</TableHead>
                <TableHead className="text-center w-[150px]">
                  More Information
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointmentData.map((appointment, index) => (
                <TableRow key={index}>
                  <TableHead className="w-[140px]">
                    <div className="max-w-[80%] line-clamp-1">
                      {appointment.id}
                    </div>
                  </TableHead>

                  <TableCell className="w-[180px]">
                    <div className="inline-flex items-center gap-x-4">
                      <Image
                        src={appointment.profiles.avatar!}
                        alt="avatar"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-8 h-8 rounded-full"
                      />
                      <Link
                        href={`/user/${appointment.profiles.name}`}
                        className="line-clamp-1 hover:underline"
                      >
                        {appointment.profiles.name}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell className="w-[130px] break-words text-center">
                    {dayjs(appointment.created_at).fromNow()}
                  </TableCell>
                  <TableCell className="w-[200px] break-words text-center">
                    {appointment.course_session.name}
                  </TableCell>
                  <TableCell className="text-center">
                    {appointment.status === "pending" ? (
                      <div className="bg-gray-600 py-2 px-3 w-fit items-center rounded-xl inline-flex gap-x-3 justify-between">
                        <FaSpinner className="animate-spin text-white" />
                        <span className="text-white">Pending</span>
                      </div>
                    ) : appointment.status === "accepted" ? (
                      <div className="bg-green-600 py-2 px-3 w-fit items-center rounded-xl inline-flex gap-x-3 justify-between">
                        <FaCheck className=" text-white" />
                        <span className="text-white">Accepted</span>
                      </div>
                    ) : (
                      <div className="bg-rose-400 py-2 px-3 w-fit items-center rounded-xl inline-flex gap-x-3 justify-between">
                        <FaXmark className=" text-white" />
                        <span className="text-white">Rejected</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="w-[210px] text-center">
                    <div className="space-y-2">
                      {[appointment.sessions].map((session, index) => (
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
                    <ViewMoreButton requestData={appointment} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default CoachManageStudentRequestPage;
