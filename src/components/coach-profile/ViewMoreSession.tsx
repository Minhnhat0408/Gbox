import { useIsClamped } from "@/hooks/useIsClamped";
import { cn } from "@/lib/utils";
import { CourseSessionType } from "@/types/supabaseTableType";
import { useRef, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Button } from "../ui/button";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";
import { useProcessBuySessionModal } from "@/hooks/useProcessBuySessionModal";

const ViewMoreSession = ({ data }: { data: CourseSessionType }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [quantity, setQuantity] = useState(1);

  const { userDetails } = useUser();

  const [open, setOpen] = useState(false);

  const isClamped = useIsClamped(ref);

  const { onOpen } = useProcessBuySessionModal();

  if (!userDetails) return null;

  return (
    <div className="w-full py-3 px-6">
      <div
        ref={ref}
        className={cn("line-clamp-3 text-zinc-200 mb-2", {
          "line-clamp-none": open,
        })}
      >
        {data.description}
      </div>
      {isClamped &&
        (!open ? (
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
        ))}
      {userDetails?.id !== data.coach_profile_id && (
        <div className="w-full mt-6">
          <div className="">
            <div className="mb-4">Enter your quantity</div>
            <div className="flex justify-between items-center">
              <div className="py-2 px-3 flex w-[200px] bg-background select-none justify-between items-center rounded-lg">
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
                    if (quantity < 10) {
                      setQuantity(quantity + 1);
                    }
                  }}
                  className="text-zinc-200 text-xl cursor-pointer"
                />
              </div>
              <div className="text-xl">
                {data.price === 0 ? (
                  "Free"
                ) : (
                  <span className="inline-flex text-3xl font-bold items-center">
                    <span>{data.price * quantity}</span>
                    <span className="text-[#3DBDA7] text-3xl ml-2">G</span>
                  </span>
                )}
              </div>
            </div>
            <Button
              onClick={() => {
                if (data.price * quantity > userDetails.gbox_money!) {
                  return toast.error(
                    "You do not have enough Gbox money to buy this session. Please top up your Gbox money."
                  );
                }
                onOpen(data, quantity);
              }}
              className="w-full rounded-xl mt-6"
              size={"lg"}
            >
              Process to Buy <span className="ml-1">({quantity} session)</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewMoreSession;
