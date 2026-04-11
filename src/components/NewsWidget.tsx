"use client";
import { useNews } from "@/hooks/useNews";
import NewsCard from "./news/NewsCard";
import IconButton from "./ui/IconButton";
import { formatMonthYear } from "@/utils/formatDate";

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

  if (isLoading) {
    return <div className="p-8 text-center text-muted">Загрузка...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  if (!data || data.news.length === 0) {
    return (
      <div className="bg-white p-6 rounded-[24px] w-full border border-gray-100">
        <div className="pb-4 border-b border-gray-100 mb-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-title">{title}</h2>
            <span className="text-sm text-date capitalize">{displayDate}</span>
          </div>
        </div>
        <div className="flex flex-col items-center py-20 text-muted italic">
          <p>Новых новостей нет</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-[24px] w-full border border-gray-100">
      <div className="pb-4 border-b border-gray-100 mb-6">
        <h2 className="text-2xl font-bold text-title">{title}</h2>
        <span className="text-sm text-date capitalize mt-1 block">
          {displayDate}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {data.news.map((item, index) => (
          <div key={item.id} className="w-full">
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
            />

            {isBusiness && index < data.news.length - 1 && (
              <div className="h-[1px] bg-gray-100 mt-4" />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <IconButton direction="left" onClick={prevPage} disabled={page === 1} />
        <IconButton
          direction="right"
          onClick={nextPage}
          disabled={page >= data.totalPages}
        />
      </div>
    </div>
  );
};

export default NewsWidget;
