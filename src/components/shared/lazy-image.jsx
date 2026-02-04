'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * A reusable image component that implements lazy loading 
 * with a smooth blur-to-clear transition.
 */
export function LazyImage({ 
  src, 
  alt, 
  fill, 
  width, 
  height, 
  className, 
  containerClassName,
  priority = false,
  dataAiHint
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn(
      "relative overflow-hidden bg-muted/20", 
      containerClassName,
      fill && "h-full w-full"
    )}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        data-ai-hint={dataAiHint}
        className={cn(
          "duration-700 ease-in-out transition-all",
          isLoading 
            ? "scale-110 blur-2xl grayscale" 
            : "scale-100 blur-0 grayscale-0",
          className
        )}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
}
