import Image from "next/image";
import type { PortfolioProject } from "@/lib/content";
import { Arrow } from "./icons";

export function Project({ project, index }: { project: PortfolioProject; index: number }) {
  const mobile = project.presentation === "mobile";
  const images = [project.preview, ...(project.screenshots ?? [])];
  return <article className="project featured" id={`project-${project.slug}`}>
    <div className={`project-showcase ${mobile ? "showcase-mobile" : "showcase-web"}`}>
      <div className="showcase-label"><span>{project.title}</span><span>{project.status}</span></div>
      {mobile ? <div className="phone-composition">{images.slice(0, 3).map((image, i) => <div className={`phone-preview phone-${i}`} key={image.src}><Image src={image.src} alt={image.alt} width={612} height={1280} sizes="(max-width: 699px) 55vw, 25vw"/></div>)}</div> : <div className="browser-preview"><div className="browser-bar" aria-hidden="true"><i/><i/><i/><span>{project.title.toLowerCase()}</span></div><Image src={project.preview.src} alt={project.preview.alt} width={1006} height={712} sizes="(max-width: 699px) 85vw, 75vw"/></div>}
      <div className="showcase-foot"><span>{project.stack.slice(0, 3).join(" / ")}</span><span>PROJECT SCREENSHOTS</span></div>
    </div>
    <div className="project-info"><div className="project-copy"><p className="project-category"><span>{String(index + 1).padStart(2, "0")}</span> {project.status}</p><h3>{project.title}</h3><p className="project-description">{project.summary}</p><ul className="tags" aria-label="Technologies">{project.stack.map(tag => <li key={tag}>{tag}</li>)}</ul><div className="project-links">{project.links.live && <a className="inline-link" href={project.links.live} target="_blank" rel="noopener noreferrer">Visit project <Arrow/></a>}{project.links.repo && <a className="inline-link" href={project.links.repo} target="_blank" rel="noopener noreferrer">Source code <Arrow/></a>}</div></div>
      <details className="project-notes"><summary>Inside the project <span aria-hidden="true">+</span></summary><div className="project-expanded">{project.description.map((paragraph, i) => <p key={i}>{paragraph}</p>)}{(project.screenshots ?? []).length > 0 && <div className="project-gallery">{project.screenshots?.map(image => <a href={image.src} key={image.src} target="_blank" rel="noopener noreferrer" aria-label={`Open screenshot: ${image.alt}`}><Image src={image.src} alt={image.alt} width={600} height={mobile ? 1255 : 425} sizes="(max-width: 699px) 80vw, 260px"/><span>View screenshot <Arrow/></span></a>)}</div>}</div></details>
    </div>
  </article>;
}
