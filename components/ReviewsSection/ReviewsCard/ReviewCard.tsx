import Image from 'next/image';
import { reviewUser } from '@/interfaces/reviewsUsers.interface';
import StarImg from '@/public/icons/star.svg';
import StarEmptyImg from '@/public/icons/star_empty.svg';
import QuotesImg from '@/public/icons/quotes.svg';
import styles from './reviewCard.module.scss';

type User = Omit<reviewUser, 'userId'>;

const ReviewCard = ({
  sliderIdx,
  userName,
  userAvatar,
  date,
  stars,
  reviewText,
}: User) => {
  const numbers = Array.from({ length: stars }, (_, i) => i + 1);
  const numbers_empty = Array.from({ length: 5 - stars }, (_, i) => i + 1);

  return (
    <div
      className={`${styles.container} ${
        sliderIdx % 2 ? '' : styles.container__even
      }`}
    >
      <div className={styles.container__text}>
        <div className={styles.container__text_stars}>
          {numbers.map((number) => (
            <Image
              key={number}
              src={StarImg}
              alt="Star Image"
            />
          ))}
          {numbers_empty.map((number) => (
            <Image
              key={number}
              src={StarEmptyImg}
              alt="Star Image"
            />
          ))}
        </div>
        <p className={styles.container__text_review}>{reviewText}</p>
        <div className={styles.container__text_quotes}>
          <Image
            src={QuotesImg}
            alt="QuotesImg"
          />
        </div>
      </div>
      <div className={styles.container__avatar}>
        <Image
          src={userAvatar}
          width={60}
          height={60}
          alt={userName}
        />
        <div>
          <p className={styles.container__avatar_name}>{userName}</p>
          <p className={styles.container__avatar_date}>{date}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
