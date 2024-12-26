'use client';
import dynamic from 'next/dynamic';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Navigation } from 'swiper/modules';

import { ReviewPerson } from '@/interfaces/reviewPerson.interface';

import {
  reviewSectionTitle,
  reviewUsersArray,
} from '@/data/mainPage/ReviewSectionData';
import ClickableComponent from '@/components/ClickableComponent/ClickableComponent';
import LeftArrow from '@/components/SvgIcons/LeftArrow';
import RightArrow from '@/components/SvgIcons/RightArrow';

const DynamicReviewCard = dynamic(() => import('./ReviewCard'), {
  ssr: false,
});

const ReviewsSection = () => {
  return (
    <section className="w-full space-y-8 px-5 md:px-16 py-4 md:py-6 xl:py-8 mb-10 xl:mb-16 2xl:mb-24">
      <h3 className="">{reviewSectionTitle}</h3>
      <Swiper
        navigation={{
          nextEl: '.swiper_next',
          prevEl: '.swiper_prev',
        }}
        loop={true}
        freeMode={true}
        grabCursor={true}
        slidesPerView={1}
        spaceBetween={24}
        breakpoints={{
          712: {
            slidesPerView: 2,
          },
          1056: {
            slidesPerView: 3,
          },
          1400: {
            slidesPerView: 4,
          },
          1744: {
            slidesPerView: 5,
          },
        }}
        modules={[FreeMode, Navigation]}
        className=""
      >
        {reviewUsersArray.map((user: ReviewPerson) => (
          <SwiperSlide key={user.sliderIdx}>
            <DynamicReviewCard
              sliderIdx={user.sliderIdx}
              userName={user.userName}
              userAvatar={user.userAvatar}
              date={user.date}
              reviewText={user.reviewText}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="text-center xl:float-right space-x-2 ">
        <ClickableComponent
          type="button"
          className="swiper_prev group rounded-full bg-grey-10 p-2 hover:bg-secondary-100 transition"
        >
          <LeftArrow className="fill-secondary-100 group-hover:fill-grey-10 transition" />
        </ClickableComponent>
        <ClickableComponent
          type="button"
          className="swiper_next group rounded-full bg-grey-10 p-2 hover:bg-secondary-100 transition"
        >
          <RightArrow className="fill-secondary-100 group-hover:fill-grey-10 transition" />
        </ClickableComponent>
      </div>
    </section>
  );
};

export default ReviewsSection;
