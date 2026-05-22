import { NextResponse } from "next/server";
import {
  getGregorianDate,
  getLunarDate,
  getPersianDate,
  getPersianZodiac,
} from "@/lib/calendar";

export async function GET() {
  try {
    const now = await getTehranTime();

    const solar = getPersianDate(now);
    const gregorian = getGregorianDate(now);
    const lunar = getLunarDate(now);
    const zodiac = getPersianZodiac(solar.month);

    return NextResponse.json({
      titleDate: solar.titleDate,
      solar: {
        title: "تاریخ خورشیدی",
        date: solar.numeric,
        text: solar.fullText,
      },
      gregorian: {
        title: "تاریخ میلادی",
        date: gregorian.numeric,
        text: gregorian.fullText,
      },
      lunar: {
        title: "تاریخ قمری",
        date: lunar.numeric,
        text: lunar.fullText,
      },
      zodiac: {
        title: "برج فلکی",
        name: zodiac.name,
        icon: zodiac.icon,
      },
    });
  } catch {
    return NextResponse.json(
      { message: "خطا در دریافت اطلاعات تقویم" },
      { status: 500 },
    );
  }
}

async function getTehranTime() {
  try {
    const res = await fetch("https://worldtimeapi.org/api/timezone/Asia/Tehran", {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error("WorldTime API failed");
    }

    const data: { datetime: string } = await res.json();

    return new Date(data.datetime);
  } catch {
    return new Date();
  }
}