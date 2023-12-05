import { IoMdInformationCircle } from "react-icons/io";
import { ActionTooltip } from "@/components/action-tooltips/ActionToolTips";
import Modal from "@/components/modals/Modal";
import { useCoachProfile } from "@/hooks/useCoachDetail";
import { useProcessBuySessionModal } from "@/hooks/useProcessBuySessionModal";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useIsClamped } from "@/hooks/useIsClamped";
import { Separator } from "@/components/ui/separator";
import ScheduleSession from "./ScheduleSession";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ProcessBuySessionModal = () => {
  const { isOpen, onClose, reset, courseData, quantity, setQuantity } =
    useProcessBuySessionModal();

  const { data } = useCoachProfile();

  const [open, setOpen] = useState(false);
  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
      setOpen(false);
    }
  };

  const { userDetails } = useUser();

  const ref = useRef<HTMLDivElement>(null);

  const isClamped = useIsClamped(ref);

  const handlePayment = () => {
    // TODO: handle cant payment case
    // TODO: handle payment with alert model and money left
    // TODO: create request for session to coach
    // TODO: create notification for coach
  };

  if (!courseData) return null;

  if (!userDetails) return null;

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[1000px] remove-button overflow-hidden flex flex-col items-center !p-0  !rounded-2xl gap-4"
    >
      <div className="w-full h-full relative">
        <div className="w-full h-full pt-8 px-10 py-24 gap-4 flex  flex-col max-h-[90vh] overflow-y-scroll rounded-2xl">
          <h1 className="super font-bold text-3xl w-full text-center">
            Schedule & Payment
          </h1>
          <div className="flex justify-between w-full items-center">
            <div className="flex gap-x-4">
              <Image
                src={data.profiles.avatar!}
                alt="image"
                width={0}
                height={0}
                sizes="100vw"
                className="w-16 h-16 rounded-full"
              />
              <div className="flex flex-col justify-center">
                <h4 className="font-bold text-xl mb-1">{data.profiles.name}</h4>
                <div className="text-zinc-400 gap-x-3 flex text-sm">
                  <span>Live Sessions ({courseData?.duration}) </span>
                  <ActionTooltip
                    side="bottom"
                    className="bg-layout"
                    label={
                      <div className="text-xs w-[200px]">
                        Live 1:1 sessions are calls with the expert during which
                        they share their wisdom with you as you play.
                      </div>
                    }
                  >
                    <span>
                      <IoMdInformationCircle className="text-green-400 text-xl cursor-pointer" />
                    </span>
                  </ActionTooltip>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-6 items-center w-full">
            <div className="flex items-center gap-x-4">
              <Image
                src={courseData?.game_meta_data.image}
                alt="image"
                width={0}
                height={0}
                sizes="100vw"
                className="w-12 h-12 rounded-lg"
              />
              <div className="uppercase max-w-[80%] text-lg font-bold">
                {courseData.name}
              </div>
            </div>
            <div className="py-2 px-3 flex w-[200px] bg-gray-600 select-none justify-between items-center rounded-lg">
              <FaMinus
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
                className="text-zinc-200 text-xl cursor-pointer"
              />
              <div className="w-10 text-center text-lg">{quantity}</div>
              <FaPlus
                onClick={() => {
                  if (
                    quantity < 10 &&
                    quantity * courseData.price < userDetails?.gbox_money!
                  ) {
                    setQuantity(quantity + 1);
                  }
                }}
                className="text-zinc-200 text-xl cursor-pointer"
              />
            </div>
          </div>
          <div className="w-full">
            <div
              ref={ref}
              className={cn("w-full text-left line-clamp-3 mt-4 mb-1", {
                "line-clamp-none": open,
              })}
            >
              {courseData.description}
            </div>
            {isClamped && (
              <div className="flex justify-start w-full">
                {!open ? (
                  <div
                    onClick={() => {
                      setOpen(true);
                    }}
                    className="text-primary cursor-pointer select-none"
                  >
                    View More
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setOpen(false);
                    }}
                    className="text-primary cursor-pointer select-none"
                  >
                    View Less
                  </div>
                )}
              </div>
            )}
          </div>
          <Separator className="bg-zinc-400 my-2" />
          <h2 className="uppercase w-full mb-3 font-bold">Sessions</h2>
          <div className="flex flex-col gap-y-3 w-full">
            {quantity > 0 ? (
              Array.from({ length: quantity }).map((_, i) => (
                <ScheduleSession key={i} index={i} />
              ))
            ) : (
              <ScheduleSession index={0} />
            )}
          </div>
          <div
            onClick={() => {
              if (
                quantity < 10 &&
                quantity * courseData.price < userDetails?.gbox_money!
              ) {
                setQuantity(quantity + 1);
              }
            }}
            className="w-full center mt-2 cursor-pointer items-center rounded-xl bg-zinc-800 p-4"
          >
            <div className="flex items-center">
              <FaPlus className="text-green-400 text-lg" />
              <div className="text-white ml-2">Add more session</div>
            </div>
          </div>
        </div>
        <div className="flex w-full right-0 left-0 py-4 px-10 bg-background absolute bottom-0 rounded-b-xl mt-3 justify-between items-center">
          <div className="flex flex-col gap-y-1">
            <div className="">Total</div>
            <div className="text-2xl flex items-center font-bold">
              <span>{quantity * courseData.price} </span>
              <span className="text-[#3DBDA7] text-2xl ml-2">G</span>
            </div>
          </div>
          <Button
            onClick={handlePayment}
            className="w-[200px] shine"
            size={"lg"}
          >
            Pay Now
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProcessBuySessionModal;
