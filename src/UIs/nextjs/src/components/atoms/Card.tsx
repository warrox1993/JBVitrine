import React from 'react';
import cls from './Card.module.css';

export function Card({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={[cls.root, className].filter(Boolean).join(' ')}>{children}</div>;
}
export function CardHeader({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={[cls.header, className].filter(Boolean).join(' ')} {...rest} />;
}
export function CardBody({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={[cls.body, className].filter(Boolean).join(' ')} {...rest} />;
}
export function CardFooter({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={[cls.footer, className].filter(Boolean).join(' ')} {...rest} />;
}
