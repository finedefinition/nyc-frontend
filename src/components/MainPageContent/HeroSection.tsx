import Image from 'next/image';
import ClickableComponent from '@/components/ClickableComponent/ClickableComponent';

import hero from '@/public/images/hero-img.jpg';

import { HeroSectionData } from '@/data/mainPage/HeroSectionData';

const HeroSection = () => {
  return (
    <div className="-mt-[54px] md:-mt-[62px] xl:-mt-[70px] mb-8 sm:mb-10 xl:mb-16 2xl:mb-24">
      <div className="relative h-screen">
        <Image
          src={hero}
          alt="Background Image"
          className="object-cover w-full h-full"
          quality={100}
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2>{HeroSectionData.title}</h2>
          <h1>{HeroSectionData.subtitle}</h1>
          <ClickableComponent
            href="/catalogue"
            variant="linkButtonPrimary"
          >
            {HeroSectionData.ctaButton}
          </ClickableComponent>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
