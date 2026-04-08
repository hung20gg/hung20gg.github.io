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
    <div className={className} style={{ ...style, cursor: details ? 'pointer' : 'default' }} onClick={() => details && setExpanded(!expanded)}>
      {title}
      {subtitle && <p style={{ fontWeight: 600, margin: '0.2rem 0 0.5rem', opacity: 0.8 }}>{subtitle}</p>}
      {description && <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{description}</p>}
      
      {details && (
        <p style={{ 
          fontSize: '0.85rem', 
          color: 'var(--text-muted)', 
          fontStyle: 'italic',
          opacity: 0.5,
          marginTop: '0.2rem',
          transition: 'opacity 0.2s',
        }}>
          {expanded ? 'Click to collapse' : 'Click to expand'}
        </p>
      )}

      {details && expanded && (
        <div style={{ 
          marginTop: '0.5rem',
          paddingTop: '0.5rem', 
          paddingLeft: '1.5rem',
          borderLeft: '2px solid var(--border-color)',
          color: 'var(--text-color)' 
        }} onClick={(e) => e.stopPropagation()}>
          <ReactMarkdown
            components={{
              strong: ({node, ...props}) => <strong style={{color: 'var(--text-color)', fontWeight: 'bold'}} {...props} />,
              p: ({node, ...props}) => <p style={{marginBottom: '1rem'}} {...props} />,
              ul: ({node, ...props}) => <ul style={{marginLeft: '1.5rem', marginBottom: '1rem'}} {...props} />,
              li: ({node, ...props}) => <li style={{marginBottom: '0.5rem'}} {...props} />,
              img: ({node, ...props}) => <img style={{maxWidth: '100%', borderRadius: '8px', marginTop: '1rem'}} {...props} />
            }}
          >
            {details}
          </ReactMarkdown>
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
        {tags?.map((tag: string, i: number) => (
          <span key={i} style={{ 
            backgroundColor: 'var(--bg-color)', 
            border: '1px solid var(--border-color)',
            padding: '0.2rem 0.8rem', 
            borderRadius: '20px', 
            fontSize: '0.85rem' 
          }}>
            {tag}
          </span>
        ))}
      </div>
      
      {link && (
        <a href={link} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-block',
          marginTop: '1rem',
          color: 'var(--text-color)',
          textDecoration: 'underline',
          fontWeight: 600
        }}>
          View Link ↗
        </a>
      )}
    </div>
  );
}
