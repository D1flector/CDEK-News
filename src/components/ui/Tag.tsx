import React, { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  variant?: "gray" | "blue" | "hashtag";
}

const Tag = ({ children, variant = "gray" }: TagProps) => {
  const baseStyles =
    "text-[12px] font-medium inline-block whitespace-nowrap transition-colors";

  const variants = {
    gray: "bg-[#E2E2E4] text-[#000000] px-2 py-0.5 rounded-[4px]",
    blue: "bg-[#AAD7FB] text-[#0E2A45] px-2 py-0.5 rounded-[4px]",
    hashtag: "text-[#85888E] hover:text-title",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]}`}>
      {variant === "hashtag" ? `#${children}` : children}
    </span>
  );
};

export default Tag;
