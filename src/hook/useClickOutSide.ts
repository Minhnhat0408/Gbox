import { log } from "console";
import { MutableRefObject, ReactElement, RefObject, useEffect, useLayoutEffect, useState } from "react"


export default function useClickOutSide(setClose : () => void, ref: RefObject<HTMLElement> , refButton: RefObject<HTMLElement>) : void {
    
    function eventHandler(e: MouseEvent): void {
        const target = e.target as Node

        if(ref.current!= null && ref.current.contains(target))
            return
        
        if(refButton.current != null && refButton.current.contains(target))
            return
        
        setClose()
    }
    

    useEffect(() => {
        window.addEventListener('click', eventHandler)
        return () => window.removeEventListener('click', eventHandler)
    }, [ref?.current])

}