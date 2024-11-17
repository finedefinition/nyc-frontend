import Link from 'next/link';
import { LinkProps } from '@/interfaces/clickable.interface';

const LinkComponent = ({ href, className, children }: LinkProps) => (
  <Link
    href={href}
    className={className}
  >
    {children}
  </Link>
);

export default LinkComponent;
