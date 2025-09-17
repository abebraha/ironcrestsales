import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageSkeleton } from "./skeleton-loaders";
import { cn } from "@/lib/utils";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
  aspectRatio?: string;
  onLoad?: () => void;
  onError?: () => void;
  blur?: boolean;
  animationType?: "fade" | "scale" | "slide" | "blur";
}

export function ProgressiveImage({
  src,
  alt,
  className = "",
  placeholderSrc,
  aspectRatio = "auto",
  onLoad,
  onError,
  blur = true,
  animationType = "fade"
}: ProgressiveImageProps) {
  const [imageStatus, setImageStatus] = useState<"loading" | "loaded" | "error">("loading");
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc || "");
  const [isInView, setIsInView] = useState(false);

  // Lazy loading with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    const element = document.querySelector(`[data-image-id="${src}"]`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [src]);

  // Load image when in view
  useEffect(() => {
    if (!isInView) return;

    const img = new Image();
    
    img.onload = () => {
      setCurrentSrc(src);
      setImageStatus("loaded");
      onLoad?.();
    };
    
    img.onerror = () => {
      setImageStatus("error");
      onError?.();
    };
    
    img.src = src;
  }, [src, isInView, onLoad, onError]);

  const animationVariants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 }
    },
    slide: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 }
    },
    blur: {
      initial: { opacity: 0, filter: "blur(20px)" },
      animate: { opacity: 1, filter: "blur(0px)" },
      exit: { opacity: 0, filter: "blur(20px)" }
    }
  };

  return (
    <div
      data-image-id={src}
      className={cn("relative overflow-hidden rounded-lg", className)}
      style={{ aspectRatio }}
      data-testid="progressive-image"
    >
      <AnimatePresence mode="wait">
        {imageStatus === "loading" && (
          <motion.div
            key="skeleton"
            className="absolute inset-0"
            initial={{ opacity: 1 }}
            exit={animationVariants[animationType].exit}
            transition={{ duration: 0.3 }}
          >
            <ImageSkeleton className="w-full h-full" aspectRatio={aspectRatio} />
          </motion.div>
        )}

        {imageStatus === "loaded" && (
          <motion.img
            key="image"
            src={currentSrc}
            alt={alt}
            className={cn(
              "w-full h-full object-cover",
              blur && imageStatus === "loading" && "blur-sm"
            )}
            variants={animationVariants[animationType]}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.5,
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
          />
        )}

        {imageStatus === "error" && (
          <motion.div
            key="error"
            className="absolute inset-0 flex items-center justify-center bg-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center p-4">
              <svg
                className="w-12 h-12 mx-auto mb-2 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="text-sm text-muted-foreground">Failed to load image</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blur overlay during loading */}
      {blur && imageStatus === "loading" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      )}
    </div>
  );
}

// Image gallery with loading states
export function ImageGallery({
  images,
  className = "",
  columns = 3
}: {
  images: Array<{ src: string; alt: string; id: string }>;
  className?: string;
  columns?: number;
}) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => new Set(prev).add(id));
  };

  return (
    <motion.div
      className={cn(
        `grid gap-4`,
        columns === 2 && "grid-cols-1 md:grid-cols-2",
        columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        className
      )}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          variants={{
            hidden: { opacity: 0, y: 20, scale: 0.95 },
            visible: { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: {
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.43, 0.13, 0.23, 0.96]
              }
            }
          }}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <ProgressiveImage
            src={image.src}
            alt={image.alt}
            aspectRatio="4/3"
            onLoad={() => handleImageLoad(image.id)}
            animationType="blur"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

// Hero image with parallax effect
export function HeroImage({
  src,
  alt,
  className = "",
  parallax = true,
  overlay = true
}: {
  src: string;
  alt: string;
  className?: string;
  parallax?: boolean;
  overlay?: boolean;
}) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!parallax) return;

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [parallax]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="relative w-full h-full"
        style={{
          transform: parallax ? `translateY(${scrollY * 0.5}px)` : undefined
        }}
      >
        <ProgressiveImage
          src={src}
          alt={alt}
          className="w-full h-full"
          animationType="scale"
        />
      </motion.div>

      {overlay && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      )}
    </div>
  );
}