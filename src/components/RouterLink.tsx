import { Link, type LinkProps } from 'react-router-dom';
import type { ReactNode } from 'react';

export interface RouterLinkProps extends LinkProps {
  children: ReactNode;
}

export function RouterLink({ to, children, ...props }: RouterLinkProps) {
  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
}

