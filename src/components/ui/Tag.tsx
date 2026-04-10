import React, { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  variant: "gray" | "blue";
}

const Tag = ({ children, variant = "gray" }: TagProps) => {
  const baseStyles =
    "px-2 py-0.5 rounded-[4px] text-[10px] font-medium leading-4 inline-block whitespace-nowrap";
  const variantStyles =
    variant === "blue"
      ? "bg-[#AAD7FB] text-[#0E2A45]"
      : "bg-[#E2E2E4] text-[#000000]";

  return <span className={`${baseStyles} ${variantStyles}`}>{children}</span>;
};

export default Tag;
