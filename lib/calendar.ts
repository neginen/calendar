const persianMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const lunarMonths = [
  "محرم",
  "صفر",
  "ربیع‌الاول",
  "ربیع‌الثانی",
  "جمادی‌الاول",
  "جمادی‌الثانی",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذوالقعده",
  "ذوالحجه",
];

const persianWeekdays = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
  "شنبه",
];

const englishWeekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const englishMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getPersianDate(date: Date) {
  const parts = getDateParts(date, "fa-IR-u-ca-persian", "Asia/Tehran");

  const year = parts.year;
  const month = parts.month;
  const day = parts.day;

  const weekday = persianWeekdays[getTehranWeekday(date)];
  const monthName = persianMonths[month - 1];

  return {
    year,
    month,
    day,
    numeric: `${year}/${pad(month)}/${pad(day)}`,
    fullText: `${weekday} - ${day} ${monthName} ${year}`,
    titleDate: `${weekday} - ${day} ${monthName} ${year}`,
  };
}

export function getGregorianDate(date: Date) {
  const parts = getDateParts(date, "en-US-u-ca-gregory", "Asia/Tehran");

  const year = parts.year;
  const month = parts.month;
  const day = parts.day;

  const weekday = englishWeekdays[getTehranWeekday(date)];
  const monthName = englishMonths[month - 1];

  return {
    year,
    month,
    day,
    numeric: `${year}-${pad(month)}-${pad(day)}`,
    fullText: `${weekday} - ${monthName} ${day}, ${year}`,
  };
}

export function getLunarDate(date: Date) {
  const parts = getDateParts(date, "ar-SA-u-ca-islamic-umalqura", "Asia/Tehran");

  const year = parts.year;
  const month = parts.month;
  const day = parts.day;

  const weekday = persianWeekdays[getTehranWeekday(date)];
  const monthName = lunarMonths[month - 1];

  return {
    year,
    month,
    day,
    numeric: `${year}/${pad(month)}/${pad(day)}`,
    fullText: `${weekday} - ${day} ${monthName} ${year}`,
  };
}

export function getPersianZodiac(month: number) {
  const signs = [
    { name: "حمل", icon: "♈" },
    { name: "ثور", icon: "♉" },
    { name: "جوزا", icon: "♊" },
    { name: "سرطان", icon: "♋" },
    { name: "اسد", icon: "♌" },
    { name: "سنبله", icon: "♍" },
    { name: "میزان", icon: "♎" },
    { name: "عقرب", icon: "♏" },
    { name: "قوس", icon: "♐" },
    { name: "جدی", icon: "♑" },
    { name: "دلو", icon: "♒" },
    { name: "حوت", icon: "♓" },
  ];

  return signs[month - 1] ?? signs[0];
}

function getDateParts(date: Date, locale: string, timeZone: string) {
  const formatter = new Intl.DateTimeFormat(locale, {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const parts = formatter.formatToParts(date);

  const year = toEnglishNumber(
    parts.find((part) => part.type === "year")?.value ?? "0",
  );

  const month = toEnglishNumber(
    parts.find((part) => part.type === "month")?.value ?? "0",
  );

  const day = toEnglishNumber(
    parts.find((part) => part.type === "day")?.value ?? "0",
  );

  return { year, month, day };
}

function getTehranWeekday(date: Date) {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tehran",
    weekday: "long",
  }).format(date);

  return englishWeekdays.indexOf(weekday);
}

function toEnglishNumber(value: string) {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

  const englishValue = value
    .replace(/[۰-۹]/g, (digit) => String(persianDigits.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(arabicDigits.indexOf(digit)));

  return Number(englishValue);
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}