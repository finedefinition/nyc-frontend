import { StaticImageData } from 'next/image';
import { componentsDataArray } from '@/utils/componentsData/componentsDataArray';
import SectionComponentText from '../SectionComponentText/SectionComponentText';
import SectionComponentImage from '../SectionComponentImage/SectionComponentImage';
import styles from './sectionComponent.module.scss';

type Props = {
  title: string;
  subtitle: string;
  desc: string;
  img: StaticImageData;
  logoTxt: string;
  logoSubTxt: string;
  order: boolean;
}

const SectionComponent = ({
  title,
  subtitle,
  desc,
  img,
  logoTxt,
  logoSubTxt,
  order,
}: Props) => {
  return (
    <section className={styles.section}>
      <SectionComponentText
        title={title}
        subtitle={subtitle}
        desc={desc}
        logoTxt={logoTxt}
        logoSubTxt={logoSubTxt}
        order={order}
      />
      <SectionComponentImage imgSrc={img} />
    </section>
  )
}

const AllSectionComponents = () => {
  return (
    <>
      {componentsDataArray.map(({
        title,
        subtitle,
        desc,
        img,
        logoTxt,
        logoSubTxt,
      }, i) => (
        <SectionComponent
          key={title}
          title={title}
          subtitle={subtitle}
          desc={desc}
          img={img}
          logoTxt={logoTxt}
          logoSubTxt={logoSubTxt}
          order={!!(i % 2)}
        />
      ))}
    </>
  );
};

export default AllSectionComponents;
