/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import { ContactForm } from '../MainPageContent/ContactSection/ContactForm';
// const debounce = (func: (...args: any[]) => void, delay: number) => {
//   let timeoutId: NodeJS.Timeout;
//   return (...args: any[]) => {
//     if (timeoutId) {
//       clearTimeout(timeoutId);
//     }
//     timeoutId = setTimeout(() => {
//       func.apply(null, args);
//     }, delay);
//   };
// };

export const ScrollForm = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  // Дебаунс обробника скролу
  // const debouncedHandleScroll = debounce(handleScroll, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div
      style={{
        transform: `translateY(${scrollY * 0.5}px)`, // Компонент рухається зі швидкістю 50% від швидкості скролу
        transition: 'transform 0.1s linear', // Плавність руху
        position: 'relative', // Для управління позиціонуванням
      }}
    >
      {/* <div
      className={`md:border md:border-primary md:p-4 md:rounded-2xl xl:fixed xl:transition-transform xl:translate-y-[${scrollY * 0.5}px] xl:duration-100 xl:transform`}
    > */}
      <h4 className="text-primary text-center xl:text-left pt-10 mb-8">
        Contact Us
      </h4>
      <ContactForm />
    </div>
  );
};
