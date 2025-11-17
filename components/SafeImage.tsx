"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fallbackClassName?: string;
}

// Try .jpg first since that's what we have, then fallback to other formats
const imageExtensions = ['.jpg', '.jpeg', '.webp', '.avif', '.png'];

function getImagePaths(basePath: string): string[] {
  // If src already has an extension, return it as-is
  if (/\.(webp|avif|jpg|jpeg|png)$/i.test(basePath)) {
    return [basePath];
  }
  
  // Otherwise, try all extensions
  return imageExtensions.map(ext => `${basePath}${ext}`);
}

export default function SafeImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
  priority,
  fallbackClassName = "bg-panel",
}: SafeImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Reset state when src changes
    setHasError(false);
    setIsLoading(true);
    setCurrentIndex(0);
    // Start with first extension attempt
    const paths = getImagePaths(src);
    setImageSrc(paths[0]);
  }, [src]);

  const handleError = () => {
    // Remove extension from current src to get base path
    const basePath = imageSrc.replace(/\.(webp|avif|jpg|jpeg|png)$/i, '');
    const paths = getImagePaths(basePath);
    
    if (currentIndex < paths.length - 1) {
      // Try next extension
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setImageSrc(paths[nextIndex]);
    } else {
      // All extensions failed
      setHasError(true);
      setIsLoading(false);
    }
  };

  if (hasError) {
    return (
      <div
        className={fill ? `absolute inset-0 ${fallbackClassName}` : `${fallbackClassName} ${className || ""}`}
        style={!fill ? { width, height } : undefined}
      >
        <div className="flex items-center justify-center h-full text-ink/40 text-sm">
          {alt}
        </div>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={`${className || ""} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity`}
        sizes={sizes}
        priority={priority}
        onError={handleError}
        onLoad={() => setIsLoading(false)}
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={`${className || ""} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity`}
      priority={priority}
      onError={handleError}
      onLoad={() => setIsLoading(false)}
    />
  );
}

