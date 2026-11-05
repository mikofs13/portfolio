"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { PortfolioProject } from "@/lib/content";
import { Project } from "@/components/project";

export function ProjectShowcase({ projects }: { projects: PortfolioProject[] }) {
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canPin = window.matchMedia("(min-width: 900px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)");
    const updatePinning = () => {
      setPinned(canPin.matches);
      if (!canPin.matches) setActive(0);
    };

    updatePinning();
    canPin.addEventListener("change", updatePinning);
    return () => canPin.removeEventListener("change", updatePinning);
  }, []);

  useEffect(() => {
    if (!pinned || !track.current) return;

    let frame = 0;
    const updateActiveProject = () => {
      frame = 0;
      const element = track.current;
      if (!element) return;
      const stepHeight = element.clientHeight / (projects.length + 1);
      const passed = Math.max(0, -element.getBoundingClientRect().top);
      const next = Math.min(projects.length - 1, Math.floor((passed + 1) / stepHeight));
      setActive(current => current === next ? current : next);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateActiveProject);
    };

    updateActiveProject();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      cancelAnimationFrame(frame);
    };
  }, [pinned, projects.length]);

  function goToProject(index: number) {
    const element = track.current;
    if (!element) return;
    const stepHeight = element.clientHeight / (projects.length + 1);
    const top = window.scrollY + element.getBoundingClientRect().top + index * stepHeight;
    window.scrollTo({ top, behavior: "instant" });
  }

  if (!pinned) {
    return <div className="project-list">{projects.map((project, index) => <Project project={project} index={index} key={project.slug}/>)}</div>;
  }

  return <div className="project-scroll-track" ref={track} style={{ "--project-steps": projects.length + 1 } as CSSProperties}>
    <div className="project-stage">
      <div className="project-stack">
        {projects.map((project, index) => <div className={`project-panel${active === index ? " is-active" : ""}`} key={project.slug} aria-hidden={active !== index} inert={active !== index}>
          <Project project={project} index={index}/>
        </div>)}
      </div>
      <nav className="project-step-controls" aria-label="Project navigation">
        <button type="button" onClick={() => goToProject(active - 1)} disabled={active === 0}>Previous</button>
        <p aria-live="polite" aria-atomic="true">Project {active + 1} of {projects.length}</p>
        <button type="button" onClick={() => goToProject(active + 1)} disabled={active === projects.length - 1}>Next project</button>
      </nav>
    </div>
  </div>;
}
