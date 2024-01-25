import { Database } from "@/types/supabaseTypes";
import { createClientComponentClient, createRouteHandlerClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

type AddGroupUserBody = {
    user_id:string,
    user_name:string,
    group_id:string,
    role:string
}
export async function POST(request: Request) {
    const body:AddGroupUserBody = await request.json();
    const supabase = createRouteHandlerClient<Database>({cookies})
    const { error } = await supabase.from("group_users").insert({
        user_id: body.user_id,
        group_id: body.group_id,
        role: body.role
    });
    if(error) {
        return NextResponse.json({error:error.message}, {status:400})
    }
    //add auto message
    if(body.role === "creator") {
      const {error} =   await supabase.from("messages").insert(
            {
              content: `${body.user_name} have created the group`,
              group_id: body.group_id,
            }
          )
        if(error) {
            return NextResponse.json({error:error.message})
        }
        
        
    }else {
      const {error} =  await supabase.from("messages").insert(
        {
          content: `${body.user_name} have joined the group`,
          group_id: body.group_id,
        }
      )
      if(error) {
          return NextResponse.json({error:error.message})
      }
    }

  return NextResponse.json({ status:"ok" });
}
 