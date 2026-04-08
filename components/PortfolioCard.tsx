import Link from 'next/link';

interface PortfolioCardProps {
  title: string;
  description: string;
  href: string;
}

export default function PortfolioCard({ title, description, href }: PortfolioCardProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <Link href={href} className="card-link" aria-label={`Go to ${title}`} />
    </div>
  );
}
