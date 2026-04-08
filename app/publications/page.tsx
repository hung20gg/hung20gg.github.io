import { getLocalData } from '@/lib/data';
import PageBackdrop from '@/components/PageBackdrop';

export default function PublicationsPage() {
  const data: any[] = getLocalData('publications/data.json', []);

  return (
    <main className="container section-full">
      <PageBackdrop seed="publications" />
      <h1 className="snap-title">Publications</h1>
      
      {data.length === 0 ? (
        <p className="snap-desc">Please add content to content/publications/data.json.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
          {data.map((item, idx) => (
            <div key={idx} className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #0070f3, #38bdf8)',
                color: '#fff',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                {item.year || "2025"}
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{item.title}</h3>
                <p style={{ fontStyle: 'italic', marginBottom: '0.5rem' }}>{item.authors}</p>
                <p style={{ marginBottom: '1rem' }}>{item.venue}</p>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                    Read Paper ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
