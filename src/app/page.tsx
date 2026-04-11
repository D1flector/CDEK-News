"use client";

import NewsWidget from "@/components/NewsWidget";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto p-4 md:p-8 flex flex-col gap-10">
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
    </main>
  );
}
