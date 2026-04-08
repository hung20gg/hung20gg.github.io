import { getLocalData } from '@/lib/data';
import PageBackdrop from '@/components/PageBackdrop';

export default function ContactPage() {
  const data = getLocalData('contact/data.json', { text: "Please add contact details." });

  return (
    <main className="container section-full">
      <PageBackdrop seed="contact" />
      <h1 className="snap-title">Contact</h1>
      <p className="snap-desc">{data.text}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        {data.email && <p><strong>Email:</strong> <a href={`mailto:${data.email}`}>{data.email}</a></p>}
        {data.linkedin && <p><strong>LinkedIn:</strong> <a href={data.linkedin} target="_blank">{data.linkedin}</a></p>}
        {data.github && <p><strong>GitHub:</strong> <a href={data.github} target="_blank">{data.github}</a></p>}
      </div>
    </main>
  );
}
