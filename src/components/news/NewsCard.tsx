import Image from "next/image";
import { NewsItem } from "@/types/news";
import Tag from "../ui/Tag";
import StatBadge from "../ui/StatBadge";

interface NewsCardProps {
  news: NewsItem;
  variant: "full" | "compact";
}

export const NewsCard = ({ news, variant }: NewsCardProps) => {
  return (
    <div className="bg-card-bg rounded-xl p-4 flex flex-col gap-[14px] transition-shadow hover:shadow-md border border-gray-100">
      {variant === "full" && news.cover?.images[0] && (
        <div className="relative w-full h-40">
          <Image
            src={news.cover.images[0].m}
            alt={news.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <span className="text-[12px] text-date">
        {new Date(news.publishedAt).toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "long",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>

      <h3 className="font-medium text-lg leading-[23.63px] text-title">
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
