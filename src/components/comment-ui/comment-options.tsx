'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
  } from "@/components/ui/dropdown-menu";
import { User } from "@supabase/supabase-js";
import { AlertTriangle, CircleEqual, Copyright, PenBoxIcon, Trash, UserX } from "lucide-react";
import { BiDotsHorizontal } from "react-icons/bi";
  
export default function CommentOptions({user_id, user, handleEdit, handleDelete} : {user_id: string, user: User | null, handleEdit: any, handleDelete: any}) {
    return (
        <DropdownMenu>
        <DropdownMenuTrigger>
          <div className=" group-hover:visible invisible text-white text-lg  ">
            <BiDotsHorizontal />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-56">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {user_id === user?.id && (
            <>
              <DropdownMenuItem onClick={handleEdit}>
                <PenBoxIcon className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <AlertTriangle className="mr-2 h-4 w-4" />
              <span>Report</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <UserX className="mr-2 h-4 w-4" />
                  <span>Harassing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CircleEqual className="mr-2 h-4 w-4" />
                  <span>Inappropriate</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copyright className="mr-2 h-4 w-4" />
                  <span>Copyright</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
  );
}