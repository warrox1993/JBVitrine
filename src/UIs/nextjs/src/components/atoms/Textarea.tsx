import React from 'react';
import cls from './Textarea.module.css';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...rest }: Props) {
    return <textarea className={[cls.textarea, className].filter(Boolean).join(' ')} {...rest} />;
}
