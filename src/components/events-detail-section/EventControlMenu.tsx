import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { BsThreeDots } from "react-icons/bs";
import { useEventDetail } from "@/hooks/useEventDetail";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";
import { useSupabase } from "@/hooks/useSupabaseClient";
import { useRouter } from "next/navigation";
import { wait } from "@/lib/wait";
import { AiOutlineLoading } from "react-icons/ai";

const EventControlMenu = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { id } = useEventDetail();
  const supabase = useSupabase();
  const router = useRouter();
  // TODO: edit information + notification to all participants

  // TODO: delete event
  const handleDeleteEvent = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("events")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setLoading(false);
      setOpen(false);
      toast.success("Event deleted successfully");
      router.push("/events");
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" className="">
            <BsThreeDots className="text-xl text-white" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Edit Event Detail</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            Delete Event
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={open}>
        <AlertDialogTrigger asChild></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="w-[110px]"
              onClick={handleDeleteEvent}
            >
              {loading ? (
                <>
                  <span>Delete </span>
                  <AiOutlineLoading className="animate-spin text-xl ml-2" />
                </>
              ) : (
                <span>Delete </span>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EventControlMenu;
