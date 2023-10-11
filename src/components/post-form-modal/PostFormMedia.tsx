import { cn } from "@/lib/utils";
import { ImImages } from "react-icons/im";

type PostFormMediaProps = {
  className: string;
};

function PostFormMedia({ className }: PostFormMediaProps) {
  return (
    <div
      className={cn(
        className,
        "!bg-black/40 border-solid border-[rgb(0,240,255)] border-[2px]  rounded-xl h-full flex justify-center items-center"
      )}
    >
      <div className="gap-y-4 flex flex-col items-center justify-center">
        <ImImages size="50" />
        <p className="text-lg font-medium">Upload image or video</p>
      </div>
    </div>
  );
}

export default PostFormMedia;
