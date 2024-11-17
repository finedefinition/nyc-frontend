export type Variant =
  | 'button'
  | 'primary'
  | 'secondary'
  | 'link'
  | 'footer'
  | 'text';

interface Clickable {
  children?: React.ReactNode;
  className?: string;
  variants?: Variant[];
  // variant:
  //   | 'linkButtonPrimary'
  //   | 'linkButtonSecondary'
  //   | 'nav'
  //   | 'footer'
  //   | 'text'
  //   | 'icon'
  //   | 'menu'
  //   | 'close'
  //   | 'logo'
  //   | 'imgContainer'
  //   | 'yachtName'
  //   | 'currency'
  //   | 'secondaryButton'
  //   | 'emailAddress'
  //   | 'pagination';
}

export interface ButtonProps extends Clickable {
  type: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean | undefined;
  onClick?: () => void;
}

export interface LinkProps extends Clickable {
  href: string;
  target?: string;
}
