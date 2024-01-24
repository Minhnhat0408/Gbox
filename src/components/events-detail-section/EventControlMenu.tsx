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

const EventControlMenu = () => {
  const {} = useEventDetail();
  // TODO: edit information + notification to all participants

  // TODO: delete event

  return (
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
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Delete Event</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EventControlMenu;
