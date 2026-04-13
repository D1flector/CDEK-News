import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") || "1";
  const perPage = searchParams.get("perPage") || "3";
  const type = searchParams.get("type") || "company/short";

  const apiUrl = `http://1e14c3489fcb.vps.myjino.ru:5000/api/v1/news/feed/${type}?perPage=${perPage}&page=${page}`;

  try {
    const res = await fetch(apiUrl, {
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Ошибка API" }, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control":
          "public, max-age=300, s-maxage=600, stale-while-revalidate=59",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Ошибка соединения с сервером" },
      { status: 500 }, // чтобы не было бесконечной загрузки
    );
  }
}
