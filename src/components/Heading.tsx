import type { ReactNode } from 'react';

/** Section heading in the developer-site register: Marcellus caps, wide tracking. */
export function Heading({ children, className = '', as: Tag = 'h2', size = 'md', center = false }: { children: ReactNode; className?: string; as?: 'h1' | 'h2' | 'h3'; size?: 'sm' | 'md' | 'lg'; center?: boolean }) {
  const sz = size === 'lg' ? 'text-[26px] md:text-[38px] lg:text-[44px]' : size === 'sm' ? 'text-[15px] md:text-[17px]' : 'text-[22px] md:text-[30px]';
  return <Tag className={`display ${sz} text-ink ${center ? 'text-center' : ''} ${className}`}>{children}</Tag>;
}

export function Body({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`text-[13.5px] md:text-[14.5px] leading-[1.85] text-soft ${className}`}>{children}</p>;
}
