'use client';

import React from 'react';
import { Calculator, MessageSquare, ArrowLeft } from 'lucide-react';
import cls from './ContactModeSelector.module.css';

export type ContactMode = 'wizard' | 'direct';

interface ContactModeSelectorProps {
  currentMode: ContactMode | null;
  onModeChange: (mode: ContactMode) => void;
  onBack?: () => void;
}

export function ContactModeSelector({
  currentMode,
  onModeChange,
  onBack,
}: ContactModeSelectorProps) {
  return (
    <div className={`${cls.container} ${currentMode ? cls.hasSelection : ''}`}>
      <div className={cls.modes}>
        <div className={cls.cardWrapper}>
          {currentMode === 'wizard' && onBack && (
            <button
              type="button"
              className={cls.backButton}
              onClick={onBack}
            >
              <ArrowLeft size={16} />
              Retour
            </button>
          )}
          <button
            type="button"
            className={`${cls.modeCard} ${currentMode === 'wizard' ? cls.selected : ''}`}
            onClick={() => !currentMode && onModeChange('wizard')}
            disabled={currentMode !== null}
          >
            <div className={cls.modeIcon}>
              <Calculator size={32} strokeWidth={1.5} />
            </div>
            <h3 className={cls.modeTitle}>Nouveau projet</h3>
            <p className={cls.modeDescription}>
              Site web, e-commerce, application, audit cyber, IA : configurez votre projet et obtenez un devis instantané
            </p>
            <div className={cls.modeBadge}>Pour les projets</div>
          </button>
        </div>

        <div className={cls.cardWrapper}>
          {currentMode === 'direct' && onBack && (
            <button
              type="button"
              className={cls.backButton}
              onClick={onBack}
            >
              <ArrowLeft size={16} />
              Retour
            </button>
          )}
          <button
            type="button"
            className={`${cls.modeCard} ${currentMode === 'direct' ? cls.selected : ''}`}
            onClick={() => !currentMode && onModeChange('direct')}
            disabled={currentMode !== null}
          >
            <div className={cls.modeIcon}>
              <MessageSquare size={32} strokeWidth={1.5} />
            </div>
            <h3 className={cls.modeTitle}>Autre demande</h3>
            <p className={cls.modeDescription}>
              CV, assistance technique, bug, partenariat ou toute autre demande non liée à un nouveau projet
            </p>
            <div className={cls.modeBadge}>Hors projets</div>
          </button>
        </div>
      </div>
    </div>
  );
}
