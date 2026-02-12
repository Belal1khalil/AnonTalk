"use client";

import { useAppSelector } from "@/hooks/store.hooks";
import { useEffect } from "react";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode } = useAppSelector((store) => store.themeReducer);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  return <>{children}</>;
}
