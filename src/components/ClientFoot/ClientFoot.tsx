"use client";

import { useData } from "@hooks/useData";
import { Button } from "@ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function ClientFoot() {
  const pathname = usePathname();
  const { data, isLoading } = useData();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading || !data?.contacts || pathname === "/not-found") {
    return null;
  }

  const { email, phone, whatsapp, instagram, telegram } = data.contacts;

  return (
    <footer
      id="contacts"
      className="relative bg-[#171D3D] rounded-b-none rounded-t-3xl w-full py-10 px-14 overflow-hidden lg:rounded-full lg:py-24 lg:px-20 lg:w-10/12 lg:left-1/2 lg:-translate-x-1/2"
    >
      {/* ... остальной код футера ... */}
    </footer>
  );
}
