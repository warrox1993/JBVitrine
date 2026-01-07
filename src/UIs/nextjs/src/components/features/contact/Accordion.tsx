'use client';

import React, { useState } from 'react';
import cls from './Accordion.module.css';

type AccordionItemType = {
    q: string;
    a: string;
};

type Props = {
    items: AccordionItemType[];
    className?: string;
};

export function Accordion({ items, className }: Props) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={[cls.accordion, className].filter(Boolean).join(' ')}>
            {items.map((item, index) => (
                <div key={index} className={cls.item}>
                    <button
                        className={cls.trigger}
                        onClick={() => toggle(index)}
                        aria-expanded={openIndex === index}
                        aria-controls={`accordion-content-${index}`}
                        id={`accordion-trigger-${index}`}
                    >
                        <span className={cls.question}>{item.q}</span>
                        <svg
                            className={[cls.icon, openIndex === index && cls.iconOpen].filter(Boolean).join(' ')}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path
                                d="M5 7.5L10 12.5L15 7.5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <div
                        id={`accordion-content-${index}`}
                        role="region"
                        aria-labelledby={`accordion-trigger-${index}`}
                        className={[cls.content, openIndex === index && cls.contentOpen].filter(Boolean).join(' ')}
                    >
                        <div className={cls.answer}>{item.a}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
