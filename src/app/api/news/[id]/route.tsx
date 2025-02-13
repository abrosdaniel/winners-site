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
    time: date.toTimeString().slice(0, 5),
  };
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);
  const id = pathname.split("/").pop();
  try {
    const news = await client.request(
      readItem("news", id!, {
        fields: [
          "id",
          "date_created",
          "date_updated",
          "status",
          "image",
          "title",
          "article",
        ],
      })
    );

    if (!news || news.status !== "published") {
      return new Response(JSON.stringify({ error: "News not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const newsWithFormattedDate = {
      ...news,
      date_created: formatDate(news.date_created),
    };

    console.log("Formatted News Response:", newsWithFormattedDate);

    return new Response(JSON.stringify(newsWithFormattedDate), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching news item:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch news item" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
