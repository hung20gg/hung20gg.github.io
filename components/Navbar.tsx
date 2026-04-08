import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" className="nav-link" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-color)' }}>
          NQH
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div className="nav-links">
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/experience" className="nav-link">Experience</Link>
            <Link href="/research" className="nav-link">Research</Link>
            <Link href="/projects" className="nav-link">Projects</Link>
            <Link href="/publications" className="nav-link">Publications</Link>
            <Link href="/skills" className="nav-link">Skills</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
