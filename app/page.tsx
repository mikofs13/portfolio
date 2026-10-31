import Image from "next/image";
import { Header } from "@/components/header";
import { Arrow, Asterisk } from "@/components/icons";
import { CopyEmail } from "@/components/contact";
import { Project } from "@/components/project";
import { MeterVisual, SchoolVisual, PCBVisual } from "@/components/project-visuals";

import { site } from "@/lib/content";

function Lines({ lines }: { lines: string[] }) {
  return lines.map((line, index) => <span key={index}>{index > 0 && <br/>}{line}</span>);
}

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div id="home"/>
    <Header name={site.name} brand={site.brand} discipline={site.discipline}/>
    <main id="main">
      <section className="hero shell" aria-labelledby="hero-heading">
        <div className="hero-copy"><p className="eyebrow hero-eyebrow"><span className="status-dot"/>{site.hero.eyebrow}</p>
          <h1 id="hero-heading"><Lines lines={site.hero.headline}/><br/><span><Lines lines={site.hero.accentHeadline}/></span></h1>
          <p className="hero-intro">{site.hero.intro}</p>
          <div className="hero-actions"><a className="inline-link primary" href="#work">Explore my work <Arrow/></a><a className="inline-link" href="#contact">Get in touch <Arrow/></a></div>
        </div>
        <div className="hero-art" aria-hidden="true"><Image src="/studio-ribbon.webp" alt="" width={1100} height={1375} loading="eager" fetchPriority="high" sizes="(max-width: 699px) 85vw, 55vw"/><span className="art-caption">{site.hero.artCaption}</span></div>
        <div className="hero-foot"><p>{site.hero.location}</p><p className="hero-education">{site.hero.education}</p><a href="#work">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a></div>
      </section>

      <section id="work" className="work-section shell section-space" aria-labelledby="work-heading">
        <div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2 id="work-heading"><Lines lines={site.work.heading}/><span className="accent">.</span></h2></div><p className="section-description">{site.work.description}</p></div>
        <Project featured number="01" category="APPLIED AI · COMPUTER VISION" title="Reading the real world." description="A water-meter recognition system that turns photographs into readings using computer vision, OCR, and Supabase." tags={["Python", "Computer vision", "OCR", "Supabase"]} challenge="Extract water-meter readings from photographs and turn them into structured information." work="Exploring image processing and recognition, integrating PaddleOCR, and connecting extracted readings to Supabase. A hands-on intersection of software engineering and computer vision."><MeterVisual/></Project>
        <div className="project-pair">
          <Project number="02" category="FULL-STACK DEVELOPMENT" title="A more connected school." description="A school management system bringing administrative workflows, teacher tools, and student information together." tags={["Web application", "Role-based portals", "Assessments"]} challenge="Connect the different workflows of administrators, teachers, and students in one school management system." work="Developing assessment and score workflows, improving portal behavior, and refining the experience across different roles."><SchoolVisual/></Project>
          <Project number="03" category="WEB DEVELOPMENT · CONTENT SYSTEMS" title="A digital home for hardware." description="Web platform work for Addis PCB, bringing electronics, services, and stories into a clearer digital experience." tags={["Next.js", "TypeScript", "Content management"]} challenge="Present hardware products and services clearly while making website content easier to manage." work="Working on blog publishing, image presentation, feedback moderation, and responsive interface refinements."><PCBVisual/></Project>
        </div>
        <a className="inline-link more-work" href={site.github} target="_blank" rel="noopener noreferrer">More from my workbench <Arrow/></a>
      </section>

      <section id="about" className="about-section section-space" aria-labelledby="about-heading"><div className="shell about-layout"><div className="about-title"><p className="eyebrow">02 / THE PERSON BEHIND THE CODE</p><h2 id="about-heading"><Lines lines={site.about.heading}/><span className="accent">.</span></h2><div className="about-signature"><Asterisk/><span>ALWAYS A WORK IN PROGRESS.</span></div></div><div className="about-copy"><p className="lead">{site.about.lead}</p>{site.about.paragraphs.map((text, i) => <p key={i}>{text}</p>)}<a className="inline-link" href={site.github} target="_blank" rel="noopener noreferrer">Find me on GitHub <Arrow/></a></div></div></section>

      <section id="experience" className="experience-section shell section-space" aria-labelledby="experience-heading"><div className="section-heading"><div><p className="eyebrow">03 / THE JOURNEY SO FAR</p><h2 id="experience-heading">Learning.<br/>Building. Becoming.</h2></div><p className="section-description">A foundation in software engineering, strengthened through hands-on experience.</p></div>{site.experience.map((entry, i) => <div className="experience-row" key={i}><div><p className="row-type">{entry.type}</p><h3>{entry.role}</h3><p className="organization">{entry.organization}</p></div><p className="row-description">{entry.description}</p><p className="row-date">{entry.date}</p></div>)}</section>

      <section className="tools-section shell section-space" aria-labelledby="tools-heading"><div className="section-heading"><div><p className="eyebrow">04 / THE TOOLKIT</p><h2 id="tools-heading">Tools I work with<span className="accent">.</span></h2></div><p className="section-description">Different tools. One goal:<br/>build something useful.</p></div>{site.skills.map(group => <div className="tool-row" key={group.title}><h3>{group.title}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</section>

      <section id="contact" className="contact-section" aria-labelledby="contact-heading"><div className="shell"><p className="eyebrow">GOOD THINGS START WITH A CONVERSATION.</p><a className="contact-title" href={`mailto:${site.email}`}><h2 id="contact-heading"><Lines lines={site.contact.heading}/></h2><Arrow/></a><div className="contact-bottom"><div><a className="email-link" href={`mailto:${site.email}`}>{site.email}</a><CopyEmail email={site.email}/></div><p>{site.contact.description}</p></div></div></section>
    </main>
    <footer className="footer shell"><p>© {new Date().getFullYear()} {site.name}</p><p className="footer-note">{site.footerNote}</p><a href={site.github} target="_blank" rel="noopener noreferrer">GitHub <Arrow/></a><a href="#home">Back to top <span aria-hidden="true">↑</span></a></footer>
  </>;
}
