interface ShieldLogoProps {
  size?: 'small' | 'medium' | 'large' | 'nav';
  className?: string;
}

export default function ShieldLogo({ size = 'medium', className = '' }: ShieldLogoProps) {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-28 h-28',
    large: 'w-48 h-48',
    nav: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src="/shield-logo.png"
        alt="IronCrest Sales Shield"
        className={`${sizeClasses[size]} object-contain drop-shadow-lg`}
        data-testid="shield-logo"
      />
    </div>
  );
}
