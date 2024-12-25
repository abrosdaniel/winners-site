import { NextResponse } from "next/server";
import client from "@services/directus";
import { readItems } from "@directus/sdk";

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

export async function GET() {
  try {
    const [news, video, players, agency, gallery, contactsArray] =
      await Promise.all([
        client.request(
          readItems("news", {
            fields: [
              "id",
              "date_created",
              "date_updated",
              "status",
              "image",
              "title",
              "article",
            ],
            filter: { status: { _eq: "published" } },
            sort: "-date_created",
          })
        ),
        client.request(
          readItems("video", {
            fields: [
              "id",
              "date_created",
              "date_updated",
              "status",
              "title",
              "preview",
              "video",
            ],
            filter: { status: { _eq: "published" } },
            sort: "-date_created",
          })
        ),
        client.request(
          readItems("players", {
            fields: [
              "id",
              "status",
              "photo",
              "name",
              "birthday",
              "height",
              "weight",
              "role",
              "grip",
              "team.icon",
              "team.name",
              "league.name",
              "stats",
            ],
            filter: { status: { _eq: "published" } },
          })
        ),
        client.request(
          readItems("agency", {
            fields: ["id", "photo", "name", "type", "email"],
          })
        ),
        client.request(
          readItems("about_gallery", {
            fields: ["id", "image"],
            filter: { status: { _eq: "published" } },
          })
        ),
        client.request(
          readItems("contacts", {
            fields: [
              "id",
              "instagram",
              "telegram",
              "whatsapp",
              "email",
              "phone",
            ],
          })
        ),
      ]);

    const newsWithFormattedDates = news.map((item: any) => ({
      ...item,
      date_created: formatDate(item.date_created),
    }));

    const playersWithFormattedData = players.map((player: any) => ({
      ...player,
      birthday: player.birthday
        ? new Date(player.birthday).getFullYear()
        : null,
      team: {
        ...player.team,
        name:
          player.league?.name === "МХЛ"
            ? `МХК ${player.team.name}`
            : player.league?.name === "Без команды"
            ? player.team.name
            : `ХК ${player.team.name} `,
      },
    }));

    const contacts = contactsArray.length > 0 ? contactsArray[0] : null;

    return NextResponse.json({
      news: newsWithFormattedDates,
      video,
      players: playersWithFormattedData,
      agency,
      gallery,
      contacts,
    });
  } catch (error) {
    console.error("Error fetching data items:", error);
    return NextResponse.json(
      { error: "Failed to fetch data items" },
      { status: 500 }
    );
  }
}
