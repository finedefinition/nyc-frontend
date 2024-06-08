import SocialMediaIcons from '../SocialMediaIcons/SocialMediaIcons';
import styles from './socialmedia.module.scss';

type Props = {
  color: string;
};

const SocialMedia = ({ color }: Props) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Social media</span>
      <div>
        <SocialMediaIcons color={color} />
      </div>
    </div>
  );
};

export default SocialMedia;
