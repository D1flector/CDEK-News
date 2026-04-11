import Image from "next/image";
import { NewsItem } from "@/types/news";
import Tag from "../ui/Tag";
import StatBadge from "../ui/StatBadge";
import { formatDate } from "@/utils/formatDate";

const BLUE_SLUGS = new Set(["top"]);

interface NewsCardProps {
  news: NewsItem;
  variant: "full" | "compact" | "horizontal";
  tagVariant?: "gray" | "hashtag";
  priority?: boolean;
}

export const NewsCard = ({
  news,
  variant,
  tagVariant = "gray",
  priority = false,
}: NewsCardProps) => {
  return (
    <div
      className={`flex w-full ${
        variant === "horizontal"
          ? "flex-row gap-4 min-h-[110px]"
          : "flex-col gap-3"
      }`}
    >
      {(variant === "full" || variant === "horizontal") && news.imageUrl && (
        <div
          className={`relative overflow-hidden rounded-xl shrink-0 ${
            variant === "horizontal"
              ? "w-[160px] h-[110px]"
              : "w-full h-[220px]"
          }`}
        >
          <Image
            src={news.imageUrl}
            alt={news.title}
            fill
            sizes={
              variant === "horizontal"
                ? "160px"
                : "(max-width: 768px) 100vw, 600px"
            }
            className="object-cover"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
          />
        </div>
      )}

      <div className="flex flex-col flex-grow min-w-0 justify-center gap-1.5">
        {/* Дата над заголовком — только в horizontal */}
        {variant === "horizontal" && (
          <span className="text-[12px] text-date">
            {formatDate(news.publishedAt)}
          </span>
        )}

        <h3
          className={`font-medium text-title leading-snug ${
            variant === "compact" ? "text-base" : "text-lg"
          }`}
        >
          {news.title}
        </h3>

        <div className="flex items-center gap-2 flex-wrap text-[12px] text-date">
          <div className="flex gap-1.5 flex-wrap">
            {news.rubrics.map((r) => (
              <Tag
                key={r.id}
                variant={
                  tagVariant === "hashtag"
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

          {variant !== "horizontal" && (
            <span className="text-date">{formatDate(news.publishedAt)}</span>
          )}

          <div className="flex gap-3 ml-auto shrink-0">
            <StatBadge type="like" count={news.likeCount} />
            <StatBadge type="view" count={news.viewCount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
