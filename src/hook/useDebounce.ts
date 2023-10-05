import { useEffect, useState } from "react";

interface useDebounceResult<T> {
    delayValue: T,
    isDelaying: boolean
}

export default function useDebounce<T>(value: T, delay: number = 1000, ) : useDebounceResult<T> {
    const [delayValue, setDelayValue] = useState<T>(value);
    const [isDelaying, setIsDelaying] = useState<boolean>(false);
    useEffect(() => {
        setIsDelaying(true)
        const timeout = setTimeout(() => {
            setDelayValue(value)
            setIsDelaying(false)
        }, delay)
        return () => clearTimeout(timeout)
    }, [value])

    return {
        delayValue: delayValue,
        isDelaying: isDelaying
    }
}