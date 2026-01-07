import React from 'react';
import cls from './Input.module.css';
type Props = React.InputHTMLAttributes<HTMLInputElement>;
export function Input({ className, ...rest }: Props) {
    return <input className={[cls.input, className].filter(Boolean).join(' ')} {...rest} />;
}
