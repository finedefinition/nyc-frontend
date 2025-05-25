import Image from 'next/image';
import { ClickableComponent } from '@/components/ClickableComponent/ClickableComponent';
import hero from '@/public/images/hero-img-crop.webp';

import { HeroSectionData } from '@/data/mainPage/HeroSectionData';

export const HeroSection = () => {
  return (
    <div className="-mt-[54px] md:-mt-[62px] xl:-mt-[70px] mb-8 sm:mb-10 xl:mb-16 2xl:mb-24">
      <div className="relative h-screen">
        <Image
          src={hero}
          alt="Background Image"
          fill
          className="object-cover w-full h-full"
          sizes="100vw"
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAMABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDprSWRgkTIQE6k/oKs7azIrmVopZQQrfL0FQNd3Dr80rd+nFCE3Y12mgRirTRqR2LCiuYMaMSSoyaKeoro/9k="
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2>{HeroSectionData.title}</h2>
          <h1>{HeroSectionData.subtitle}</h1>
          <ClickableComponent
            href="/catalogue"
            variants={['button', 'primary']}
          >
            {HeroSectionData.ctaButton}
          </ClickableComponent>
        </div>
      </div>
    </div>
  );
};
