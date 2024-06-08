'use client';

import Link from 'next/link';
import Image from 'next/image';
import { pageLinksArray } from '@/utils/links/pageLinks';
import FooterLogo from '@/public/icons/logo_footer.svg';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import Copyright from '../Copyright/Copyright';
import SocialMedia from '../SocialMedia/SocialMedia';
import styles from './footer.module.scss';

const leftLinks = pageLinksArray.slice(0, 3);
const rightLinks = pageLinksArray.slice(3);

const Footer = () => {
  const { width } = useWindowDimensions();
  const smallScreen = (width as number) <= 786;
  const color = '#E7801A';
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footer__logo} ${styles.footer__side}`}>
        <Link href="/">
          <Image
            src={FooterLogo}
            className={styles.logo__img}
            alt="Logo"
            priority
          />
        </Link>
        {!smallScreen && <Copyright />}
      </div>
      <div className={styles.footer__links_container}>
        <div className={styles.footer__links}>
          {leftLinks.map((link) => (
            <Link
              key={link.title}
              href={link.path}
              className={styles.link}
            >
              {link.title}
            </Link>
          ))}
        </div>
        <div className={styles.footer__links}>
          {rightLinks.map((link) => (
            <Link
              key={link.title}
              href={link.path}
              className={styles.link}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
      <div className={`${styles.footer__side} ${styles.footer__social}`}>
        <SocialMedia color={color} />
        {smallScreen && <Copyright />}
      </div>
    </footer>
  );
};

export default Footer;
