import { getLocalData } from '@/lib/data';
import PageBackdrop from '@/components/PageBackdrop';
import Link from 'next/link';
import Footer from '@/components/Footer';

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
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '1.3rem', margin: 0, lineHeight: '1.2' }}>{item.title}</h3>
                  {item.ranking && (
                    <span className="card-tag" style={{
                      fontSize: '0.85rem',
                      padding: '0.2rem 0.75rem',
                      border: '1px solid #4b5563',
                      borderRadius: '20px',
                      color: 'var(--text-muted)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: '1'
                    }}>
                      {item.ranking}
                    </span>
                  )}
                </div>
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
      
      <Footer />
    </main>
  );
}
