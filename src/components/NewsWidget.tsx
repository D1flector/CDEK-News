"use client";

import { useNews } from "@/hooks/useNews";
import NewsCard from "./news/NewsCard";
import { formatMonthYear } from "@/utils/formatDate";
import {
  WidgetHeader,
  LoaderOverlay,
  LoaderInitial,
  ErrorState,
  EmptyState,
  Pagination,
} from "./widgets/NewsWidgetParts";

interface NewsWidgetProps {
  title: string;
  type: "company/short" | "company/empty";
  displayVariant?: "all-full" | "first-full";
  isBusiness?: boolean;
  shouldPrioritizeFirstImage?: boolean;
}

const NewsWidget = ({
  title,
  type,
  displayVariant = "first-full",
  isBusiness = false,
  shouldPrioritizeFirstImage = false,
}: NewsWidgetProps) => {
  const { data, isLoading, error, nextPage, prevPage, page } = useNews(type);

  const displayDate = formatMonthYear(new Date());
  const hasData = data && data.news.length > 0;

  return (
    <div className="bg-white p-6 rounded-[24px] w-full border border-gray-100">
      <WidgetHeader title={title} date={displayDate} />

      <div className="relative">
        {isLoading && hasData && <LoaderOverlay />}
        {isLoading && !hasData && <LoaderInitial />}
        {error && !isLoading && <ErrorState message={error} />}
        {!error && !isLoading && !hasData && <EmptyState />}

        {!error && hasData && (
          <div className="flex flex-col gap-4">
            {data.news.map((item, index) => {
              const isFirst = index === 0;
              const cardVariant =
                displayVariant === "all-full"
                  ? "horizontal"
                  : isFirst
                    ? "full"
                    : "compact";

              const isPriority =
                shouldPrioritizeFirstImage && page === 1 && isFirst;

              return (
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
                    variant={cardVariant}
                    tagVariant={isBusiness ? "hashtag" : "gray"}
                    priority={isPriority}
                    isFirst={isFirst}
                  />

                  {isBusiness && index < data.news.length - 1 && (
                    <div className="h-[1px] bg-gray-100 mt-4" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {!error && hasData && (
        <Pagination
          onPrev={prevPage}
          onNext={nextPage}
          canPrev={page > 1}
          canNext={page < (data?.totalPages || 0)}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default NewsWidget;
