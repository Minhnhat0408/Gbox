import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { MdTaskAlt } from "react-icons/md";
import { ActionTooltip } from "../action-tooltips/ActionToolTips";
import { useMissionsModal } from "@/hooks/useMissionsModal";

const Missions = () => {
  const [jobLeft, setJobLeft] = useState(10);

  const { missions } = useUser();

  const { onOpen } = useMissionsModal();

  // TODO: Real time missions
  useEffect(() => {}, [missions]);

  return (
    <ActionTooltip label={<p className="text-md font-semibold">Missions</p>}>
      <div
        onClick={() => {
          if (missions) {
            onOpen(missions);
          }
        }}
        className="text-3xl p-2 relative rounded-full cursor-pointer hover:bg-emerald-600"
      >
        <MdTaskAlt />
        {jobLeft > 0 && (
          <div className="absolute top-0 -right-1 rounded-full h-6 w-6 center bg-red-400">
            <span className="text-white text-sm font-bold">{jobLeft}</span>
          </div>
        )}
      </div>
    </ActionTooltip>
  );
};

export default Missions;
