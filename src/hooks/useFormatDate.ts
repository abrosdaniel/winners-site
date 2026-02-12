"use client";

import { useCallback, useMemo } from "react";
import { format, parseISO } from "date-fns";
import { enGB, enUS, ru } from "date-fns/locale";
import type { Locale } from "date-fns";

const LOCALE_MAP: Record<string, Locale> = {
  ru,
  "ru-RU": ru,
  en: enUS,
  "en-US": enUS,
  "en-GB": enGB,
};

export type UseFormatDateOptionsBase = {
  format: string;
  locale?: string;
};

export type UseFormatDateOptions =
  | (UseFormatDateOptionsBase & { date: string })
  | (UseFormatDateOptionsBase & { date?: never });

function formatIso(
  isoDate: string,
  formatStr: string,
  localeKey: string,
): string {
  const locale = LOCALE_MAP[localeKey] ?? ru;
  return format(parseISO(isoDate), formatStr, { locale });
}

/**
 * Форматирует ISO-дату с заданным форматом и локалью.
 * - С date: возвращает отформатированную строку
 * - Без date: возвращает функцию (isoDate) => string для нескольких дат
 */
export function useFormatDate(
  options: UseFormatDateOptionsBase & { date: string },
): string;
export function useFormatDate(
  options: UseFormatDateOptionsBase & { date?: never },
): (isoDate: string) => string;
export function useFormatDate(
  options: UseFormatDateOptionsBase & { date?: string },
) {
  const { format: formatStr, locale: localeKey = "ru", date } = options;

  const formatter = useCallback(
    (isoDate: string): string => formatIso(isoDate, formatStr, localeKey),
    [formatStr, localeKey],
  );

  const formatted = useMemo(
    () => (date ? formatter(date) : null),
    [date, formatter],
  );

  return date !== undefined ? formatted! : formatter;
}
