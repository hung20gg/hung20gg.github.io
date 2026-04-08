import { getLocalData } from '@/lib/data';
import ExpandableCard from '@/components/ExpandableCard';
import PageBackdrop from '@/components/PageBackdrop';

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
          {normalizedData.map((item, idx) => (
            <div key={idx} className="card" style={{ 
              boxShadow: idx % 2 === 0 ? '0 4px 20px var(--accent-glow)' : 'none',
              transform: idx % 2 !== 0 ? 'rotate(-0.5deg)' : 'none',
              padding: '2rem'
            }}>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--text-color)', marginBottom: '0.2rem' }}>
                <span className="name-gradient">{item.company}</span>
              </h2>
              {item.total_timeline && <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontWeight: 500 }}>{item.total_timeline}</p>}
              
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1.5rem',
                borderLeft: '2px solid var(--border-color)',
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
                          backgroundColor: 'var(--text-color)',
                          boxShadow: '0 0 10px var(--accent-glow)'
                        }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                           <h3 style={{ fontSize: '1.3rem', color: 'var(--text-color)' }}>{role.title}</h3>
                           {role.employment_type && (
                             <span style={{ fontSize: '0.8rem', padding: '0.1rem 0.6rem', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-muted)' }}>
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
          ))}
        </div>
      )}
    </main>
  );
}
