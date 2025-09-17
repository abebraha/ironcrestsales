interface ShieldLogoProps {
  size?: 'small' | 'medium' | 'large' | 'nav';
  className?: string;
}

export default function ShieldLogo({ size = 'medium', className = '' }: ShieldLogoProps) {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-20 h-20',
    large: 'w-32 h-32',
    nav: 'w-8 h-8'
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
