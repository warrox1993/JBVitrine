'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { MessageSquare } from 'lucide-react';
import cls from './EscapeBanner.module.css';

interface EscapeBannerProps {
  onSwitch: () => void;
}

export function EscapeBanner({ onSwitch }: EscapeBannerProps) {
  const t = useTranslations('wizard');
  return (
    <div className={cls.banner}>
      <div className={cls.content}>
        <div className={cls.icon}>
          <MessageSquare size={18} />
        </div>
        <p className={cls.text}>
          {t.rich('escape.text', {
            link: (c) => (
              <button type="button" onClick={onSwitch} className={cls.link}>
                {c}
              </button>
            ),
          })}
        </p>
      </div>
    </div>
  );
}
