import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${id}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch video");
    }

    const buffer = await response.arrayBuffer();

    const headers = new Headers({
      "Content-Type": response.headers.get("content-type") || "video/mp4",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Length": buffer.byteLength.toString(),
    });

    return new Response(buffer, {
      headers,
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching video:", error);
    return new Response("Error fetching video", { status: 500 });
  }
}
