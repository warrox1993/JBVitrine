import React from 'react';
export function Container({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
    const cn = ['container', className].filter(Boolean).join(' ');
    return <div className={cn} {...rest} />;
}