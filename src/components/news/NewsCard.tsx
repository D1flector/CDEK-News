import Image from "next/image";
import { NewsItem } from "@/types/news";
import Tag from "../ui/Tag";
import StatBadge from "../ui/StatBadge";
import { formatDate } from "@/utils/formatDate";

interface NewsCardProps {
  news: NewsItem;
  variant: "full" | "compact";
}

export const NewsCard = ({ news, variant }: NewsCardProps) => {
  return (
    <div className="bg-card-bg rounded-xl p-4 flex flex-col gap-[14px] transition-shadow hover:shadow-md border border-gray-100 h-full">
      {variant === "full" && news.imageUrl && (
        <div className="relative w-full h-40 overflow-hidden rounded-lg">
          <Image
            src={news.imageUrl}
            alt={news.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      )}

      <span className="text-[12px] text-date">
        {formatDate(news.publishedAt)}
      </span>

      <h3 className="font-medium text-lg leading-[24px] text-title flex-grow">
        {news.title}
      </h3>

      <div className="flex items-center justify-between mt-auto pt-2">
        <div className="flex gap-2">
          {news.rubrics.map((r) => (
            <Tag key={r.id} variant="gray">
              {r.name}
            </Tag>
          ))}
        </div>

        <div className="flex gap-3">
          <StatBadge type="like" count={news.likeCount} />
          <StatBadge type="view" count={news.viewCount} />
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
