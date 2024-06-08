export interface ButtonInterface {
  text: string;
  linkTo: string;
  primary?: boolean;
  click?: () => void;
}
