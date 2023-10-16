"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

const CopyProfileButton = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, []);

  return (
    <button
      onClick={(e) => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        toast.success("Copied to clipboard !");
      }}
      className="bg-gray-400 bg-opacity-90 py-1.5 px-3 rounded-lg text-[0.75rem] text-center min-w-[121px]"
    >
      {copied ? "Copied" : "Copy Profile Link"}
    </button>
  );
};

export default CopyProfileButton;
