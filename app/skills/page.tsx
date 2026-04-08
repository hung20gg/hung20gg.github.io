import { getLocalData } from '@/lib/data';
import PageBackdrop from '@/components/PageBackdrop';

export default function SkillsPage() {
  const data = getLocalData('skills/data.json', {
    languages: [],
    frameworks: [],
    tools: []
  });

  const renderBadgeList = (items: string[], gradientIndex: number) => {
    if (!items || items.length === 0) return <p className="snap-desc">Provide data in content/skills/data.json.</p>;
    
    // Pick varying gradients or styles depending on the section index
    const gradients = [
      'linear-gradient(90deg, rgba(0, 112, 243, 0.2), transparent)',
      'linear-gradient(90deg, rgba(56, 189, 248, 0.2), transparent)',
      'linear-gradient(90deg, rgba(129, 140, 248, 0.2), transparent)'
    ];

    return (
      <div style={{ 
        display: 'flex', gap: '1rem', flexWrap: 'wrap', 
        background: gradients[gradientIndex % gradients.length],
        padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)'
      }}>
        {items.map((item: string, idx: number) => (
          <span key={idx} style={{ 
            backgroundColor: 'var(--bg-color)', 
            padding: '0.5rem 1.25rem', 
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: 500,
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
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
    </main>
  );
}
