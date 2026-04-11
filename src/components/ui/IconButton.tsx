import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface IconButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}

const IconButton = ({ direction, onClick, disabled }: IconButtonProps) => {
  const Icon = direction === "left" ? IconChevronLeft : IconChevronRight;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`p-2 rounded-full transition-colors flex items-center justify-center
        ${
          disabled
            ? "opacity-30 cursor-not-allowed"
            : "hover:bg-gray-100 cursor-pointer text-[#2B2E33]"
        }`}
    >
      <Icon size={18} />
    </button>
  );
};

export default IconButton;
