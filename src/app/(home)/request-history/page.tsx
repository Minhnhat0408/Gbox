import { CoachApplicationType } from "@/types/supabaseTableType";
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
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import ViewApplyInformationModal from "@/components/see-more-page/ViewApplyInformationModal";

dayjs.extend(localizedFormat);

const RequestHistory = async () => {
  const supabaseClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  //TODO: fetch sessions too
  const { data: requestHistoryData, error } = (await supabaseClient
    .from("coach_application")
    .select("*, profiles(*)")
    .eq("user_id", user?.id)) as unknown as {
    data: CoachApplicationType[];
    error: any;
  };

  if (error) {
    throw error;
  }
  // table will have
  // 0. request ID
  // 1. date requested
  // 2. service requested
  // 3. status
  // 4. coach_game
  // 6. see more info button

  return (
    <div className="mx-8 !pt-[72px] px-16">
      <ViewApplyInformationModal />
      {requestHistoryData.length > 0 ? (
        <div className="flex flex-col gap-y-5 px-4 mt-16">
          <Table>
            <TableCaption>
              Your past request such as coach application and session request
              form
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
              {requestHistoryData.map((request, index) => (
                <TableRow key={index}>
                  <TableCell className="w-[230px]">
                    <div className="max-w-[80%] line-clamp-1">{request.id}</div>
                  </TableCell>
                  <TableCell className="w-[220px]">
                    {dayjs(request.created_at).format("llll")}
                  </TableCell>
                  <TableCell className="w-[164px] text-center">
                    Coach Apply
                  </TableCell>
                  <TableCell className=" text-center h-full">
                    {request.is_accepted === "pending" ? (
                      <div className="bg-gray-600 py-2 px-3 w-fit items-center rounded-xl inline-flex gap-x-3 justify-between">
                        <FaSpinner className="animate-spin text-white" />
                        <span className="text-white">Pending</span>
                      </div>
                    ) : request.is_accepted === "accepted" ? (
                      <div className="bg-green-600 py-2 px-3 w-fit items-center rounded-xl flex gap-x-3 justify-between">
                        <FaCheck className=" text-white" />
                        <span className="text-white">Accepted</span>
                      </div>
                    ) : (
                      <div className="bg-rose-400 py-2 px-3 w-fit items-center rounded-xl flex gap-x-3 justify-between">
                        <FaXmark className=" text-white" />
                        <span className="text-white">Rejected</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <ol className="space-y-1">
                      {request.coach_games.map((game, index) => (
                        <li className="flex" key={index}>
                          {game.data.shortName || game.data.name}
                        </li>
                      ))}
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
        <div className="">You have no request submitted yet</div>
      )}
    </div>
  );
};

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default RequestHistory;
