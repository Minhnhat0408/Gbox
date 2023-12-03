import { Skeleton } from "../ui/skeleton";

const GameLibLoading = () => {
  return (
    <div className="flex w-full min-h-[160px] px-2 py-4">
      <Skeleton className="w-32 h-full rounded-lg min-h-[160px]"></Skeleton>
      <div className="flex-1 w-[calc(100%-96px)] flex min-h-[160px]">
        <div className="flex-1 p-3 h-full flex flex-col justify-between">
          <div className="w-full h-full flex flex-col justify-between">
            <div className="w-full">
              <Skeleton className="w-1/2 h-4 mb-4"></Skeleton>
              <Skeleton className="w-1/5 h-2"></Skeleton>
            </div>
            <Skeleton className="w-1/5 h-2"></Skeleton>
          </div>
          <Skeleton className="text-zinc-200 text-sm h-2 w-1/5 mt-2"></Skeleton>
        </div>
      </div>
    </div>
  );
};

export default GameLibLoading;
