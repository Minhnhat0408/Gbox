import useMessageBox from "@/hooks/useMessageBox";
import Image from "next/image";

export default function MessageWelcome() {
  const { currentMessage } = useMessageBox();
  return (
    <section className="w-full flex flex-col items-center gap-y-4 my-10">
      <Image
        src={currentMessage?.avatar || "/image 1.png"}
        width={0}
        height={0}
        sizes="100vw"
        className="w-20 h-20 rounded-full border-2 border-primary" 
        alt="av"
      />
      <h1 className="text-2xl font-bold text-center super">{currentMessage?.name}</h1>
      <p className="text-center text--muted-foreground italic">
        Send a message to start a conversation
      </p>
    </section>
  );
}
