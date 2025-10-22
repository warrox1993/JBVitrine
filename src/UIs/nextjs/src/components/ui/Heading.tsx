import React from 'react';

type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  children: React.ReactNode;
  accent?: boolean;
  style?: React.CSSProperties;
  id?: string;
};

export function Heading({ as = 'h2', className, children, accent, style, id }: HeadingProps) {
  const Tag = as as any;
  const cls = className ? ` ${className}` : '';
  const base: React.CSSProperties = {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 'var(--text-3xl)',
    lineHeight: 1.2 as any,
    marginBottom: 'var(--space-4)'
  };
  const accentStyle: React.CSSProperties | undefined = accent
    ? {
        background: 'linear-gradient(135deg, var(--color-text-1) 0%, var(--color-accent-1) 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent' as any
      }
    : undefined;
  return (
    <Tag
      id={id}
      className={cls.trim()}
      style={{ ...base, ...(accentStyle || {}), ...(style || {}) }}
    >
      {children}
    </Tag>
  );
}

export default Heading;
