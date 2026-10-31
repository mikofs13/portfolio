import Image from "next/image";
import { Header } from "@/components/header";
import { Arrow, Asterisk } from "@/components/icons";
import { CopyEmail } from "@/components/contact";
import { Project } from "@/components/project";
import { MeterVisual, SchoolVisual, PCBVisual } from "@/components/project-visuals";

const github = "https://github.com/mikofs13";
const toolkit = [
  {title:"Languages", items:["Python", "TypeScript", "JavaScript", "C++"]},
  {title:"Web & backend", items:["React", "Next.js", "Node.js", "FastAPI", "REST APIs"]},
  {title:"Data & intelligence", items:["PostgreSQL", "Supabase", "TensorFlow", "OpenCV"]},
  {title:"Tools & hardware", items:["Git & GitHub", "Docker", "ESP32", "Arduino"]},
];

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div id="home"/>
    <Header/>
    <main id="main">
      <section className="hero shell" aria-labelledby="hero-heading">
        <div className="hero-copy"><p className="eyebrow hero-eyebrow"><span className="status-dot"/>SOFTWARE ENGINEERING & APPLIED AI</p>
          <h1 id="hero-heading">Thoughtful<br/>code.<br/><span>Real-world<br/>impact.</span></h1>
          <p className="hero-intro">I’m Michael Feleke Sahle. A software engineering student building for the web and exploring what machines can see.</p>
          <div className="hero-actions"><a className="inline-link primary" href="#work">Explore my work <Arrow/></a><a className="inline-link" href="#contact">Get in touch <Arrow/></a></div>
        </div>
        <div className="hero-art" aria-hidden="true"><Image src="/studio-ribbon.webp" alt="" width={1100} height={1375} loading="eager" fetchPriority="high" sizes="(max-width: 699px) 85vw, 55vw"/><span className="art-caption">CURIOSITY, SHAPED INTO SOMETHING USEFUL.</span></div>
        <div className="hero-foot"><p>BASED IN ADDIS ABABA, ETHIOPIA</p><p className="hero-education">AAU · SOFTWARE ENGINEERING · CLASS OF 2030</p><a href="#work">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a></div>
      </section>

      <section id="work" className="work-section shell section-space" aria-labelledby="work-heading">
        <div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2 id="work-heading">A few things<br/>I’ve been building<span className="accent">.</span></h2></div><p className="section-description">From practical web applications to computer vision. Learning by solving real problems.</p></div>
        <Project featured number="01" category="APPLIED AI · COMPUTER VISION" title="Reading the real world." description="A water-meter recognition system that turns photographs into readings using computer vision, OCR, and Supabase." tags={["Python", "Computer vision", "OCR", "Supabase"]} challenge="Extract water-meter readings from photographs and turn them into structured information." work="Exploring image processing and recognition, integrating PaddleOCR, and connecting extracted readings to Supabase. A hands-on intersection of software engineering and computer vision."><MeterVisual/></Project>
        <div className="project-pair">
          <Project number="02" category="FULL-STACK DEVELOPMENT" title="A more connected school." description="A school management system bringing administrative workflows, teacher tools, and student information together." tags={["Web application", "Role-based portals", "Assessments"]} challenge="Connect the different workflows of administrators, teachers, and students in one school management system." work="Developing assessment and score workflows, improving portal behavior, and refining the experience across different roles."><SchoolVisual/></Project>
          <Project number="03" category="WEB DEVELOPMENT · CONTENT SYSTEMS" title="A digital home for hardware." description="Web platform work for Addis PCB, bringing electronics, services, and stories into a clearer digital experience." tags={["Next.js", "TypeScript", "Content management"]} challenge="Present hardware products and services clearly while making website content easier to manage." work="Working on blog publishing, image presentation, feedback moderation, and responsive interface refinements."><PCBVisual/></Project>
        </div>
        <a className="inline-link more-work" href={github} target="_blank" rel="noopener noreferrer">More from my workbench <Arrow/></a>
      </section>

      <section id="about" className="about-section section-space" aria-labelledby="about-heading"><div className="shell about-layout"><div className="about-title"><p className="eyebrow">02 / THE PERSON BEHIND THE CODE</p><h2 id="about-heading">Curiosity is<br/>the starting point<span className="accent">.</span></h2><div className="about-signature"><Asterisk/><span>ALWAYS A WORK IN PROGRESS.</span></div></div><div className="about-copy"><p className="lead">I like understanding how things work. Then figuring out how to make them work better.</p><p>I’m Michael, a Software Engineering student at Addis Ababa University, working toward my bachelor’s degree in 2030. My interests span full-stack development, machine learning, and computer vision.</p><p>At Addis Tech Group, I’m gaining practical experience building and improving web applications. Alongside that, I explore projects that connect software to everyday problems, from reading water meters to making school workflows easier.</p><a className="inline-link" href={github} target="_blank" rel="noopener noreferrer">Find me on GitHub <Arrow/></a></div></div></section>

      <section id="experience" className="experience-section shell section-space" aria-labelledby="experience-heading"><div className="section-heading"><div><p className="eyebrow">03 / THE JOURNEY SO FAR</p><h2 id="experience-heading">Learning.<br/>Building. Becoming.</h2></div><p className="section-description">A foundation in software engineering, strengthened through hands-on experience.</p></div><div className="experience-row"><div><p className="row-type">EXPERIENCE</p><h3>Software Engineering Intern</h3><p className="organization">Addis Tech Group</p></div><p className="row-description">Building and improving responsive web applications with Next.js, React, TypeScript, and Tailwind CSS, with a focus on performance and maintainability.</p><p className="row-date">June 2026 — Present</p></div><div className="experience-row"><div><p className="row-type">EDUCATION</p><h3>Bachelor’s in Software Engineering</h3><p className="organization">Addis Ababa University</p></div><p className="row-description">Developing a foundation in software engineering while exploring practical applications in web development, machine learning, and computer vision.</p><p className="row-date">Expected 2030</p></div></section>

      <section className="tools-section shell section-space" aria-labelledby="tools-heading"><div className="section-heading"><div><p className="eyebrow">04 / THE TOOLKIT</p><h2 id="tools-heading">Tools I work with<span className="accent">.</span></h2></div><p className="section-description">Different tools. One goal:<br/>build something useful.</p></div>{toolkit.map(group => <div className="tool-row" key={group.title}><h3>{group.title}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</section>

      <section id="contact" className="contact-section" aria-labelledby="contact-heading"><div className="shell"><p className="eyebrow">GOOD THINGS START WITH A CONVERSATION.</p><a className="contact-title" href="mailto:michaelfeleke13@gmail.com"><h2 id="contact-heading">Let’s build<br/>something good.</h2><Arrow/></a><div className="contact-bottom"><div><a className="email-link" href="mailto:michaelfeleke13@gmail.com">michaelfeleke13@gmail.com</a><CopyEmail/></div><p>Ideas, collaborations, or a simple hello.<br/>I’d love to hear from you.</p></div></div></section>
    </main>
    <footer className="footer shell"><p>© {new Date().getFullYear()} Michael Feleke Sahle</p><p className="footer-note">BUILT WITH CURIOSITY. ADDIS ABABA, ET.</p><a href={github} target="_blank" rel="noopener noreferrer">GitHub <Arrow/></a><a href="#home">Back to top <span aria-hidden="true">↑</span></a></footer>
  </>;
}
