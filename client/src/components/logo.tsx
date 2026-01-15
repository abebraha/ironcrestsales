import { motion } from "framer-motion";
import ShieldLogo from "./shield-logo";

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'nav';
  className?: string;
  isOverHero?: boolean;
}

export default function Logo({ size = 'medium', className = '', isOverHero = false }: LogoProps) {
  const isNav = size === 'nav' || size === 'small';
  
  if (isNav) {
    return (
      <motion.div 
        className={`flex items-center space-x-3 ${className}`}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.98 }}
        data-testid="logo"
      >
        <img 
          src="/shield-logo.png"
          alt="IronCrest Sales Shield"
          className="w-14 h-14 object-contain"
        />
        <span className={`font-montserrat font-bold text-xl tracking-tight whitespace-nowrap ${isOverHero ? 'text-[#1E3A5F]' : 'text-[#D4AF6A]'}`}>
          IRONCREST SALES
        </span>
      </motion.div>
    );
  }

  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-24 h-24',
    large: 'w-28 h-28',
    nav: 'w-32 h-20'
  };

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

  return (
    <motion.img 
      src="/ironcrest-logo.png"
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
