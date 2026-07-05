import React from 'react';
import cls from './Select.module.css';

type Props = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...rest }: Props) {
    return (
        <select className={[cls.select, className].filter(Boolean).join(' ')} {...rest}>
            {children}
        </select>
    );
}
