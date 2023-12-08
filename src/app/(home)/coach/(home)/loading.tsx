import ImageNew from "@/components/new-image/Image";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingComponentPage = () => {
  return (
    <div className="mx-8 !pt-[72px] px-14">
      <div className="w-full mt-8">
        <div className="relative inset-x-0 top-0 h-[149px] overflow-hidden sm:h-[192px] lg:mx-2 lg:mt-10 lg:h-[290px] rounded-t-3xl">
          <ImageNew
            src="/images/banner.jfif"
            className="absolute left-0 top-0 !h-full !w-full object-cover object-center w-150 sm:w-[768px] md:w-[1024px] lg:w-[1600px] self-start shrink-0"
          />
          <div
            className="absolute left-0 top-0 h-full w-full"
            style={{
              background:
                "linear-gradient(180deg, rgba(14, 14, 17, 0) 0%, rgba(14, 14, 17, 0.821335) 57.21%, rgba(14, 14, 17, 0.957008) 75.82%, #0E0E11 100%)",
            }}
          ></div>
          <div className="all-0 select-none center">
            <div className="text-6xl super font-bold tracking-wide">
              Coach and Session
            </div>
          </div>
        </div>
      </div>
      <div className="w-full my-7 text-2xl font-bold mx-2">Top Experts</div>
      <div className="h-[325px] flex font-bold mx-2">
        <div className="flex items-center shrink-0 w-1/5 px-3 h-full">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
        <div className="flex items-center shrink-0 w-1/5 px-3 h-full">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
        <div className="flex items-center shrink-0 w-1/5 px-3 h-full">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
        <div className="flex items-center shrink-0 w-1/5 px-3 h-full">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
        <div className="flex items-center shrink-0 w-1/5 px-3 h-full">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
      </div>
      <div className="w-full my-7 text-2xl font-bold mx-2">
        Trending Sessions
      </div>
      <div className="h-[325px] flex font-bold mx-2">
        <div className="flex items-center shrink-0 w-1/5 px-3 h-full">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
        <div className="flex items-center shrink-0 w-1/5 px-3 h-full">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
        <div className="flex items-center shrink-0 w-1/5 px-3 h-full">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
        <div className="flex items-center shrink-0 w-1/5 px-3 h-full">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
        <div className="flex items-center shrink-0 w-1/5 px-3 h-full">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default LoadingComponentPage;
