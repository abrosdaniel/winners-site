import { NextResponse } from "next/server";
import client from "@services/directus";
import { readItem } from "@directus/sdk";

const monthNames: Record<number, string> = {
  0: "января",
  1: "февраля",
  2: "марта",
  3: "апреля",
  4: "мая",
  5: "июня",
  6: "июля",
  7: "августа",
  8: "сентября",
  9: "октября",
  10: "ноября",
  11: "декабря",
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return {
    day: String(date.getDate()).padStart(2, "0"),
    month: monthNames[date.getMonth()],
    year: date.getFullYear(),
  };
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  try {
    const news = await client.request(
      readItem("news", id!, {
        fields: [
          "id",
          "date_created",
          "status",
          "type",
          "image",
          "title",
          "article",
        ],
      })
    );

    if (!news || news.status !== "published") {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    const newsWithFormattedDate = {
      ...news,
      date_created: formatDate(news.date_created),
    };

    console.log("Formatted News Response:", newsWithFormattedDate);

    return NextResponse.json(newsWithFormattedDate, { status: 200 });
  } catch (error) {
    console.error("Error fetching news item:", error);
    return NextResponse.json(
      { error: "Failed to fetch news item" },
      { status: 500 }
    );
  }
}
