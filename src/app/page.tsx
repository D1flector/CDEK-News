"use client";

import NewsWidget from "@/components/NewsWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f5f7]">
      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
        <NewsWidget
          title="Новости компании"
          type="company/short"
          displayVariant="all-full"
        />

        <NewsWidget
          title="Бизнес"
          type="company/short"
          displayVariant="first-full"
          isBusiness={true}
        />

        <NewsWidget title="Важные новости" type="company/empty" />
      </div>
    </main>
  );
}
