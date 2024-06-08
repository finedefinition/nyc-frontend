import Link from 'next/link';
import { ButtonInterface } from '@/interfaces/button.interface';
import styles from './textButton.module.scss';

function TextButton({
  text,
  linkTo,
  primary,
} : ButtonInterface) {

  const textButtonStyle = primary ? styles.primary : styles.secondary;

  return (
    <Link
      href={linkTo}
      className={textButtonStyle}>
      {text}
    </Link>
  );
};

export default TextButton;
