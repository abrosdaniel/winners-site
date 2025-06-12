export async function getServerData() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/data`,
      {
        cache: "no-store",
        next: {
          revalidate: 0,
          tags: ["news", "players", "video"],
        },
      }
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
