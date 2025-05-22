import Link from 'next/link';
import { LinkProps } from '@/interfaces/clickable.interface';

export const LinkComponent = ({ href, className, scroll, children }: LinkProps) => (
  <Link
    href={href}
    className={className}
    scroll={scroll}
  >
    {children}
  </Link>
);

