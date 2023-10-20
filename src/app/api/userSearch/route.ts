import { Database } from "@/types/supabaseTypes";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { profile } from "console";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const searchWord = searchParams.get("query");
  // const userID = searchParams.get("id");
  const guessID = searchParams.get("guessID");


  const supabaseClient = createRouteHandlerClient({ cookies });
  const query = `*, 
    sender:sender_receivers!sender_receivers_receiver_id_fkey(*), 
    receiver:sender_receivers!sender_receivers_sender_id_fkey(*)
  `;
  
  let userID = "1a93fbe7-5376-437a-ab9d-3632741fcd8f";
  const { data, error } = await supabaseClient
  .from("profiles")
  .select(query)
  .or(`sender_id.eq.${userID}`, {
    foreignTable: "sender_receivers",
  })
  .or(`receiver_id.eq.${userID}`, {
    foreignTable: "sender_receivers",
  })
  .ilike("name", `${searchWord}%`);

  // add status to object
  // 1. friend
  // 2. waiting to accept
  // 3. waiting to be accepted
  // 4. not friend
  // if (!data || data.length === 0) {} 
  // else {
  //   let foundMatch = false;
  //   for (let i = 0; i < data.length; i++) {
  //     if (data[i].sender !== null && data[i].sender.length >= 1) 
  //     {
  //       data[i].sender.forEach((element: any) => {
  //         if (element.receiver_id === auth_id) {
  //           foundMatch = true;
  //           if (element.is_accepted === true) {
  //             data![i].status = "1";
  //           } else {
  //             data![i].status = "2";
  //           }
  //         }
  //       });
  //     } 

  //     if (data[i].receiver !== null && data[i].receiver.length >= 1) 
  //     {
  //       data[i].receiver.forEach((element: any) => {
  //         if (element.sender_id === auth_id) {
  //           foundMatch = true;
  //           if (element.is_accepted === true) {
  //             data![i].status = "1";
  //           } else {
  //             data![i].status = "3";
  //           }
  //         }
  //       });
  //     } 

  //     if (!foundMatch) {
  //       data![i].status = "4";
  //     }
  //   }
  // }
    

  if (error) {
    console.error(error);
    return NextResponse.json({ status: 500, data: {} });
  }
  return NextResponse.json(data);
}