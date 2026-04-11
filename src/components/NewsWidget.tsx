"use client";

import { useNews } from "@/hooks/useNews";
import NewsCard from "./news/NewsCard";
import IconButton from "./ui/IconButton";
import { formatMonthYear } from "@/utils/formatDate";

interface NewsWidgetProps {
  title: string;
  type: "company/short" | "company/empty";
  displayVariant?: "all-full" | "first-full";
}

const NewsWidget = ({
  title,
  type,
  displayVariant = "first-full",
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
      <div className="bg-white p-6 rounded-2xl w-full border border-gray-100 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-6 self-start">{title}</h2>
        <div className="flex flex-col items-center gap-4 py-10 text-muted">
          <p>Новых новостей нет</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl w-full border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-title">{title}</h2>
        <span className="text-sm text-date capitalize">{displayDate}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.news.map((item, index) => (
          <NewsCard
            key={item.id}
            news={item}
            variant={
              displayVariant === "all-full" || index === 0 ? "full" : "compact"
            }
          />
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
