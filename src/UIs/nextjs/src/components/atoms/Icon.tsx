import type { LucideIcon } from 'lucide-react';
type IconProps = { icon: LucideIcon; size?: number; strokeWidth?: number; color?: string; 'aria-label'?: string; };
export function Icon({ icon: I, size = 20, strokeWidth = 2, color = 'currentColor', ...rest }: IconProps) {
    return <I size={size} strokeWidth={strokeWidth} color={color} role="img" {...rest} />;
}