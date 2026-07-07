"use client";
import {
  ReactNode,
  ButtonHTMLAttributes,
  MouseEvent,
  MouseEventHandler,
} from "react";
import { Link } from "@/i18n/navigation";
import styles from "./Button.module.css";

type ButtonVariant =
  | 'solid'
  | 'outline'
  | 'ghost'
  | 'primary'
  | 'secondary'
  | 'navy'
  | 'light'
  | 'ghostD';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonClickEvent = MouseEvent<HTMLButtonElement | HTMLAnchorElement>;

export type UnifiedButtonProps = {
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
  onClick?: (event: ButtonClickEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'disabled' | 'type' | 'children' | 'aria-label'>;

function classes(
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth?: boolean,
  extra?: string,
  disabled?: boolean | null,
) {
  const variantClassMap: Record<ButtonVariant, keyof typeof styles> = {
    solid: "primary",
    outline: "ghost",
    ghost: "ghost",
    primary: "primary",
    secondary: "navy",
    navy: "navy",
    light: "light",
    ghostD: "ghostD",
  };

  const resolvedVariant = variantClassMap[variant];

  return [
    styles.root,
    styles[resolvedVariant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    disabled ? styles.disabled : '',
    extra || ''
  ].filter(Boolean).join(' ');
}

export function Button({
  as = 'button',
  href,
  target,
  variant = 'solid',
  size = 'md',
  fullWidth,
  disabled,
  loading,
  leadingIcon,
  trailingIcon,
  className,
  onClick,
  type = 'button',
  ariaLabel,
  children,
  ...rest
}: UnifiedButtonProps) {
  const cls = classes(variant, size, fullWidth, className, disabled || loading);

  if (as === 'a' && href) {
    const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
      if (disabled || loading) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      onClick?.(e);
    };
    const inner = (
      <>
        {leadingIcon && <span className={styles.icon}>{leadingIcon}</span>}
        {children}
        {trailingIcon && <span className={styles.icon}>{trailingIcon}</span>}
      </>
    );
    // Internal routes ("/...") use the locale-aware Link so the /nl, /en prefix
    // is kept. External / tel: / mailto: / #anchor hrefs stay a plain <a>.
    if (href.startsWith("/")) {
      return (
        <Link
          href={href}
          className={cls}
          aria-label={ariaLabel}
          aria-disabled={disabled || loading || undefined}
          onClick={handleClick}
        >
          {inner}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={cls}
        aria-label={ariaLabel}
        aria-disabled={disabled || loading || undefined}
        onClick={handleClick}
      >
        {inner}
      </a>
    );
  }

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (loading) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <button
      type={type}
      className={cls}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      onClick={handleButtonClick}
      {...rest}
    >
      {leadingIcon && <span className={styles.icon}>{leadingIcon}</span>}
      {children}
      {trailingIcon && <span className={styles.icon}>{trailingIcon}</span>}
    </button>
  );
}

export default Button;
