import { getLocalData } from '@/lib/data';
import PageBackdrop from '@/components/PageBackdrop';
import Footer from '@/components/Footer';
import VectorField from '@/components/VectorField';

export default function SkillsPage() {
  const data = getLocalData('skills/data.json', {
    languages: [],
    frameworks: [],
    tools: []
  });

  const renderBadgeList = (items: string[], index: number) => {
    if (!items || items.length === 0) return <p className="snap-desc">Provide data in content/skills/data.json.</p>;
    
    return (
      <div style={{ 
        position: 'relative',
        display: 'flex', 
        gap: '1rem', 
        flexWrap: 'wrap', 
        padding: '2rem', 
        borderRadius: '24px', 
        border: '1px solid var(--border-color)',
        backgroundColor: 'rgba(0,0,0,0.03)',
        backdropFilter: 'blur(4px)', // Subtle glass effect for the whole block
        overflow: 'hidden'
      }}>
        {items.map((item: string, idx: number) => (
          <span key={idx} className="card-tag" style={{ 
            position: 'relative',
            zIndex: 1,
            backgroundColor: 'var(--card-bg)', 
            padding: '0.6rem 1.5rem', 
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: 500,
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--border-color)',
            transition: 'all 0.3s ease',
          }}>
            {item}
          </span>
        ))}
      </div>
    );
  };

  return (
    <main className="container section-full">
      <PageBackdrop seed="skills" />
      <h1 className="snap-title">Skills Overview</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '3rem' }}>
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Programming Languages</h2>
          {renderBadgeList(data.languages, 0)}
        </section>
        
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Libraries & Frameworks</h2>
           {renderBadgeList(data.frameworks, 1)}
        </section>

        <section>
           <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Tools & Platforms</h2>
           {renderBadgeList(data.tools, 2)}
        </section>
      </div>
      
      <Footer />
    </main>
  );
}
