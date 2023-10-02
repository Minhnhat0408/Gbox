'use client'

import { title } from "process"
import React, { ReactElement, useState } from "react"
import {BsXLg} from "react-icons/bs";

interface PopupControl {
    isOpen: boolean
    setOpen: Function
    setClose: Function
}

interface PopupProps {
    children: ReactElement
    title: string
    popupControl: PopupControl
}


const Popup  = React.forwardRef<HTMLElement, PopupProps>(({children, title, popupControl}, ref) => {
    
    function close() {
        popupControl.setClose()
    }

    

    return <div className={`${popupControl.isOpen? 'fixed': 'hidden'} inset-0 bg-black bg-opacity-0 flex items-center justify-center`}>
       <div className="popup-wrapper rounded-2xl overflow-hidden border border-[#666]">
            <div className="relative flex justify-between items-center py-5 px-3 border-b border-b-[#666] shadow-lg">
                <span className="text-white text-xl font-semibold ">{title}</span>
                <span onClick={close} className="w-8 h-8 border border-[#666] rounded-full flex items-center justify-center cursor-pointer"><BsXLg></BsXLg></span>
            </div>
            <div className="popup-content">
                {children}
            </div>
       </div>
    </div>
})

export function usePopupControl(defaultOpen: boolean): PopupControl {
    const [isOpen, setIsOpen] = useState(defaultOpen)
    return {
        isOpen: isOpen,
        setClose: () => setIsOpen(false),
        setOpen: () => setIsOpen(true)
    }
}

export default Popup
