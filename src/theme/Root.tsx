import React, { useEffect } from "react";
import { useScrollPosition } from "../hooks/useScrollPosition";

function NavbarScrollEffect() {
  const scrolled = useScrollPosition(12);

  useEffect(() => {
    const nav = document.querySelector(".navbar");
    if (!nav) return;
    if (scrolled) {
      nav.classList.add("navbar--scrolled");
    } else {
      nav.classList.remove("navbar--scrolled");
    }
  }, [scrolled]);

  return null;
}

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarScrollEffect />
      {children}
    </>
  );
}
