'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import styles from './OptimizedImage.module.css';

/**
 * OptimizedImage - Composant Image optimisé pour mobile et desktop
 *
 * Meilleures pratiques 2025:
 * - Lazy loading par défaut
 * - Formats modernes (AVIF/WebP)
 * - Sizes attribute responsive
 * - Placeholder blur automatique
 * - Error handling
 * - Loading skeleton
 */

export interface OptimizedImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;

  /**
   * Preset de sizes pour cas d'usage courants
   * - 'hero': Images plein écran (100vw sur mobile, 50vw sur desktop)
   * - 'card': Images dans cards (100vw mobile, 33vw desktop)
   * - 'thumbnail': Petites images (150px-300px)
   * - 'icon': Icons (48px-96px)
   * - 'avatar': Photos profil (64px-128px)
   * - 'full': Toujours 100vw
   * - 'custom': Utiliser la prop sizes directement
   */
  sizePreset?: 'hero' | 'card' | 'thumbnail' | 'icon' | 'avatar' | 'full' | 'custom';

  /**
   * Skeleton/loading state
   */
  showSkeleton?: boolean;

  /**
   * Error fallback
   */
  fallbackSrc?: string;

  /**
   * Aspect ratio (pour skeleton et placeholder)
   */
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | 'auto';
}

const SIZE_PRESETS = {
  // Hero: Plein écran mobile, moitié écran desktop
  hero: '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw',

  // Card: Plein écran mobile, 1/3 écran desktop
  card: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',

  // Thumbnail: Taille fixe avec retina
  thumbnail: '(max-width: 640px) 150px, (max-width: 1024px) 200px, 300px',

  // Icon: Petite taille
  icon: '(max-width: 768px) 48px, 64px',

  // Avatar: Taille moyenne
  avatar: '(max-width: 768px) 64px, 96px',

  // Full: Toujours plein écran
  full: '100vw',
};

const ASPECT_RATIOS = {
  square: '1 / 1',
  video: '16 / 9',
  portrait: '3 / 4',
  landscape: '4 / 3',
  auto: 'auto',
};

export default function OptimizedImage({
  src,
  alt,
  sizePreset = 'card',
  showSkeleton = true,
  fallbackSrc = '/images/placeholder.svg',
  aspectRatio = 'auto',
  priority = false,
  quality = 80,
  sizes,
  className,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Déterminer les sizes à utiliser
  const imageSizes = sizes || (sizePreset !== 'custom' ? SIZE_PRESETS[sizePreset] : undefined);

  // Gérer le chargement
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Gérer les erreurs
  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div
      className={`${styles.container} ${className || ''}`}
      style={{
        aspectRatio: aspectRatio !== 'auto' ? ASPECT_RATIOS[aspectRatio] : undefined,
      }}
    >
      {/* Skeleton pendant le chargement */}
      {showSkeleton && isLoading && !hasError && (
        <div className={styles.skeleton} aria-hidden="true" />
      )}

      {/* Image Next.js optimisée */}
      <Image
        src={hasError ? fallbackSrc : src}
        alt={alt}
        sizes={imageSizes}
        quality={quality}
        priority={priority}
        onLoad={handleLoadingComplete}
        onError={handleError}
        className={`${styles.image} ${isLoading ? styles.loading : styles.loaded}`}
        {...props}
      />
    </div>
  );
}
