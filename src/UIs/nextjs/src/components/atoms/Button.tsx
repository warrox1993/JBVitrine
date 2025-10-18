import React from 'react';
import cls from './Button.module.css';

type Variant = 'primary' | 'neutral' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    size?: Size;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
};

export function Button({ variant = 'primary', size = 'md', leftIcon, rightIcon, className, children, ...rest }: ButtonProps) {
    const cn = [cls.root, variant !== 'primary' && cls[variant], cls[size], className].filter(Boolean).join(' ');
    return (
        <button className={cn} {...rest}>
            {leftIcon}{children}{rightIcon}
        </button>
    );
}