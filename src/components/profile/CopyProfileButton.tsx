"use client";

import { Copy } from "lucide-react";
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
      className="bg-secondary flex items-center   py-1.5 px-3 rounded-lg text-[0.75rem] text-center "
    >
      <Copy className="w-3 h-3 mr-1" />
      {copied ? "Copied" : "Copy Profile Link"}
    </button>
  );
};

export default CopyProfileButton;
