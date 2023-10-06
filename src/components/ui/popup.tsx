"use client";

import useClickOutSide from "@/hook/useClickOutSide";
import { title } from "process";
import React, {
  ReactElement,
  RefObject,
  createRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsXLg } from "react-icons/bs";
import { boolean } from "zod";

export interface PopupControl {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
  refButtonOpen: RefObject<HTMLElement>;
}

interface PopupProps {
  children: ReactElement;
  title: string;
  popupControl: PopupControl;
}

const Popup = React.forwardRef<HTMLElement, PopupProps>(
  ({ children, title, popupControl }, ref) => {
    const popupRef = useRef<HTMLDivElement>(null);
    const headRef = useRef<HTMLDivElement>(null);
    useClickOutSide(
      popupControl.setClose,
      popupRef,
      popupControl.refButtonOpen
    );

    useEffect(() => {
      if (popupRef.current != null && headRef.current != null) {
        const wrapElement = popupRef.current.parentElement;
        if (wrapElement?.parentElement != null) {
          const parantStyle = window.getComputedStyle(
            wrapElement.parentElement,
            null
          );
          const bgColor = parantStyle.getPropertyValue("background-color");
          headRef.current.style.backgroundColor = bgColor;
        }
      }
    }, [popupRef.current, headRef.current]);

    return (
      <div
        className={`${
          popupControl.isOpen ? "fixed" : "hidden"
        } inset-0 bg-black bg-opacity-30 flex items-center justify-center`}
      >
        <div ref={popupRef} className="popup-wrapper rounded-2xl">
          <div
            ref={headRef}
            className="rounded-tr-2xl rounded-tl-2xl relative flex justify-between items-center py-5 px-3 shadow-lg"
          >
            <span className="text-white text-xl font-semibold">{title}</span>
            <span
              onClick={() => popupControl.setClose()}
              className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
            >
              <BsXLg></BsXLg>
            </span>
          </div>
          <div className="popup-content rounded-bl-2xl rounded-br-2xl">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

export function usePopupControl(
  defaultOpen: boolean,
  refOpenButton: RefObject<HTMLElement>
): PopupControl {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return {
    isOpen: isOpen,
    setClose: () => setIsOpen(false),
    setOpen: () => setIsOpen(true),
    refButtonOpen: refOpenButton,
  };
}

Popup.displayName = "popup";

export default Popup;
