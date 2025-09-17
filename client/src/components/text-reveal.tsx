import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  type?: 'word' | 'letter';
}

export const TextReveal = ({ 
  children, 
  className = "", 
  delay = 0,
  stagger = 0.03,
  type = 'word'
}: TextRevealProps) => {
  const items = type === 'word' 
    ? children.split(' ').map(word => word + ' ')
    : children.split('');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      }
    }
  };

  const item: Variants = {
    hidden: {
      y: 20,
      opacity: 0,
      filter: "blur(10px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      }
    }
  };

  return (
    <motion.span
      className={`text-reveal ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {items.map((text, i) => (
        <motion.span
          key={i}
          variants={item}
          style={{ display: 'inline-block', whiteSpace: type === 'word' ? 'pre' : 'normal' }}
        >
          {text}
        </motion.span>
      ))}
    </motion.span>
  );
};

interface GlowTextProps {
  children: ReactNode;
  className?: string;
}

export const GlowText = ({ children, className = "" }: GlowTextProps) => {
  return (
    <motion.span
      className={`relative ${className}`}
      animate={{
        textShadow: [
          "0 0 20px hsla(43, 96%, 56%, 0)",
          "0 0 30px hsla(43, 96%, 56%, 0.5)",
          "0 0 20px hsla(43, 96%, 56%, 0)",
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.span>
  );
};