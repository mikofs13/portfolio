"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function ScrollEffects() {
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    let cleanup = () => {};

    function setup() {
      cleanup();
      if (preference.matches) return;
      const lenis = finePointer.matches ? new Lenis({
        autoRaf: true,
        duration: 1.05,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: -32 },
      }) : null;
      const animations = new Set<Animation>();
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const animation = entry.target.animate([
            { opacity: 0, transform: "translate3d(0, 28px, 0)" },
            { opacity: 1, transform: "translate3d(0, 0, 0)" },
          ], { duration: 850, easing: "cubic-bezier(.22,1,.36,1)", fill: "none" });
          animations.add(animation);
          void animation.finished.then(() => animations.delete(animation)).catch(() => {});
          observer.unobserve(entry.target);
        }
      }, { threshold: 0.1, rootMargin: "0px 0px -24px 0px" });
      document.querySelectorAll(".section-heading, .project-showcase, .project-copy, .about-copy, .experience-row, .tool-row, .contact-bottom").forEach(element => observer.observe(element));

      const art = document.querySelector<HTMLElement>(".hero-art img");
      let frame = 0;
      const update = () => {
        frame = 0;
        const range = document.documentElement.scrollHeight - window.innerHeight;
        if (progress.current) progress.current.style.transform = `scaleX(${range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0})`;
        if (art && finePointer.matches) art.style.setProperty("--parallax", `${Math.min(48, window.scrollY * 0.065)}px`);
      };
      const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      const resize = new ResizeObserver(schedule);
      resize.observe(document.body);
      update();
      cleanup = () => {
        lenis?.destroy();
        observer.disconnect();
        resize.disconnect();
        animations.forEach(animation => animation.cancel());
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        cancelAnimationFrame(frame);
        art?.style.removeProperty("--parallax");
        if (progress.current) progress.current.style.transform = "scaleX(0)";
      };
    }

    setup();
    preference.addEventListener("change", setup);
    finePointer.addEventListener("change", setup);
    return () => {
      cleanup();
      preference.removeEventListener("change", setup);
      finePointer.removeEventListener("change", setup);
    };
  }, []);

  return <div ref={progress} className="reading-progress" aria-hidden="true"/>;
}
