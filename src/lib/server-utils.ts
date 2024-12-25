import { headers } from "next/headers";

export async function getServerData() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/data`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      news: [],
      players: [],
      agency: [],
      video: [],
    };
  }
}
