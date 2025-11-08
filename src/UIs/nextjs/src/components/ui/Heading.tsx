import React from 'react';
import styles from './Heading.module.css';

type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  children: React.ReactNode;
  accent?: boolean;
  id?: string;
};

export function Heading({ as = 'h2', className, children, accent, id }: HeadingProps) {
  const Tag = as;
  const classes = [
    styles.heading,
    accent ? styles.accent : '',
    className || ''
  ].filter(Boolean).join(' ');

  return (
    <Tag
      id={id}
      className={classes}
    >
      {children}
    </Tag>
  );
}

export default Heading;
