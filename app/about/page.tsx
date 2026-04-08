import { getLocalData } from '@/lib/data';
import Avatar from '@/components/Avatar';
import PageBackdrop from '@/components/PageBackdrop';

export default function AboutPage() {
  const data = getLocalData('about/data.json', {
    title: "About",
    paragraphs: ["Please add content/about/data.json."]
  });

  return (
    <main className="container section-full">
      <PageBackdrop seed="about" />
      <h1 className="snap-title">{data.title}</h1>
      
      <div style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start', flexWrap: 'wrap-reverse', marginTop: '2rem' }}>
        <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {data.paragraphs.map((p: string, idx: number) => (
            <p key={idx} className="snap-desc" style={{ maxWidth: '800px', fontSize: '1.2rem' }}>
              {p}
            </p>
          ))}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Avatar />
        </div>
      </div>
    </main>
  );
}
