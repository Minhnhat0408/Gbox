import { useEffect, useState } from "react";

export function useIsClamped(ref: React.RefObject<HTMLDivElement>) {
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const { clientHeight, scrollHeight } = ref.current;
    setIsClamped(scrollHeight > clientHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return isClamped;
}
