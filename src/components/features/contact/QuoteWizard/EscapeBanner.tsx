'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';
import cls from './EscapeBanner.module.css';

interface EscapeBannerProps {
  onSwitch: () => void;
}

export function EscapeBanner({ onSwitch }: EscapeBannerProps) {
  return (
    <div className={cls.banner}>
      <div className={cls.content}>
        <div className={cls.icon}>
          <MessageSquare size={18} />
        </div>
        <p className={cls.text}>
          Problème technique, CV ou autre demande (hors nouveau projet) ?{' '}
          <button type="button" onClick={onSwitch} className={cls.link}>
            Contactez-nous directement
          </button>
        </p>
      </div>
    </div>
  );
}
