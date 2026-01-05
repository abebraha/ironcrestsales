import { motion } from "framer-motion";

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

  // Morph animation based on size
  const morphVariants = {
    small: {
      scale: 0.8,
      filter: "brightness(1.1) saturate(1.2)",
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    medium: {
      scale: 1,
      filter: "brightness(1) saturate(1)",
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    large: {
      scale: 1.1,
      filter: "brightness(1.05) saturate(1.1)",
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    nav: {
      scale: 1,
      filter: "brightness(1) saturate(1)",
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const isNav = size === "nav";
  const isSmall = size === "small";
  
  // Choose appropriate logo based on context
  const logoSrc = (isNav || isScrolled || isSmall) ? "/ironcrest-logo-navy.png" : "/ironcrest-logo.png";

  return (
    <motion.img 
      src={logoSrc}
      alt="IronCrest Sales Logo"
      className={`${sizeClasses[size]} ${className} object-contain transition-all duration-500`}
      data-testid="logo"
      variants={morphVariants}
      animate={size}
      whileHover={{
        scale: 1.05,
        filter: "brightness(1.1) saturate(1.2) drop-shadow(0 0 20px rgba(251, 193, 18, 0.3))",
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
    />
  );
}

// Add isScrolled to the props for Logo
interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'nav';
  className?: string;
  isScrolled?: boolean;
}