"use client";
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
import { useMatchingRoom } from "@/hooks/useMatchingRoom";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
export default function LeaveRoomWarning({
  children,
  func,
  className,
}: {
  children: React.ReactNode;
  func?: () => void;
  className?: string;
}) {
  const { onClose, roomId, setRoomId, roomData } = useMatchingRoom(
    (set) => set
  );
  const { user } = useUser();
  const { supabaseClient } = useSessionContext();
  const handleLeaveRoom = async () => {
    const { data, error } = await supabaseClient
      .from("room_users")
      .update({ outed_date: new Date() })
      .eq("user_id", user?.id)
      .eq("room_id", roomId);
    if (roomData && roomData.host_id === user?.id) {
      await supabaseClient
        .from("rooms")
        .update({
          state: "closed",
        })
        .eq("id", roomId);
      const { data: room_user, error } = await supabaseClient
        .from("room_users")
        .select("*")
        .eq("room_id", roomId)
        .is("outed_date", null)
        .neq("user_id", user?.id);
      if (room_user) {
        await Promise.all(
          room_user.map((room_user) => {
            return supabaseClient
              .from("room_users")
              .update({ outed_date: new Date() })
              .eq("user_id", room_user.user_id);
          })
        );
      }
    }
    if (error) {
      toast.error(error.message);
    }
    setRoomId(null);
    onClose();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className={className}>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to leave the room
          </AlertDialogTitle>
          <AlertDialogDescription>
            Because you are room&apos;s owner so this room will be deleted
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await handleLeaveRoom();
              if (func) {
                func();
              }
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
