'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface ExpandableCardProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: string;
  details?: string;
  tags?: string[];
  link?: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function ExpandableCard({ title, subtitle, description, details, tags, link, style, className = "card" }: ExpandableCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div 
      className={`${className} ${expanded ? 'card-active' : ''}`} 
      style={{ ...style, cursor: details ? 'pointer' : 'default' }} 
      onClick={() => details && setExpanded(!expanded)}
    >
      <div className="card-header">
        {title}
        {subtitle && <p style={{ fontWeight: 600, margin: '0.2rem 0 0.5rem', opacity: 0.8 }}>{subtitle}</p>}
        {description && <p style={{ fontSize: 'var(--step-0)', marginBottom: '0.5rem' }}>{description}</p>}
      </div>

      {details && (
        <p style={{
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          fontStyle: 'italic',
          opacity: 0.6,
          marginTop: '0.2rem',
        }}>
          {expanded ? 'Click to collapse' : 'Click to expand details'}
        </p>
      )}

      {details && expanded && (
        <div 
          className="card-expanded-content"
          style={{
            marginTop: '1rem',
            paddingTop: '0.5rem',
            paddingLeft: '1rem',
            borderLeft: '2px solid var(--border-color)',
            color: 'var(--text-color)',
            fontSize: '0.95rem'
          }} 
          onClick={(e) => e.stopPropagation()}
        >
          <ReactMarkdown
            components={{
              strong: ({ ...props }) => <strong style={{ fontWeight: '700' }} {...props} />,
              p: ({ ...props }) => <p style={{ marginBottom: '0.75rem' }} {...props} />,
              ul: ({ ...props }) => <ul style={{ marginLeft: '1.25rem', marginBottom: '0.75rem' }} {...props} />,
              li: ({ ...props }) => <li style={{ marginBottom: '0.4rem' }} {...props} />,
              img: ({ ...props }) => <img style={{ maxWidth: '100%', borderRadius: '8px', marginTop: '1rem' }} {...props} />
            }}
          >
            {details}
          </ReactMarkdown>
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
        {tags?.map((tag: string, i: number) => (
          <span key={i} className="card-tag" style={{
            backgroundColor: 'var(--bg-color)',
            border: '1px solid var(--border-color)',
            padding: '0.2rem 0.7rem',
            borderRadius: '20px',
            fontSize: 'var(--step--1)'
          }}>
            {tag}
          </span>
        ))}
      </div>

      {link && (
        <a href={link} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-block',
          marginTop: '1.25rem',
          color: 'var(--text-color)',
          textDecoration: 'underline',
          fontWeight: 600,
          fontSize: '0.9rem'
        }}>
          View Link ↗
        </a>
      )}
    </div>
  );
}
