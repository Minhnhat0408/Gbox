import { useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { useDisplayCongratulations } from "@/hooks/useDisplayCongratulations";
import Modal from "../modals/Modal";
import { cn } from "@/lib/utils";
import Image from "next/image";


// prettier-ignore
const h1Phrases = [
  'Congratulations!',
  'Way to go!',
  'Woohoo!',
  'Bravo!',
  'Cheers!',
]

// prettier-ignore
const h2Sentences = [
  `You've found your best team!`,
  `The greatest team ever!`,
  `Gbox's Gamers assemble!`,
  `Let the game begin!`,
]



export default function CongratulationsModal() {
  const { isOpen, onClose } = useDisplayCongratulations((set) => set);
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  useEffect(() => {
    //set the title randomly
    const randomIndex = Math.floor(Math.random() * h1Phrases.length);
    setTitle(h1Phrases[randomIndex]);
    //set the subtitle randomly
    const randomIndex2 = Math.floor(Math.random() * h2Sentences.length);
    setSubtitle(h2Sentences[randomIndex2]);
  }, [isOpen]);
  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className={cn(
        "p-0  max-w-[80vh]  justify-evenly flex bg-transparent  remove-button"
      )}
    >
      <div className="flex flex-col gap-y-8 border-primary   border-[10px] rounded-[60px]  shine-2 h-[60vh]  w-[70vh]     justify-center items-center overflow-x-hidden overflow-y-auto ">
        
          <h1 className="text-center  text-5xl font-bold tracking-wider super ">{title}</h1>
    

        <div className="w-fit h-fit">
          <Image
            src={"/images/logo.png"}
            width={0}
            height={0}
            alt="congrat"
            sizes="100vw"
            className="w-[200px] h-[200px]"
          />
        </div>

        <h2 className="super-secondary font-bold italic text-2xl">🔥 {subtitle} 🔥</h2>

        
      </div>

      <ConfettiExplosion
        zIndex={100}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      />
    </Modal>
  );
}
