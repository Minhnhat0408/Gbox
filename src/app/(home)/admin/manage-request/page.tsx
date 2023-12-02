import { FaCheck, FaInfoCircle, FaSpinner } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { Database } from "@/types/supabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
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
import { CoachApplicationType } from "@/types/supabaseTableType";
import Image from "next/image";
import dayjs from "dayjs";
import { FaXmark } from "react-icons/fa6";
import AdminSeeMoreButton from "@/components/admin-page/manage-request/SeeMoreButton";
import Link from "next/link";
import AdminViewApplicationModel from "@/components/admin-page/manage-request/AdminViewApplicationModel";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const ManageRequest = async () => {
  const supabaseClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
    error,
  } = await supabaseClient.auth.getUser();

  const { data: profiles } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", user!.id)
    .single();

  if (!profiles?.is_admin || error) {
    return redirect("/");
  }

  //   TODO: fetch sessions too
  const { data: requestData, error: requestError } = (await supabaseClient
    .from("coach_application")
    .select("*, profiles(*)")
    .order("created_at", {
      ascending: false,
    })) as unknown as {
    data: CoachApplicationType[];
    error: any;
  };

  if (requestError) {
    throw requestError;
  }

  // table will have
  // 0. request ID
  // 1. user ID with avatar + link
  // 2. date requested
  // 3. service requested
  // 4. status
  // 5. coach_game
  // 6. see more info button

  return (
    <div className="mx-8 !pt-[72px] px-14">
      <h1 className="super font-bold text-3xl mt-8">Manage Requests</h1>
      <div className="mt-10 mb-5 flex items-start">
        <span>
          <FaInfoCircle className="text-2xl mr-5 text-green-400" />
        </span>
        Admin can manage coaching request like Coach Application Form or Coach
        Session Apply.
      </div>
      <div className="flex items-start">
        <span>
          <IoIosWarning className="text-3xl mr-4 text-red-500" />
        </span>
        <span>
          There can be many same requests from same person. So when you accept
          one of thoese request, the other request of that person with same type
          will be automatically denied
        </span>
      </div>
      <div className="mt-8 w-full">
        {requestData && requestData.length <= 0 ? (
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
              <div className="text-xl text-center text-teal-500">
                {"There's no request to show right now 🥲"}
              </div>
            </div>
          </div>
        ) : (
          <>
            <AdminViewApplicationModel />
            <Table className="mt-10">
              <TableCaption>
                All requests from users such as coach application and session
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[170px]">Request ID</TableHead>
                  <TableHead className="w-[220px]">Username</TableHead>
                  <TableHead className="w-[150px] text-center">
                    Submitted time
                  </TableHead>
                  <TableHead className="w-[164px] text-center">
                    Service
                  </TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead>Coach Game</TableHead>
                  <TableHead className="text-center w-[150px]">
                    More Information
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requestData.map((request, index) => (
                  <TableRow key={index}>
                    <TableCell className="w-[170px]">
                      <div className="max-w-[80%] line-clamp-1">
                        {request.id}
                      </div>
                    </TableCell>
                    <TableCell className="w-[220px]">
                      <div className="inline-flex items-center gap-x-4">
                        <Image
                          src={request.profiles.avatar!}
                          alt="avatar"
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="w-8 h-8 rounded-full"
                        />
                        <Link
                          href={`/user/${request.profiles.name}`}
                          className="line-clamp-1 hover:underline"
                        >
                          {request.profiles.name}
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell className="w-[150px] break-words text-center">
                      {dayjs(request.created_at).fromNow()}
                    </TableCell>
                    <TableCell className="w-[164px] text-center">
                      Coach Apply
                    </TableCell>
                    <TableCell className="text-center">
                      {request.is_accepted === "pending" ? (
                        <div className="bg-gray-600 py-2 px-3 w-fit items-center rounded-xl inline-flex gap-x-3 justify-between">
                          <FaSpinner className="animate-spin text-white" />
                          <span className="text-white">Pending</span>
                        </div>
                      ) : request.is_accepted === "accepted" ? (
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
                      <AdminSeeMoreButton data={request} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default ManageRequest;
