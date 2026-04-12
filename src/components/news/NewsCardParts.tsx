import Image from "next/image";
import { IconStarFilled } from "@tabler/icons-react";
import Tag from "../ui/Tag";
import StatBadge from "../ui/StatBadge";
import { formatDate } from "@/utils/formatDate";
import { NewsItem } from "@/types/news";

interface ImageProps {
  src: string;
  alt: string;
  variant: string;
  isFirst: boolean;
  priority: boolean;
}

export const NewsImage = ({
  src,
  alt,
  variant,
  isFirst,
  priority,
}: ImageProps) => {
  const classes = `relative overflow-hidden rounded-2xl shrink-0 ${
    variant === "full"
      ? "w-full h-[220px] sm:h-[360px]"
      : isFirst
        ? "w-full h-[200px] sm:w-[240px] sm:h-[160px]"
        : "hidden sm:block sm:w-[240px] sm:h-[160px]"
  }`;

  return (
    <div className={classes}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, 400px"
        className="object-cover"
        priority={priority}
      />
    </div>
  );
};

export const TopNewsBadge = () => (
  <div className="flex items-center gap-1 bg-[#FDF1BA] text-[#71591B] px-2 py-1 rounded-lg w-fit mb-2">
    <IconStarFilled size={14} className="shrink-0" />
    <span className="text-[12px] font-semibold">Топ новость</span>
  </div>
);

interface FooterProps {
  news: NewsItem;
  isHashtagMode: boolean;
  variant: string;
  blueSlugs: Set<string>;
}

export const NewsFooter = ({
  news,
  isHashtagMode,
  variant,
  blueSlugs,
}: FooterProps) => {
  const containerClasses = `flex flex-wrap items-center mt-auto w-full gap-y-2 ${
    isHashtagMode ? "gap-x-2" : "justify-between gap-x-4"
  }`;

  return (
    <div className={containerClasses}>
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex gap-1.5 flex-wrap">
          {news.rubrics.map((r) => (
            <Tag
              key={r.id}
              variant={
                isHashtagMode
                  ? "hashtag"
                  : blueSlugs.has(r.slug)
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
  );
};
