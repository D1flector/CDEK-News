import { IconThumbUp, IconEye } from "@tabler/icons-react";

interface StatBadgeProps {
  type: "like" | "view";
  count: number;
}

const StatBadge = ({ type, count }: StatBadgeProps) => {
  const Icon = type === "like" ? IconThumbUp : IconEye;

  return (
    <div className="flex items-center gap-1 text-[#828282]">
      <Icon size={21} />
      <span className="text-[12px] font-medium leading-none">{count}</span>
    </div>
  );
};

export default StatBadge;
