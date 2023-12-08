import { RxLapTimer } from "react-icons/rx";
import { convertStarttimeAndDurationToString } from "@/lib/convertStarttimeAndDurationToString";
import { getFormattedTime } from "@/lib/getFormattedTime";
import { StudentRequestTypeWithStudentAndCourse } from "@/types/supabaseTableType";

const SessionDesicion = ({
  data,
  session,
}: {
  session: string;
  data: StudentRequestTypeWithStudentAndCourse;
}) => {
  const date = new Date(session);

  return (
    <div className="w-full select-none flex bg-zinc-900 rounded-xl items-center p-4">
      <div className="w-14 h-14 center">
        <div className="flex flex-col items-center">
          <h3 className="leading-none tracking-[0.01] mb-2 font-semibold">
            {date.getDate()}
          </h3>
          <h3 className="text-sm leading-none">
            {date.toLocaleString("default", {
              month: "short",
            })}
          </h3>
        </div>
      </div>
      <div className="flex-1 pl-3 flex w-full items-center">
        <div className="flex flex-col ml-2">
          <div className="leading-none tracking-0.01 mb-3 font-semibold">
            {convertStarttimeAndDurationToString(
              getFormattedTime(date),
              data.course_session.duration
            )}
          </div>
          <div className="text-sm leading-none">
            {data.course_session.duration}
          </div>
        </div>
      </div>
      <div className="ml-auto pr-3 flex w-auto">
        <RxLapTimer className="text-teal-500 text-3xl" />
      </div>
    </div>
  );
};

export default SessionDesicion;
