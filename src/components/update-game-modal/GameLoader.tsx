import { Skeleton } from "../ui/skeleton";

function GameLoader() {
  return (
    <div className="flex items-center w-full gap-3">
      <Skeleton className="w-24 h-24 rounded-lg" />
      <div className="flex flex-col w-2/5 gap-3">
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-full h-6" />
      </div>
    </div>
  );
}

export default GameLoader;
