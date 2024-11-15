interface Clickable {
  children?: React.ReactNode;
  className?: string;
  variant:
    | 'linkButtonPrimary'
    | 'linkButtonSecondary'
    | 'nav'
    | 'footer'
    | 'text'
    | 'icon'
    | 'menu'
    | 'close'
    | 'logo'
    | 'imgContainer'
    | 'yachtName'
    | 'currency'
    | 'secondaryButton'
    | 'emailAddress'
    | 'pagination';
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
