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
import usePostDetailsModal from "@/hooks/usePostDetailsModal";
import { usePostFormModal } from "@/hooks/usePostFormModal";
import { useUser } from "@/hooks/useUser";
import { User } from "@supabase/supabase-js";
import {
  AlertTriangle,
  CircleEqual,
  Copyright,
  PenBoxIcon,
  Trash,
  UserX,
} from "lucide-react";
import { BiDotsHorizontal, BiDotsHorizontalRounded } from "react-icons/bi";
import { GrSettingsOption } from "react-icons/gr";

export default function PostOptions({
  owner_id,
  post_id,
}: {
  owner_id: string;
  post_id: string;
}) {
  const { user } = useUser();
  const { isOpen, onClose, onOpen, onOpenEdit } = usePostFormModal();
  const handleEdit = () => {
    onOpenEdit(post_id);
  };
  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          onClick={() => {}}
          className="text-muted cursor-pointer hover:bg-primary rounded-3xl 2xl:text-xl gap-x-2 flex items-center h-8 justify-center px-2 text-lg duration-500 bg-white"
        >
          <GrSettingsOption />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-56">
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {owner_id === user?.id && (
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
