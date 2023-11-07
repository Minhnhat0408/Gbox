"use client"
import {  useCallback, useRef } from "react"


  export default function useThrottle<T extends any>(func :  () => void, delay:number) {
    const lastRan = useRef(Date.now());
  
    const throttledFunc = useCallback(() => {
      const handler = setTimeout(function() {
        if (Date.now() - lastRan.current >= delay) {
          func()
          lastRan.current = Date.now();
        }
      }, delay - (Date.now() - lastRan.current));
  
      return () => {
        clearTimeout(handler);
      };
    }, [func, delay]);
  
    return throttledFunc;
  };