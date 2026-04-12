import Image from "next/image";
import IconButton from "../ui/IconButton";

export const WidgetHeader = ({
  title,
  date,
}: {
  title: string;
  date: string;
}) => (
  <div className="pb-4 border-b border-gray-300 mb-6">
    <h2 className="text-2xl font-bold text-title">{title}</h2>
    <span className="text-base text-date mt-1 block capitalize">{date}</span>
  </div>
);

export const LoaderOverlay = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
    <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-500 rounded-full animate-spin" />
  </div>
);

export const LoaderInitial = () => (
  <div className="flex flex-col items-center justify-center py-20 gap-3">
    <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-500 rounded-full animate-spin" />
    <span className="text-sm text-gray-400">Загрузка новостей...</span>
  </div>
);

export const ErrorState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center py-20 text-red-400">
    <p>{message}</p>
  </div>
);

export const EmptyState = () => (
  <div className="flex flex-col items-center">
    <div className="relative w-[160px] h-[160px]">
      <Image
        src="/images/empty-news.svg"
        alt="Новых новостей нет"
        fill
        className="object-contain"
      />
    </div>
    <p className="text-title font-bold">Новых новостей нет</p>
  </div>
);

interface PaginationProps {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  isLoading: boolean;
}

export const Pagination = ({
  onPrev,
  onNext,
  canPrev,
  canNext,
  isLoading,
}: PaginationProps) => (
  <div className="flex justify-end gap-2 mt-6">
    <IconButton
      direction="left"
      onClick={onPrev}
      disabled={!canPrev || isLoading}
    />
    <IconButton
      direction="right"
      onClick={onNext}
      disabled={!canNext || isLoading}
    />
  </div>
);
