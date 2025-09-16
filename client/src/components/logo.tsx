interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'nav';
  className?: string;
}

export default function Logo({ size = 'medium', className = '' }: LogoProps) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-16 h-16',
    large: 'w-20 h-20',
    nav: 'w-10 h-10'
  };

  return (
    <img 
      src="/ironcrest-logo.png"
      alt="IronCrest Sales Logo"
      className={`${sizeClasses[size]} ${className} object-contain`}
      style={{ background: 'transparent' }}
      data-testid="logo"
    />
  );
}