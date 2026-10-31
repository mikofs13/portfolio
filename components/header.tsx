"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow } from "./icons";

export function Header({ name, brand, discipline }: { name: string; brand: string; discipline: string }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) { setOpen(false); button.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return <header className="header shell">
    <a href="#home" className="brand" aria-label={`${name}, home`}>{brand}<span>.</span><span className="brand-caption">{discipline}</span></a>
    <button ref={button} className="menu-button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}<span aria-hidden="true">{open ? "−" : "+"}</span></button>
    <nav id="main-nav" className={open ? "nav open" : "nav"} aria-label="Main navigation" onClick={(event) => { if ((event.target as HTMLElement).closest("a")) setOpen(false); }}>
      <a href="#work">Selected work</a><a href="#about">About</a><a href="#experience">Experience</a><a className="nav-cta" href="#contact">Let’s talk <Arrow /></a>
    </nav>
  </header>;
}
