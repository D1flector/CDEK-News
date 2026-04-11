import { IconThumbUp, IconEye } from "@tabler/icons-react";

interface StatBadgeProps {
  type: "like" | "view";
  count: number;
}

const StatBadge = ({ type, count }: StatBadgeProps) => {
  const Icon = type === "like" ? IconThumbUp : IconEye;

  return (
    <div className="flex items-center gap-1 text-[#85888E]">
      <Icon size={18} />
      <span className="text-sm font-normal">{count}</span>
    </div>
  );
};

export default StatBadge;
