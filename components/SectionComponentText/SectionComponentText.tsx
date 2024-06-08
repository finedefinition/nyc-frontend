'use client';

import useWindowDimensions from '@/hooks/useWindowDimensions';
import typo from '@/styles/typography.module.scss';
import TitlePlace from '@/components/TitlePlace/TitlePlace';
import TextButton from '@/components/TextButton/TextButton';
import ComponentLogo from '@/components/ComponentLogo/ComponentLogo';
import styles from './sectionComponentText.module.scss';

type Props = {
  title: string;
  subtitle: string;
  desc: string;
  logoTxt: string;
  logoSubTxt: string;
  order: boolean;
};

const SectionComponentText = ({
  title,
  subtitle,
  desc,
  logoTxt,
  logoSubTxt,
  order,
}: Props) => {
  const { width } = useWindowDimensions();
  const desktopScreen = (width as number) > 1199;

  return (
    <div className={styles.text_container}>
      <TitlePlace
        title={title}
        subtitle={subtitle}
        order={order}
      />
      <div
        className={`${styles.text_container_desc} ${
          order ? styles.text_container_desc__even : ''
        }`}
      >
        <p
          className={`${typo.typo_description} ${
            order ? '' : typo.typo_description_white
          }`}
        >
          {desc}
        </p>
        <TextButton
          text="Read more"
          linkTo={`/how-it-works#${title.split(' ')[0].toLowerCase()}`}
          primary={order}
        />
      </div>
      <span className={styles.logo}>
        {desktopScreen ? (
          <ComponentLogo
            number={logoTxt}
            text={logoSubTxt}
            order={order}
          />
        ) : null}
      </span>
    </div>
  );
};

export default SectionComponentText;
