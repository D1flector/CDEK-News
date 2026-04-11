export interface Rubric {
  id: number;
  slug: string;
  name: string;
}

export interface NewsImage {
  s: string;
  m: string;
  l: string;
  hd: string;
}

export interface Cover {
  type: string;
  images: NewsImage[];
}

export interface NewsItem {
  id: string;
  title: string;
  cover: Cover;
  likeCount: number;
  viewCount: number;
  publishedAt: string;
  rubrics: Rubric[];
  // Наши обработанные ссылки
  imageSmall?: string | null;
  imageUrl?: string | null;
  imageLarge?: string | null;
  imageHD?: string | null;
}

export interface NewsResponse {
  totalPages: number;
  perPage: number;
  news: NewsItem[];
  minDatePublication: string;
}
