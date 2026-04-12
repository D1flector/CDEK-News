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
  isFirst?: boolean;
}

export const NewsCard = ({
  news,
  variant,
  tagVariant = "gray",
  priority = false,
  isFirst = false,
}: NewsCardProps) => {
  const src =
    variant === "full" ? news.imageHD || news.imageLarge : news.imageUrl;

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

      {/* ТЕКСТ */}
      <div className="flex flex-col flex-grow min-w-0 justify-center">
        {variant === "horizontal" && (
          <span className="text-xs text-date mb-1 block font-normal">
            {formatDate(news.publishedAt)}
          </span>
        )}

        <h3
          className={`font-normal text-title leading-tight mb-2 ${
            variant === "compact" ? "text-sm" : "text-sm sm:text-base"
          }`}
        >
          {news.title}
        </h3>

        <div className="flex items-center gap-2 flex-wrap mt-auto">
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
            <span className="text-xs text-date ml-1 font-normal">
              {formatDate(news.publishedAt)}
            </span>
          )}

          <div className="flex gap-4 ml-auto shrink-0 items-center">
            <StatBadge type="like" count={news.likeCount} />
            <StatBadge type="view" count={news.viewCount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
