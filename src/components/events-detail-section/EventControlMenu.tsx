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
import { AiOutlineLoading } from "react-icons/ai";
import { useEventFormModal } from "@/hooks/useEventFormModal";
import { useEventMoreInformation } from "@/hooks/useEventMoreInformation";
import { useEventFormBodyModal } from "@/hooks/useEventFormBody";
import { createFileOnURL } from "@/lib/createFileOnURL";
import { format } from "date-fns";
import { useEventSearchGame } from "@/hooks/useEventSearchGame";

const EventControlMenu = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const supabase = useSupabase();

  const { onOpen, setFormType } = useEventFormModal();
  const {
    id,
    tags,
    total_people,
    rules,
    event_name,
    description,
    cover_image,
    start_date,
    end_date,
    game_name,
    event_participations,
    isHost,
  } = useEventDetail();
  const { addTags, setPeople, addRules } = useEventMoreInformation();
  const {
    setName,
    setDescription,
    setImage,
    setStartDate,
    setStartTime,
    setImageType,
    setEndDate,
    setEndTime,
    setOldImage,
    setOldID,
    setEventParticipations,
  } = useEventFormBodyModal();

  const { setName: setGameName } = useEventSearchGame();

  const openEditEventModal = async () => {
    if (tags) {
      tags.forEach((tag) => {
        addTags(tag);
      });
    }

    if (total_people) {
      setPeople(total_people);
    }

    if (rules) {
      rules.forEach((rule) => {
        addRules(rule);
      });
    }

    setOldImage(cover_image);
    const file = await createFileOnURL(cover_image);
    setImage(file.file);
    setImageType(file.fileType);

    setStartDate(new Date(start_date));
    setStartTime(format(new Date(start_date), "HH:mm"));
    if (end_date) {
      setEndDate(new Date(end_date));
      setEndTime(format(new Date(end_date), "HH:mm"));
    }

    setEventParticipations(event_participations);
    setOldID(id);

    if (game_name) setGameName(game_name);
    setName(event_name);
    setDescription(description);
    setFormType("edit");
    onOpen();
  };

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
      window.location.href = "/events";
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  if (!isHost) return null;

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
          <DropdownMenuItem onClick={openEditEventModal}>
            Edit Event Detail
          </DropdownMenuItem>
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
