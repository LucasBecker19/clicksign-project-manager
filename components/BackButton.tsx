'use client';

import Image from 'next/image';
import Link from 'next/link';

interface BackButtonProps {
  href: string;
  label?: string;
  onClick?: () => void;
  className?: string;
}

export default function BackButton({ href, label = 'Voltar', onClick, className = '' }: BackButtonProps) {
  return (
    <Link href={href} onClick={onClick} className={`flex items-center gap-2 cursor-pointer mb-2 w-fit ${className}`}>
      <Image src="/images/arrow-left.svg" alt="back button" width={16} height={16} />
      <span className="align-middle text-accent">{label}</span>
    </Link>
  );
}
