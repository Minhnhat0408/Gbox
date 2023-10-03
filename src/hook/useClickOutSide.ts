import { log } from "console";
import { MutableRefObject, ReactElement, RefObject, useEffect, useLayoutEffect, useState } from "react"


// function checkContain(parentElement : HTMLElement, childElement : HTMLElement) : boolean {
//     const childs = parentElement.children
    
//     for(let i = 0; i < childs.length; i++) {
//         if(childs[i] == childElement)
//             return true;
//     }

//     for(let i = 0; i < childs.length; i++) {
//         const result = checkContain(childs[i] as HTMLElement, childElement)
//         if(result)
//             return true
//     }

//     return false
// }


export default function useClickOutSide(setClose : () => void, ref: RefObject<HTMLElement> , refButton: RefObject<HTMLElement>) : void {
    
    function eventHandler(e: MouseEvent): void {
        const target = e.target as Node

        if(ref.current!= null && ref.current.contains(target))
            return
        
        if(refButton.current != null && refButton.current.contains(target))
            return
        
        // if(ref.current && checkContain(ref.current, target as HTMLElement))
        //     return

        // if(refButton.current && checkContain(refButton.current, target as HTMLElement))
        //     return

        console.log(123);
        
        setClose()
    }
    

    useEffect(() => {
        window.addEventListener('click', eventHandler)
        return () => window.removeEventListener('click', eventHandler)
    }, [ref?.current])

}