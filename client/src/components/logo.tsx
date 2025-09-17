interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'nav';
  className?: string;
}

export default function Logo({ size = 'medium', className = '' }: LogoProps) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-16 h-16',
    large: 'w-20 h-20',
    nav: 'w-24 h-16'
  };

  return (
    <img 
      src="/ironcrest-logo.png"
      alt="IronCrest Sales Logo"
      className={`${sizeClasses[size]} ${className} object-contain`}
      style={{ 
        mixBlendMode: 'multiply',
        filter: 'brightness(1.2) contrast(1.1)'
      }}
      data-testid="logo"
    />
  );
}