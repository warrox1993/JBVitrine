import React from 'react';
import cls from './Label.module.css';

type Props = React.LabelHTMLAttributes<HTMLLabelElement> & {
    required?: boolean;
};

export function Label({ className, required, children, ...rest }: Props) {
    return (
        <label className={[cls.label, className].filter(Boolean).join(' ')} {...rest}>
            {children}
            {required && <span className={cls.required} aria-label="required">*</span>}
        </label>
    );
}
