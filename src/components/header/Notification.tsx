import { cn } from "@/lib/utils";
import { BiBell } from "react-icons/bi";

function Notification({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "text-3xl p-2 rounded-full cursor-pointer hover:bg-muted",
        className
      )}
    >
      <BiBell />
    </div>
  );
}

export default Notification;
