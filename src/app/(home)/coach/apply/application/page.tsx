import AboutApplyForm from "@/components/coach-application/about-form/AboutApplyForm";

const ApplyCoachingPage = () => {
  return (
    <div className="mx-8 !pt-[72px] px-16">
      <div className="mt-10 items-center justify-between flex mb-20 w-full gap-x-3">
        <div className="w-10 h-10 rounded-full bg-primary center">
          <span className="text-black">1</span>
        </div>
        <div className="border-t-2 border-dashed border-zinc-400 flex-1"></div>
        <div className="w-10 h-10 rounded-full border-2 border-primary center">
          <span>2</span>
        </div>
        <div className="border-t-2 border-dashed border-zinc-400 flex-1"></div>

        <div className="w-10 h-10 rounded-full bg-primary center">
          <span className="text-black">3</span>
        </div>
        <div className="border-t-2 border-dashed border-zinc-400 flex-1"></div>

        <div className="w-10 h-10 rounded-full bg-primary center">
          <span className="text-black">4</span>
        </div>
      </div>
      <AboutApplyForm />
    </div>
  );
};

export default ApplyCoachingPage;
