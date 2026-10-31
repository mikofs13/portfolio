import { Arrow } from "./icons";

type ProjectProps = {
  number: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  challenge: string;
  work: string;
  children: React.ReactNode;
  featured?: boolean;
};

export function Project({number, category, title, description, tags, challenge, work, children, featured}: ProjectProps) {
  return <article className={`project ${featured ? "featured" : ""}`}>
    {children}
    <div className="project-info"><div className="project-copy"><p className="project-category"><span>{number}</span> {category}</p><h3>{title}</h3><p className="project-description">{description}</p><ul className="tags" aria-label="Technologies and areas">{tags.map(tag => <li key={tag}>{tag}</li>)}</ul></div><details className="project-notes"><summary>Inside the project <span aria-hidden="true">+</span></summary><div className="project-expanded"><h4>The challenge</h4><p>{challenge}</p><h4>The work</h4><p>{work}</p><a className="inline-link" href="https://github.com/mikofs13" target="_blank" rel="noopener noreferrer">My GitHub profile <Arrow/></a></div></details></div>
  </article>;
}
