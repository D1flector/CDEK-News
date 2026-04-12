import Image from "next/image";
import { NewsItem } from "@/types/news";
import Tag from "../ui/Tag";
import StatBadge from "../ui/StatBadge";
import { formatDate } from "@/utils/formatDate";
import { IconStarFilled } from "@tabler/icons-react";

const BLUE_SLUGS = new Set(["top"]);

interface NewsCardProps {
  news: NewsItem;
  variant: "full" | "compact" | "horizontal";
  tagVariant?: "gray" | "hashtag";
  priority?: boolean;
  isFirst?: boolean;
}

export const NewsCard = ({
  news,
  variant,
  tagVariant = "gray",
  priority = false,
  isFirst = false,
}: NewsCardProps) => {
  const isHashtagMode = tagVariant === "hashtag";
  const src =
    variant === "full" ? news.imageHD || news.imageLarge : news.imageUrl;

  const isTopNews = isHashtagMode && news.rubrics.some((r) => r.slug === "top");

  return (
    <div
      className={`flex w-full ${
        variant === "horizontal"
          ? "flex-col sm:flex-row sm:gap-6 gap-3"
          : "flex-col gap-4"
      }`}
    >
      {src && (variant === "full" || variant === "horizontal") && (
        <div
          className={`relative overflow-hidden rounded-2xl shrink-0 ${
            variant === "full"
              ? "w-full h-[220px] sm:h-[360px]"
              : isFirst
                ? "w-full h-[200px] sm:w-[240px] sm:h-[160px]"
                : "hidden sm:block sm:w-[240px] sm:h-[160px]"
          }`}
        >
          <Image
            src={src}
            alt={news.title}
            fill
            sizes="(max-width: 640px) 100vw, 400px"
            className="object-cover"
            priority={priority}
          />
        </div>
      )}

      <div className="flex flex-col flex-grow min-w-0 justify-center">
        {isTopNews && (
          <div className="flex items-center gap-1 bg-[#FDF1BA] text-[#71591B] px-2 py-1 rounded-lg w-fit mb-2">
            <IconStarFilled size={14} className="shrink-0" />
            <span className="text-[12px] font-semibold">Топ новость</span>
          </div>
        )}

        {variant === "horizontal" && !isHashtagMode && (
          <span className="text-base text-date mb-1 block font-normal">
            {formatDate(news.publishedAt)}
          </span>
        )}

        <h3 className="font-normal text-title mb-2 text-[18px] leading-[24px]">
          {news.title}
        </h3>

        <div
          className={`flex flex-wrap items-center mt-auto w-full gap-y-2 ${
            isHashtagMode ? "gap-x-2" : "justify-between gap-x-4"
          }`}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex gap-1.5 flex-wrap">
              {news.rubrics.map((r) => (
                <Tag
                  key={r.id}
                  variant={
                    isHashtagMode
                      ? "hashtag"
                      : BLUE_SLUGS.has(r.slug)
                        ? "blue"
                        : "gray"
                  }
                >
                  {r.name}
                </Tag>
              ))}
            </div>

            {isHashtagMode && <span className="text-gray-300">•</span>}

            {(isHashtagMode || variant !== "horizontal") && (
              <span className="text-base text-date font-normal">
                {formatDate(news.publishedAt)}
              </span>
            )}
          </div>

          <div className="flex gap-3 shrink-0 items-center">
            {isHashtagMode && <span className="text-gray-300">•</span>}
            <StatBadge type="like" count={news.likeCount} />
            <StatBadge type="view" count={news.viewCount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
