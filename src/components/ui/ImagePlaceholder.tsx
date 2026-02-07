import Image from 'next/image';

interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  aspectRatio?: '1/1' | '4/3' | '3/4';
  className?: string;
  priority?: boolean;
}

export function ImagePlaceholder({
  src,
  alt,
  aspectRatio = '1/1',
  className = '',
  priority = false,
}: ImagePlaceholderProps) {
  const placeholderStyle = {
    backgroundColor: 'var(--bg-2)',
    border: '2px dashed var(--neutral-1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--neutral-1)',
    fontSize: '0.875rem',
    aspectRatio: aspectRatio,
  };

  // Show placeholder if no src or if it's a local path (starts with /)
  const shouldShowPlaceholder = !src || src.startsWith('/');

  if (!shouldShowPlaceholder && src.startsWith('http')) {
    return (
      <div className={`relative ${className}`} style={{ aspectRatio }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          loading={priority ? undefined : 'lazy'}
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div className={className} style={placeholderStyle}>
      <span>{alt}</span>
    </div>
  );
}

