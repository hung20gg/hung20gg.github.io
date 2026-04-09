import { getLocalData } from '@/lib/data';
import ExpandableCard from '@/components/ExpandableCard';
import PageBackdrop from '@/components/PageBackdrop';
import Footer from '@/components/Footer';

export default function ProjectsPage() {
  const data: any[] = getLocalData('projects/data.json', []);

  return (
    <main className="container section-full">
      <PageBackdrop seed="projects" />
      <h1 className="snap-title">Projects</h1>
      
      {data.length === 0 ? (
        <p className="snap-desc">Please add content to content/projects/data.json.</p>
      ) : (
        <div className="cards-grid">
          {data.map((item, idx) => (
            <ExpandableCard 
              key={idx}
              title={<h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{item.name}</h3>}
              description={item.description}
              details={item.details}
              tags={item.tags}
              link={item.link}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
              }}
            />
          ))}
        </div>
      )}
      
      <Footer />
    </main>
  );
}
