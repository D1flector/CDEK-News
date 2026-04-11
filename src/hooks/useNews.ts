import { useState, useEffect } from "react";
import { NewsResponse, NewsItem } from "@/types/news";

const BASE_URL = "http://1e14c3489fcb.vps.myjino.ru:5000";

export const useNews = (type: string, perPage: number = 3) => {
  const [data, setData] = useState<NewsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        setError(null);
        setIsLoading(true);
        const res = await fetch(
          `/api/news?type=${type}&page=${page}&perPage=${perPage}`,
        );

        if (!res.ok) throw new Error(`Сервер ответил ошибкой: ${res.status}`);

        const dataFromServer: NewsResponse = await res.json();

        const normalizedNews = dataFromServer.news.map((item: NewsItem) => {
          const img = item.cover?.images[0];

          const getFullUrl = (path?: string) => {
            if (!path) return null;
            return path.startsWith("http") ? path : `${BASE_URL}${path}`;
          };

          return {
            ...item,
            imageSmall: getFullUrl(img?.s),
            imageUrl: getFullUrl(img?.m),
            imageLarge: getFullUrl(img?.l),
            imageHD: getFullUrl(img?.hd),
          };
        });

        setData({
          ...dataFromServer,
          news: normalizedNews,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [type, page, perPage]);

  const nextPage = () => {
    if (data && page < data.totalPages) setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return { data, isLoading, error, page, nextPage, prevPage };
};
