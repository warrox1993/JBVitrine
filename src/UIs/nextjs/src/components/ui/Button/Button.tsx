"use client";
import {
  ReactNode,
  ButtonHTMLAttributes,
  MouseEvent,
  MouseEventHandler,
} from "react";
import styles from "./Button.module.css";

type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'primary' | 'secondary';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonClickEvent = MouseEvent<HTMLButtonElement | HTMLAnchorElement>;

export type UnifiedButtonProps = {
  as?: 'button' | 'a';
  href?: string;
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
    solid: "solid",
    outline: "outline",
    ghost: "ghost",
    primary: "solid",
    secondary: "outline",
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
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        aria-disabled={disabled || loading || undefined}
        onClick={handleClick}
      >
        {leadingIcon && <span className={styles.icon}>{leadingIcon}</span>}
        {children}
        {trailingIcon && <span className={styles.icon}>{trailingIcon}</span>}
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
