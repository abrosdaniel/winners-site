import { NextRequest, NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const range = request.headers.get("range");
    if (!range) {
      return new NextResponse("Requires range header", { status: 400 });
    }

    const videoUrl = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${params.id}`;
    const response = await fetch(videoUrl, {
      headers: { Range: range },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch video");
    }

    const headers = new Headers();
    response.headers.forEach((value, key) => {
      headers.set(key, value);
    });

    headers.set("Accept-Ranges", "bytes");
    if (response.headers.get("Content-Range")) {
      headers.set("Content-Range", response.headers.get("Content-Range")!);
    }
    headers.set("Content-Type", "video/mp4");

    return new NextResponse(response.body, {
      status: response.status,
      headers,
    });
  } catch (error) {
    console.error("Error fetching video:", error);
    return NextResponse.json(
      { error: "Failed to fetch video" },
      { status: 500 }
    );
  }
}
