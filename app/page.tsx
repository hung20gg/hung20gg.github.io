'use client';
import Link from 'next/link';
import Avatar from '@/components/Avatar';

export default function Home() {
  return (
    <main className="snap-container">
      
      {/* 1. Hero Panel */}
      <section className="snap-section bg-variant-1">
        <div className="snap-content" style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h1 style={{ fontSize: '5rem', lineHeight: '1.1', marginBottom: '1rem' }}>
              Hello, I'm <br />
              <span className="name-gradient">Nguyen Quang Hung</span>
            </h1>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '2rem' }}>
              AI Engineer | Data Scientist | AI Researcher
            </h2>
            <p className="snap-desc">
              I build intelligent systems that combine large language models, data pipelines, and real-world applications in finance, education, and analytics.
            </p>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Avatar />
          </div>
        </div>
      </section>

      {/* 2. About Panel */}
      <section className="snap-section bg-variant-2">
        <div className="snap-content">
          <h2 className="snap-title">What I Do</h2>
          <p className="snap-desc">
            I am currently pursuing a degree in Data Science in Economics and Business at National Economics University. My interests lie in building AI systems that can reason, interact with structured data, and support real-world decision making.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <Link href="/about" className="card" style={{ width: 'auto', padding: '1rem 2rem' }}>
              Read Full Bio →
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Portfolio Panel (Experience / Projects) */}
      <section className="snap-section bg-variant-3">
        <div className="snap-content">
          <h2 className="snap-title">My Work</h2>
          <p className="snap-desc">
            Explore my professional experience and the systems I've developed.
          </p>
          <div className="cards-grid">
            <div className="card">
              <h3>Experience</h3>
              <p>Professional journey and roles in AI and Data Science. Click to expand entries!</p>
              <Link href="/experience" className="card-link" />
            </div>
            <div className="card">
              <h3>Projects</h3>
              <p>Real-world applications, tools, and platforms I have built. See expanded details!</p>
              <Link href="/projects" className="card-link" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Academia Panel */}
      <section className="snap-section bg-variant-1">
        <div className="snap-content">
           <h2 className="snap-title">Research & Skills</h2>
           <p className="snap-desc">
            Academic research papers, laboratory participations, and my core technical stack.
           </p>
           <div className="cards-grid">
            <div className="card">
              <h3>Research</h3>
              <p>Academic research into Agentic AI and ML systems.</p>
              <Link href="/research" className="card-link" />
            </div>
            <div className="card">
              <h3>Publications</h3>
              <p>Published academic contributions.</p>
              <Link href="/publications" className="card-link" />
            </div>
            <div className="card">
              <h3>Skills</h3>
              <p>Technical stack and frameworks.</p>
              <Link href="/skills" className="card-link" />
            </div>
          </div>
        </div>
      </section>
      
      {/* 5. Contact Panel */}
      <section className="snap-section bg-variant-2">
        <div className="snap-content">
          <h2 className="snap-title" style={{ fontSize: '4rem' }}>Let's Connect</h2>
          <p className="snap-desc">
            Always open to discussing AI, engineering roles, and cool projects.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <Link href="/contact" className="card" style={{ width: 'auto', padding: '1rem 2rem' }}>
              Contact Me
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
