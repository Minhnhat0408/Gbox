'use client'

import useClickOutSide from "@/hook/useClickOutSide";
import { title } from "process"
import React, { ReactElement, RefObject, createRef, useEffect, useRef, useState } from "react"
import {BsXLg} from "react-icons/bs";
import { boolean } from "zod";

export interface PopupControl {
    isOpen: boolean,
    setOpen: () => void,
    setClose: () => void,
    refButtonOpen: RefObject<HTMLElement>

}

interface PopupProps {
    children: ReactElement
    title: string
    popupControl: PopupControl
}


const Popup  = React.forwardRef<HTMLElement, PopupProps>(({children, title, popupControl}, ref) => {
  
    const popupRef = useRef<HTMLDivElement>(null);
    
    useClickOutSide( popupControl.setClose, popupRef, popupControl.refButtonOpen)


    return <div className={`${popupControl.isOpen? 'fixed': 'hidden'} inset-0 bg-black bg-opacity-0 flex items-center justify-center`}>
       <div ref={popupRef} className="popup-wrapper rounded-2xl  border border-[#666]">
            <div className="relative flex justify-between items-center py-5 px-3 border-b border-b-[#666] shadow-lg">
                <span className="text-white text-xl font-semibold ">{title}</span>
                <span onClick={() => popupControl.setClose()} className="w-8 h-8 border border-[#666] rounded-full flex items-center justify-center cursor-pointer"><BsXLg></BsXLg></span>
            </div>
            <div className="popup-content">
                {children}
            </div>
       </div>
    </div>
})

export function usePopupControl(defaultOpen: boolean, refOpenButton: RefObject<HTMLElement>): PopupControl {
    const [isOpen, setIsOpen] = useState(defaultOpen)
    return {
        isOpen: isOpen,
        setClose: () => setIsOpen(false),
        setOpen: () => setIsOpen(true),
        refButtonOpen: refOpenButton
    }
}

Popup.displayName = 'popup'

export default Popup
