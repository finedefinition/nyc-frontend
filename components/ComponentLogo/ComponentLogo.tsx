import typo from '@/styles/typography.module.scss';
import LogoSvg from '../SvgIconsComponents/LogoSvg';
import styles from './componentLogo.module.scss';

type Props = {
  number: string;
  text: string;
  order: boolean;
};

const ComponentLogo = ({ number, text, order }: Props) => {
  const color = order ? '#E7801A' : '#31455B';
  return (
    <div className={styles.logo_container}>
      <div className={styles.logo_text}>
        <p
          className={`
            ${typo.typo_uitxt_secondary} 
            ${order ? typo.typo_uitxt_secondary_gray : ''}
          `}
        >
          {number}
        </p>
        <p
          className={`
            ${typo.typo_description} 
            ${order ? typo.typo_description_gray : typo.typo_description_white}
          `}
        >
          {text}
        </p>
      </div>
      <LogoSvg color={color} />
    </div>
  );
};

export default ComponentLogo;
