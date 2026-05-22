"use client";

import { useEffect, useState } from "react";

type CalendarData = {
  titleDate: string;
  solar: {
    title: string;
    date: string;
    text: string;
  };
  gregorian: {
    title: string;
    date: string;
    text: string;
  };
  lunar: {
    title: string;
    date: string;
    text: string;
  };
  zodiac: {
    title: string;
    name: string;
    icon: string;
  };
};

export default function IranCalendar() {
  const [data, setData] = useState<CalendarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getCalendar() {
      try {
        const res = await fetch("/api/calendar", {
          cache: "no-store",
        });

        const json = await res.json();

        if (!res.ok || !json?.solar) {
          throw new Error(json?.message || "Calendar API failed");
        }

        setData(json);
      } catch (error) {
        console.error("Calendar API error:", error);
        setError("خطا در دریافت اطلاعات تقویم");
      } finally {
        setLoading(false);
      }
    }

    getCalendar();
  }, []);

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl rounded-xl bg-white p-8 text-center shadow-sm">
        در حال دریافت اطلاعات...
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="mx-auto max-w-6xl rounded-xl bg-white p-8 text-center text-red-600 shadow-sm">
        {error || "اطلاعاتی برای نمایش وجود ندارد"}
      </section>
    );
  }

  return (
    <section
      dir="rtl"
      className="mx-auto max-w-6xl rounded-xl bg-white px-6 py-8 shadow-sm"
    >
      <header className="mb-8 flex items-center justify-center gap-5 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">ساعت و تقویم ایران</h1>
        <div className="h-10 w-px bg-gray-300" />
        <p className="text-2xl font-bold text-green-700">{data.titleDate}</p>
      </header>

      <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
        <CalendarItem
          title={data.solar.title}
          date={data.solar.date}
          text={data.solar.text}
        />

        <CalendarItem
          title={data.gregorian.title}
          date={data.gregorian.date}
          text={data.gregorian.text}
          ltr
        />

        <CalendarItem
          title={data.lunar.title}
          date={data.lunar.date}
          text={data.lunar.text}
        />

        <div>
          <h2 className="mb-5 text-xl font-bold text-green-700">
            {data.zodiac.title}
          </h2>

          <div className="flex flex-col items-center gap-2">
            <span className="text-5xl">{data.zodiac.icon}</span>
            <p className="text-lg font-semibold text-gray-900">
              {data.zodiac.name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CalendarItem({
  title,
  date,
  text,
  ltr = false,
}: {
  title: string;
  date: string;
  text: string;
  ltr?: boolean;
}) {
  return (
    <div>
      <h2 className="mb-5 text-xl font-bold text-green-700">{title}</h2>

      <p
        dir={ltr ? "ltr" : "rtl"}
        className="mb-3 text-lg font-bold text-gray-900"
      >
        {date}
      </p>

      <p className="text-lg font-semibold text-gray-900">{text}</p>
    </div>
  );
}