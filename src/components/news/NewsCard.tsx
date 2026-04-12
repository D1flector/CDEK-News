import { NewsItem } from "@/types/news";
import { formatDate } from "@/utils/formatDate";
import { NewsImage, TopNewsBadge, NewsFooter } from "./NewsCardParts";

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

  const imageSrc =
    variant === "full" ? news.imageHD || news.imageLarge : news.imageUrl;
  const isTopNews = isHashtagMode && news.rubrics.some((r) => r.slug === "top");

  return (
    <div
      className={`flex w-full ${variant === "horizontal" ? "flex-col sm:flex-row sm:gap-6 gap-3" : "flex-col gap-4"}`}
    >
      {imageSrc && (variant === "full" || variant === "horizontal") && (
        <NewsImage
          src={imageSrc}
          alt={news.title}
          variant={variant}
          isFirst={isFirst}
          priority={priority}
        />
      )}

      <div className="flex flex-col flex-grow min-w-0 justify-center">
        {isTopNews && <TopNewsBadge />}

        {variant === "horizontal" && !isHashtagMode && (
          <span className="text-base text-date mb-1 block font-normal">
            {formatDate(news.publishedAt)}
          </span>
        )}

        <h3 className="font-normal text-title mb-2 text-[18px] leading-[24px]">
          {news.title}
        </h3>

        <NewsFooter
          news={news}
          isHashtagMode={isHashtagMode}
          variant={variant}
          blueSlugs={BLUE_SLUGS}
        />
      </div>
    </div>
  );
};

export default NewsCard;
