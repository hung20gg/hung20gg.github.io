import { getLocalData } from '@/lib/data';
import Avatar from '@/components/Avatar';
import PageBackdrop from '@/components/PageBackdrop';
import Footer from '@/components/Footer';

export default function AboutPage() {
// ... existing getLocalData ...
  const data = getLocalData('about/data.json', {
    title: "About Me",
    overview: { paragraphs: [], research_interests: [] },
    awards: { scholarships: [], prizes: [] },
    certificates: []
  });

  return (
    <main className="snap-container">
      <PageBackdrop seed="about" />
      
      {/* Block 1: Overview & Research Interests */}
      <section className="snap-section bg-variant-1">
        {/* ... existing content ... */}
        <div className="snap-content" style={{ display: 'flex', alignItems: 'center', gap: 'var(--step-4)', flexWrap: 'wrap-reverse' }}>
          <div style={{ flex: '1 1 500px' }}>
            <h1 className="snap-title" style={{ fontSize: 'var(--step-4)', marginBottom: '1.5rem' }}>{data.title}</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {data.overview.paragraphs.map((p: string, idx: number) => (
                <p key={idx} className="snap-desc" style={{ marginBottom: '0.5rem' }}>
                  {p}
                </p>
              ))}
            </div>
            
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: 'var(--step-1)', marginBottom: '1rem' }}>Research Interests</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {data.overview.research_interests.map((interest: string, idx: number) => (
                  <span key={idx} className="card-tag" style={{ 
                    padding: '0.5rem 1rem', 
                    borderRadius: '20px', 
                    border: '1px solid var(--border-color)',
                    fontSize: '0.9rem',
                    backgroundColor: 'var(--card-bg)'
                  }}>
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1 1 250px' }}>
            <Avatar />
          </div>
        </div>
      </section>

      {/* Block 2: Academic Awards */}
      <section className="snap-section bg-variant-2">
        <div className="snap-content">
          <h2 className="snap-title">Academic Awards</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            
            {/* Scholarships */}
            <div>
              <h3 style={{ color: 'var(--brand-color, #0070f3)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>🎓</span> Scholarships
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {data.awards.scholarships.map((item: any, idx: number) => (
                  <div key={idx} className="card" style={{ padding: '1.25rem' }}>
                    <h4 style={{ marginBottom: '0.5rem' }}>{item.name}</h4>
                    <p style={{ fontSize: '0.9rem' }}>{item.detail}</p>
                    <div className="card-ripple card-ripple-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* Prizes */}
            <div>
              <h3 style={{ color: 'var(--brand-color, #00c6ff)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>🏆</span> Prizes & Competitions
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {data.awards.prizes.map((item: any, idx: number) => (
                  <div key={idx} className="card" style={{ padding: '1.25rem' }}>
                    <h4 style={{ marginBottom: '0.5rem' }}>{item.name}</h4>
                    <p style={{ fontSize: '0.9rem' }}>{item.detail}</p>
                    <div className="card-ripple card-ripple-1" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Block 3: Certificates */}
      <section className="snap-section bg-variant-3">
        <div className="snap-content">
          <h2 className="snap-title">Certifications</h2>
          <p className="snap-desc">Professional and language certifications.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
            {data.certificates.map((cert: any, idx: number) => (
              <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--brand-color, var(--text-color))' }}>{cert.name}</h3>
                <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{cert.detail}</p>
                <div className="card-ripple card-ripple-1" />
                <div className="card-ripple card-ripple-2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="snap-section bg-variant-1" style={{ height: 'auto', minHeight: 'auto', padding: '4rem 0' }}>
        <Footer />
      </section>

    </main>
  );
}
