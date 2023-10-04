type TimeDisplayProps = {
  time: string;
  type: "AM" | "PM";
  color: string;
  dragColor: string;
  isDragging: boolean;
  label: string;
};

function TimeDisplay({
  time,
  type,
  color,
  dragColor,
  isDragging,
  label,
}: TimeDisplayProps) {
  return (
    <div
      className={`absolute select-none z-[1] top-0 left-0 w-full h-full flex flex-col justify-center items-center ${
        isDragging ? `text-[${dragColor}]` : `text-[${color}]`
      }
        }`}
    >
      <div className="text-[16px]">{label}</div>
      <div className="text-[36px] flex justify-center mb-[1.5rem]">
        <code className="text-center">{`${time} ${type}`}</code>
      </div>
    </div>
  );
}

export default TimeDisplay;
