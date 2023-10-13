"use client"
import { cn } from "@/lib/utils";

export default  function PostLoading() {
  return (
    <article
      className={cn(
        "w-full h-72 bg-post rounded-[40px] flex p-6 animate-pulse "
      )}
    >
      <div className="2xl:w-2/5 w-1/2 gap-y-4 flex flex-col h-full pr-4">
        <div className="flex w-full 2xl:gap-x-4 gap-x-3">
          <div className="2xl:w-16 2xl:h-16 h-12 w-12 border-2 rounded-full border-primary bg-muted  "></div>

          <div className="inline-flex flex-col relative   flex-1 justify-evenly">
            <div className="px-3 py-1 2xl:h-7 h-4 bg-muted w-2/3 rounded-3xl inline-flex items-center select-none"></div>
            <p className="italic text-muted-foreground bg-muted w-1/2 2xl:h-5 h-3 rounded-3xl  inline-flex 2xl:text-base text-sm"></p>
          </div>
        </div>
        {/* <div className="flex flex-col gap-x-3 gap-y-3 ">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-muted-foreground font-bold line-clamp-2 leading-5 ">
            {content}
          </p>
        </div> */}
        <div className={cn(" mt-auto flex h-8 gap-x-2 ")}>
          <div className="xl:flex hidden w-16 h-8  relative">
            <div className=" w-8 h-8 rounded-full absolute top-0 left-0  border-2  border-primary bg-muted" />
            <div className=" w-8 h-8 rounded-full absolute top-0 left-4 border-2   border-primary bg-muted" />
            <div className=" w-8 h-8 rounded-full absolute top-0 left-8 border-2   border-primary bg-muted" />
          </div>
          <div
            className={cn(
              "flex text-muted rounded-3xl  overflow-hidden items-center relative bg-muted w-1/3 animate-pulse "
            )}
          ></div>
          <div className="text-muted bg-muted w-1/4 duration-500 hover:bg-primary  rounded-3xl 2xl:text-xl text-lg px-2 flex items-center justify-center gap-x-2"></div>
        </div>
      </div>

      <div className="flex-1 bg-muted rounded-[40px] justify-center flex  overflow-hidden"></div>
    </article>
  );
}
