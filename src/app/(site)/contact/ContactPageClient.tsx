'use client';

import { useEffect } from 'react';

export function ContactPageClient({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        document.body.classList.add('contact-page');
        return () => {
            document.body.classList.remove('contact-page');
        };
    }, []);

    return <>{children}</>;
}
