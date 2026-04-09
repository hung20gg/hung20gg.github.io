import { getLocalData } from '@/lib/data';
import ExpandableCard from '@/components/ExpandableCard';
import PageBackdrop from '@/components/PageBackdrop';
import Footer from '@/components/Footer';

export default function ExperiencePage() {
  const data: any[] = getLocalData('experience/data.json', []);

  const normalizedData = data.map(item => {
    // If structured in the new 'roles' array format
    if (item.roles) return item;
    // Fallback for previous single-role format
    return {
      company: item.company,
      total_timeline: item.timeline,
      roles: [
        {
          title: item.role,
          employment_type: item.employment_type,
          timeline: item.timeline,
          description: item.description,
          details: item.details,
          tags: item.tags
        }
      ]
    };
  });

  return (
    <main className="container section-full">
      <PageBackdrop seed="experience" />
      <h1 className="snap-title">Experience</h1>

      {normalizedData.length === 0 ? (
        <p className="snap-desc">Please add content to content/experience/data.json.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '3rem' }}>
          {normalizedData.map((item, idx) => {
            const brandColor = item.color || undefined;
            const brandColorGlow = item.color ? `${item.color}40` : undefined;
            const brandColorBg = item.color ? `${item.color}15` : undefined; // ~8% opacity tint to replace bg completely

            return (
              <div key={idx} className="card" style={{
                padding: '1rem',
                '--brand-color': brandColor,
                '--brand-color-glow': brandColorGlow,
                '--brand-color-bg': brandColorBg,
              } as React.CSSProperties}>

                {/* Ambient Hover Ripples */}
                <div className="card-ripple card-ripple-1" />
                <div className="card-ripple card-ripple-2" />

                <h2 style={{ fontSize: '1.8rem', color: brandColor || 'var(--text-color)', marginBottom: '0.2rem' }}>
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      {item.company}
                    </a>
                  ) : (
                    <span>{item.company}</span>
                  )}
                </h2>
                {item.total_timeline && <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontWeight: 500 }}>{item.total_timeline}</p>}

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  borderLeft: '2px solid var(--brand-color, var(--border-color))',
                  marginLeft: '0.5rem',
                  paddingLeft: '1.5rem'
                }}>
                  {item.roles.map((role: any, rIdx: number) => (
                    <ExpandableCard
                      key={rIdx}
                      className="" // Override to not have card styling internally
                      title={
                        <div style={{ position: 'relative' }}>
                          <div style={{
                            position: 'absolute',
                            left: '-1.85rem',
                            top: '0.5rem',
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: brandColor || 'var(--text-color)',
                            boxShadow: '0 0 10px var(--brand-color-glow, var(--accent-glow))'
                          }} />
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-color)', margin: 0 }}>{role.title}</h3>
                            {role.employment_type && (
                              <span className="card-tag" style={{
                                fontSize: '0.75rem',
                                padding: '0.1rem 0.5rem',
                                border: '1px solid #4b5563',
                                borderRadius: '20px',
                                color: 'var(--text-muted)',
                                display: 'inline-flex',
                                alignItems: 'center'
                              }}>
                                {role.employment_type}
                              </span>
                            )}
                          </div>
                        </div>
                      }
                      subtitle={role.timeline}
                      description={role.description}
                      details={role.details}
                      tags={role.tags}
                      style={{ padding: '0' }}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
      
      <Footer />
    </main>
  );
}
