import React from 'react';
import cls from './Stack.module.css';
type Props = React.HTMLAttributes<HTMLDivElement> & { direction?: 'row'|'column'; gap?: string; };
export function Stack({ direction='column', gap, className, style, ...rest }: Props) {
    const cn = [direction === 'column' ? cls.col : cls.row, className].filter(Boolean).join(' ');
    return <div className={cn} style={{ ...(gap ? { ['--gap' as any]: gap } : {}), ...style }} {...rest} />;
}