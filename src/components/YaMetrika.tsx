"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    ym: any;
  }
}

export function Metrika() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const metrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

  useEffect(() => {
    if (!metrikaId || typeof window === "undefined") {
      return;
    }

    // Инициализация Яндекс.Метрики
    if (!window.ym) {
      (function (
        m: any,
        e: Document,
        t: string,
        r: string,
        i: string,
        k: HTMLScriptElement | null,
        a: Element | null
      ) {
        m[i] =
          m[i] ||
          function () {
            (m[i].a = m[i].a || []).push(arguments);
          };
        m[i].l = 1 * new Date().getTime();
        for (var j = 0; j < document.scripts.length; j++) {
          if (document.scripts[j].src === r) {
            return;
          }
        }
        k = e.createElement(t) as HTMLScriptElement;
        a = e.getElementsByTagName(t)[0];
        if (k && a) {
          k.async = true;
          k.src = r;
          a.parentNode?.insertBefore(k, a);
        }
      })(
        window,
        document,
        "script",
        "https://mc.yandex.ru/metrika/tag.js",
        "ym",
        null,
        null
      );

      if (window.ym) {
        window.ym(Number(metrikaId), "init", {
          defer: true,
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
        });
      }
    }

    // Отслеживание переходов
    if (window.ym && typeof window.ym === "function") {
      window.ym(Number(metrikaId), "hit");
    }
  }, [pathName, searchParams, metrikaId]);

  return null;
}
