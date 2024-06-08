import Link from 'next/link';
import { ButtonInterface } from '@/interfaces/button.interface';
import styles from './button.module.scss';

function Button({ text, linkTo, primary, click }: ButtonInterface) {
  const buttonStyle = `${styles.button} ${
    primary ? styles.primary : styles.secondary
  }`;

  return (
    <Link
      href={linkTo}
      className={buttonStyle}
      onClick={click}
    >
      {text}
    </Link>
  );
}

export default Button;
