interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'nav';
  className?: string;
}

export default function Logo({ size = 'medium', className = '' }: LogoProps) {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-24 h-24',
    large: 'w-28 h-28',
    nav: 'w-32 h-20'
  };

  return (
    <img 
      src="/ironcrest-logo.png"
      alt="IronCrest Sales Logo"
      className={`${sizeClasses[size]} ${className} object-contain`}
      data-testid="logo"
    />
  );
}