interface ShieldLogoProps {
  size?: 'small' | 'medium' | 'large' | 'nav';
  className?: string;
}

export default function ShieldLogo({ size = 'medium', className = '' }: ShieldLogoProps) {
  const sizeClasses = {
    small: 'shield-small',
    medium: 'shield-icon',
    large: 'shield-icon',
    nav: 'shield-nav'
  };

  return (
    <div 
      className={`${sizeClasses[size]} ${className}`}
      data-testid="shield-logo"
    />
  );
}
