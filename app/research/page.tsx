import { getLocalData } from '@/lib/data';
import PageBackdrop from '@/components/PageBackdrop';
import ExpandableCard from '@/components/ExpandableCard';
import Footer from '@/components/Footer';

export default function ResearchPage() {
  const data: any[] = getLocalData('research/data.json', []);

  const normalizedData = data.map(item => {
    if (item.roles) return item;
    return {
      lab: item.lab,
      color: item.color,
      url: item.url,
      roles: [
        {
          title: item.role,
          topic: item.topic,
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
      <PageBackdrop seed="research" />
      <h1 className="snap-title">Research</h1>
      
      {normalizedData.length === 0 ? (
        <p className="snap-desc">Please add content to content/research/data.json.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '3rem' }}>
          {normalizedData.map((item, idx) => {
            const brandColor = item.color || undefined;
            const brandColorGlow = item.color ? `${item.color}40` : undefined;
            const brandColorBg = item.color ? `${item.color}15` : undefined;

            return (
            <div key={idx} className="card" style={{ 
              padding: '2rem',
              '--brand-color': brandColor,
              '--brand-color-glow': brandColorGlow,
              '--brand-color-bg': brandColorBg,
            } as React.CSSProperties}>
              
              {/* Ambient Hover Ripples */}
              <div className="card-ripple card-ripple-1" />
              <div className="card-ripple card-ripple-2" />

              <h2 style={{ fontSize: '1.8rem', color: brandColor || 'var(--text-color)', marginBottom: '1.5rem' }}>
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    {item.lab}
                  </a>
                ) : (
                  <span>{item.lab}</span>
                )}
              </h2>
              
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1.5rem',
                borderLeft: '2px dashed var(--brand-color, var(--border-color))',
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.60rem' }}>
                           <h3 style={{ fontSize: '1.3rem', color: 'var(--text-color)', margin: 0 }}>{role.title}</h3>
                        </div>
                      </div>
                    }
                    subtitle={role.timeline}
                    description={`Topic: ${role.topic}`}
                    details={role.details}
                    tags={role.tags}
                    style={{ padding: '0' }}
                  />
                ))}
              </div>
            </div>
          )})}
        </div>
      )}
      
      <Footer />
    </main>
  );
}
