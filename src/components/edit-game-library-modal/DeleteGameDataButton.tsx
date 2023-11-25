import { FaTrashAlt } from "react-icons/fa";
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
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUserGameLibrary } from "@/hooks/useUserGameLibrary";
import { toast } from "sonner";
import { useEditGameLibraryModal } from "@/hooks/useEditGameLibraryModal";
import { cn } from "@/lib/utils";
import { ImSpinner2 } from "react-icons/im";

const DeleteGameDataButton = ({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [openModal, setOpenModal] = useState(false);

  const { supabaseClient } = useSessionContext();

  const { gameData, setGameData } = useUserGameLibrary();

  const { data: currentGameData, onClose } = useEditGameLibraryModal();

  if (!currentGameData) return null;

  const deletGameData = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      setOpenModal(false);
      setLoading(true);
      const { data, error } = await supabaseClient
        .from("user_game_data")
        .delete()
        .eq("id", currentGameData.id);
      if (error) {
        throw error;
      }
      const newData = gameData.filter((game) => game.id !== currentGameData.id);
      setGameData(newData);
    } catch (error) {
      toast.error("Failed to delete game data");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <AlertDialog
      open={openModal}
      onOpenChange={(open: boolean) => {
        setOpenModal(open);
      }}
    >
      <AlertDialogTrigger asChild>
        <button className="border rounded-2xl border-rose-500/80 group hover:border-rose-400 w-[73px] h-[63px] center">
          <FaTrashAlt className="text-rose-500/80 group-hover:text-rose-400 text-xl" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Your game data include score rating,
            status, and comment will be deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={cn("flex items-center w-[119px]")}
            onClick={deletGameData}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteGameDataButton;
