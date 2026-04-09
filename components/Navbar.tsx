'use client';

import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '/about', label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/research', label: 'Research' },
  { href: '/projects', label: 'Projects' },
  { href: '/publications', label: 'Publications' },
  { href: '/skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className="navbar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" className="nav-link" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-color)' }}>
            NQH
          </Link>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="nav-links">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </Link>
              ))}
            </div>
            
            <ThemeToggle />
            
            <button 
              className={`hamburger ${isMenuOpen ? 'open' : ''}`} 
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div className={`mobile-nav-overlay ${isMenuOpen ? 'open' : ''}`}>
        {links.map((link) => (
          <Link 
            key={link.href} 
            href={link.href} 
            className="mobile-nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
