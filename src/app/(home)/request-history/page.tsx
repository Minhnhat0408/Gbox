import { PiStudentBold } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import {
  CoachApplicationType,
  SessionApplicationTypeWithProfile,
  StudentRequestTypeWithStudentAndCourse,
} from "@/types/supabaseTableType";
import { Database } from "@/types/supabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaC, FaSpinner } from "react-icons/fa6";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
import SeeMoreButton from "@/components/see-more-page/SeeMoreButton";
import { FaCheck, FaInfoCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import ViewApplyInformationModal from "@/components/see-more-page/ViewApplyInformationModal";
import ViewSessionRequestModal from "@/components/see-more-page/ViewSessionRequestModal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ViewJoinSessionRequestModal from "@/components/see-more-page/ViewJoinSessionRequestModa";

dayjs.extend(localizedFormat);

const RequestHistory = async () => {
  const supabaseClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // NOTE: this page will contain 3 types of request
  // 1. coach application
  // 2. session application
  // 3. join session request

  const fetchSessionRequest = supabaseClient
    .from("session_application")
    .select("*, profiles(*)")
    .eq("coach_profile_id", user?.id);

  const fetchCoachApplication = supabaseClient
    .from("coach_application")
    .select("*, profiles(*)")
    .eq("user_id", user?.id);

  const checkCoach = supabaseClient
    .from("coach_profiles")
    .select()
    .eq("user_id", user?.id!);

  const fetchJoinSessionRequest = supabaseClient
    .from("appointment_request")
    .select(
      "*, course_session(*), profiles!appointment_request_request_user_id_fkey(*)"
    )
    .eq("request_user_id", user?.id);

  const [
    { data: sessionRequestData, error: sessionRequestError },
    { data: requestHistoryData, error },
    { data: checkCoachData, error: checkCoachError },
    { data: joinSessionRequestData, error: joinSessionRequestError },
  ] = (await Promise.all([
    fetchSessionRequest,
    fetchCoachApplication,
    checkCoach,
    fetchJoinSessionRequest,
  ])) as [unknown, unknown, unknown, unknown] as [
    {
      data: SessionApplicationTypeWithProfile[];
      error: any;
    },
    {
      data: CoachApplicationType[];
      error: any;
    },
    { data: any; error: any },
    { data: StudentRequestTypeWithStudentAndCourse[]; error: any }
  ];

  if (sessionRequestError) {
    console.log(sessionRequestError.message);
  }

  if (error) {
    console.log(error.message);
  }

  if (joinSessionRequestError) {
    console.log(joinSessionRequestError.message);
  }

  if (checkCoachError) {
    console.log(checkCoachError.message);
  }

  // create a new array and sort it by date requested
  const sortedRequestHistoryData = [
    ...sessionRequestData,
    ...requestHistoryData,
    ...joinSessionRequestData,
  ].sort((a, b) => {
    return (
      new Date(b.modified_at).getTime() - new Date(a.modified_at).getTime()
    );
  });

  // table will have
  // 0. request ID
  // 1. date requested
  // 2. service requested
  // 3. status
  // 4. coach_game
  // 6. see more info button

  return (
    <div className="mx-8 !pt-[72px] pb-20 px-16">
      <ViewApplyInformationModal />
      <ViewSessionRequestModal />
      <ViewJoinSessionRequestModal />
      <div className="w-full flex justify-between mt-8 items-center">
        <h1 className="super font-bold text-3xl">Request History</h1>
        <div className="flex ">
          {checkCoachData.length > 0 && (
            <Link href="/request-history/booking" className="pr-6">
              <Button className="w-full rounded-xl">
                <span>
                  <PiStudentBold className="text-xl mr-2" />
                </span>
                View Student Request
              </Button>
            </Link>
          )}
          <Link href="/appointment" className="pr-6">
            <Button
              variant={"secondary"}
              className="w-full flex items-center rounded-xl"
            >
              <span>
                <FaRegCalendarAlt className="text-base mr-3" />
              </span>
              <span>Manage Appointment</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-10 mb-5 flex items-start">
        <span>
          <FaInfoCircle className="text-2xl mr-5 text-green-400" />
        </span>
        You can view your past request such as coach application, create session
        request and join session request here with also the status of your
        request.
      </div>
      <div className="mt-10 mb-5 flex items-start">
        <span>
          <FaInfoCircle className="text-2xl mr-5 text-green-400" />
        </span>
        If you are a coach, a button the student request page will be shown on
        the top right corner of this page.
      </div>
      {sortedRequestHistoryData.length > 0 ? (
        <div className="flex flex-col gap-y-5 px-4 mt-16">
          <Table>
            <TableCaption>
              Showing your {sortedRequestHistoryData.length} requests
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[230px]">Request ID</TableHead>
                <TableHead className="w-[220px]">Date Requested</TableHead>
                <TableHead className="w-[164px] text-center">
                  Service Requested
                </TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead>Coach Game</TableHead>
                <TableHead className="text-center w-[150px]">
                  More Information
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedRequestHistoryData.map((request, index) => (
                <TableRow key={index}>
                  <TableCell className="w-[230px]">
                    <div className="max-w-[80%] line-clamp-1">{request.id}</div>
                  </TableCell>
                  <TableCell className="w-[220px]">
                    {dayjs(request.created_at).format("llll")}
                  </TableCell>
                  <TableCell className="w-[164px] text-center">
                    {(request as CoachApplicationType).coach_games
                      ? "Coach Apply"
                      : (request as StudentRequestTypeWithStudentAndCourse)
                          .request_user_id
                      ? "Session Appointment"
                      : "Session Request"}
                  </TableCell>
                  <TableCell className=" text-center h-full">
                    {(request as CoachApplicationType).is_accepted &&
                      ((request as CoachApplicationType).is_accepted ===
                      "pending" ? (
                        <div className="bg-gray-600 py-2 px-3 w-fit items-center rounded-xl inline-flex gap-x-3 justify-between">
                          <FaSpinner className="animate-spin text-white" />
                          <span className="text-white">Pending</span>
                        </div>
                      ) : (request as CoachApplicationType).is_accepted ===
                        "accepted" ? (
                        <div className="bg-green-600 py-2 px-3 w-fit items-center rounded-xl inline-flex gap-x-3 justify-between">
                          <FaCheck className=" text-white" />
                          <span className="text-white">Accepted</span>
                        </div>
                      ) : (
                        <div className="bg-rose-400 py-2 px-3 w-fit items-center rounded-xl inline-flex gap-x-3 justify-between">
                          <FaXmark className=" text-white" />
                          <span className="text-white">Rejected</span>
                        </div>
                      ))}
                    {(request as StudentRequestTypeWithStudentAndCourse)
                      .status &&
                      (request as StudentRequestTypeWithStudentAndCourse)
                        .request_user_id &&
                      ((request as StudentRequestTypeWithStudentAndCourse)
                        .status === "pending" ? (
                        <div className="bg-gray-600 py-2 px-3 w-fit items-center rounded-xl inline-flex gap-x-3 justify-between">
                          <FaSpinner className="animate-spin text-white" />
                          <span className="text-white">Pending</span>
                        </div>
                      ) : (request as StudentRequestTypeWithStudentAndCourse)
                          .status === "accepted" ? (
                        <div className="bg-green-600 py-2 px-3 w-fit items-center rounded-xl inline-flex gap-x-3 justify-between">
                          <FaCheck className=" text-white" />
                          <span className="text-white">Accepted</span>
                        </div>
                      ) : (
                        <div className="bg-rose-400 py-2 px-3 w-fit items-center rounded-xl inline-flex gap-x-3 justify-between">
                          <FaXmark className=" text-white" />
                          <span className="text-white">Rejected</span>
                        </div>
                      ))}
                  </TableCell>
                  <TableCell>
                    <ol className="space-y-1">
                      {(request as CoachApplicationType).coach_games ? (
                        (request as CoachApplicationType).coach_games.map(
                          (game, index) => (
                            <li className="flex" key={index}>
                              {game.data.shortName || game.data.name}
                            </li>
                          )
                        )
                      ) : (request as StudentRequestTypeWithStudentAndCourse)
                          .request_user_id ? (
                        <li className="flex">
                          {
                            (request as StudentRequestTypeWithStudentAndCourse)
                              .course_session.game_meta_data.name
                          }
                        </li>
                      ) : (
                        <li className="flex">
                          {(request as SessionApplicationTypeWithProfile)
                            .game_meta_data.shortName ||
                            (request as SessionApplicationTypeWithProfile)
                              .game_meta_data.name}
                        </li>
                      )}
                    </ol>
                  </TableCell>
                  <TableCell className="text-center w-[150px]">
                    <SeeMoreButton data={request} />
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
              {"You have no to request to show right now 🥲"}
            </div>
            <div className="text-xl mt-2 text-center text-gray-300">
              {
                "Try apply for a coach position, request a session and comeback here 😊"
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default RequestHistory;
