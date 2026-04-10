import { useState, useEffect } from "react";
import { NewsResponse } from "@/types/news";

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

        if (!res.ok) {
          throw new Error(`Сервер ответил ошибкой: ${res.status}`);
        }

        const dataFromServer = await res.json();
        setData(dataFromServer);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Произошла неизвестная ошибка");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [type, page, perPage]);

  const nextPage = () => {
    if (data && page < data.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return { data, isLoading, error, page, nextPage, prevPage };
};
