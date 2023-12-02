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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
export default function LeaveRoomWarning({
  children,
  func,
  userId,
  className,
}: {
  children: React.ReactNode;
  func?: () => void;
  userId: string;
  className?: string;
}) {
  const { onClose, roomId, setRoomId, roomData,setRoomData } = useMatchingRoom(
    (set) => set
  );
  // const { user } = useUser();
  const supabaseClient  = createClientComponentClient();
  const handleLeaveRoom = async () => {
    if(!func) {
      const { data, error } = await supabaseClient
      .from("room_users")
      .update({ outed_date: new Date() })
      .eq("user_id", userId)
      .eq("room_id", roomId);
    } 
  
    if (roomData && roomData.host_id === userId) {
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
        .neq("user_id", userId);
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
 
    setRoomId(null);
    setRoomData(null);
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
