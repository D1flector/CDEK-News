"use client";
import { useNews } from "@/hooks/useNews";
import NewsCard from "./news/NewsCard";
import IconButton from "./ui/IconButton";
import { formatMonthYear } from "@/utils/formatDate";
import Image from "next/image";

interface NewsWidgetProps {
  title: string;
  type: "company/short" | "company/empty";
  displayVariant?: "all-full" | "first-full";
  isBusiness?: boolean;
}

const NewsWidget = ({
  title,
  type,
  displayVariant = "first-full",
  isBusiness = false,
}: NewsWidgetProps) => {
  const { data, isLoading, error, nextPage, prevPage, page } = useNews(type);
  const displayDate = formatMonthYear(new Date());

  const hasData = data && data.news.length > 0;

  return (
    <div className="bg-white p-6 rounded-[24px] w-full border border-gray-100">
      <div className="pb-4 border-b border-gray-300 mb-6">
        <h2 className="text-2xl font-bold text-title">{title}</h2>
        <span className="text-base text-date mt-1 block capitalize">
          {displayDate}
        </span>
      </div>

      <div className="relative">
        {isLoading && hasData && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-500 rounded-full animate-spin" />
          </div>
        )}

        {isLoading && !hasData && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-500 rounded-full animate-spin" />
            <span className="text-sm text-gray-400">Загрузка новостей...</span>
          </div>
        )}

        {error && !isLoading && (
          <div className="flex flex-col items-center py-20 text-red-400">
            <p>{error}</p>
          </div>
        )}

        {!error && !isLoading && !hasData && (
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
        )}

        {!error && hasData && (
          <div className="flex flex-col gap-4">
            {data.news.map((item, index) => (
              <div
                key={item.id}
                className="w-full animate-fade-in-up opacity-0"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <NewsCard
                  news={item}
                  variant={
                    displayVariant === "all-full"
                      ? "horizontal"
                      : index === 0
                        ? "full"
                        : "compact"
                  }
                  tagVariant={isBusiness ? "hashtag" : "gray"}
                  priority={index === 0}
                  isFirst={index === 0}
                />

                {isBusiness && index < data.news.length - 1 && (
                  <div className="h-[1px] bg-gray-100 mt-4" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {!error && hasData && (
        <div className="flex justify-end gap-2 mt-6">
          <IconButton
            direction="left"
            onClick={prevPage}
            disabled={page === 1 || isLoading}
          />
          <IconButton
            direction="right"
            onClick={nextPage}
            disabled={page >= data.totalPages || isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default NewsWidget;
