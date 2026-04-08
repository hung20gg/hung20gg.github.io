import { getLocalData } from '@/lib/data';
import PageBackdrop from '@/components/PageBackdrop';

export default function ResearchPage() {
  const data: any[] = getLocalData('research/data.json', []);

  const normalizedData = data.map(item => {
    if (item.roles) return item;
    return {
      lab: item.lab,
      roles: [
        {
          title: item.role,
          topic: item.topic,
          timeline: item.timeline
        }
      ]
    };
  });

  return (
    <main className="container section-full">
      <PageBackdrop seed="research" />
      <h1 className="snap-title">Research</h1>
      
      {normalizedData.length === 0 ? (
        <p className="snap-desc">Please add content to content/research/data.json.</p>
      ) : (
        <div style={{ display: 'grid', gap: '3rem', marginTop: '2rem' }}>
          {normalizedData.map((item, idx) => (
            <div key={idx} className="card" style={{
              borderLeft: `4px solid ${idx % 2 === 0 ? '#38bdf8' : '#818cf8'}`,
              borderRadius: '0 12px 12px 0',
              padding: '2rem'
            }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--text-color)' }}>
                {item.lab}
              </h2>
              
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1.5rem',
                borderLeft: '2px dashed var(--border-color)',
                marginLeft: '0.5rem',
                paddingLeft: '1.5rem'
              }}>
                {item.roles.map((role: any, rIdx: number) => (
                  <div key={rIdx} style={{ position: 'relative' }}>
                    <div style={{ 
                      position: 'absolute', 
                      left: '-1.85rem', 
                      top: '0.5rem', 
                      width: '10px', 
                      height: '10px', 
                      borderRadius: '50%', 
                      backgroundColor: 'var(--text-color)'
                    }} />
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '0.2rem' }}>{role.title}</h3>
                    {role.topic && <p style={{ fontWeight: 500, color: 'var(--text-color)' }}>Topic: {role.topic}</p>}
                    <p style={{ marginTop: '0.5rem', opacity: 0.8 }}>{role.timeline}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
