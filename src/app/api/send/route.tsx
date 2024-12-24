import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_FORM_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        { message: "Webhook URL не настроен в .env файле" },
        { status: 500 }
      );
    }

    // Отправляем данные на указанный URL методом POST
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    // Проверяем успешность отправки
    if (response.ok) {
      return NextResponse.json({ message: "Форма успешно отправлена!" });
    } else {
      const errorText = await response.text();
      return NextResponse.json(
        { message: "Ошибка отправки данных на вебхук", error: errorText },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Ошибка API:", error);
    return NextResponse.json(
      { message: "Ошибка обработки запроса" },
      { status: 500 }
    );
  }
}
