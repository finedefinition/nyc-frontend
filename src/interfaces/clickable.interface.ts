export type Variant =
  | 'button'
  | 'primary'
  | 'secondary'
  | 'link'
  | 'footer'
  | 'text'
  | 'pagination';

interface Clickable {
  children?: React.ReactNode;
  className?: string;
  variants?: Variant[];
}

export interface ButtonProps extends Clickable {
  type: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean | undefined;
  onClick?: () => void;
}

export interface LinkProps extends Clickable {
  href: string;
  target?: string;
  scroll?: boolean;
}
