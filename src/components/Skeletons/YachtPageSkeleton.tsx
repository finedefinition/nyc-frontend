import React from 'react';
import { ContactForm } from '../MainPageContent/ContactSection/ContactForm';

export const YachtPageSkeleton = () => {
  return (
    <div className="w-full px-5 md:px-16 pb-4 md:pb-6 xl:pb-8">
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 xl:grid-cols-12">
        <div className="xl:col-span-8 flex flex-col items-center lg:flex-row lg:justify-between animate-pulse">
          <div className="bg-grey-50 h-6 w-96 mb-1 rounded" />
          <div className="bg-grey-50 h-6 w-16 mb-1 rounded" />
        </div>
        <div className="grid justify-center lg:justify-end xl:col-span-4">
          <div className="bg-grey-50 h-6 w-44 mb-1 rounded" />
        </div>
        <div className="xl:col-span-8 animate-pulse">
          <div className="bg-grey-50 h-[300px] md:h-[400px] lg:h-[700px] w-full" />
        </div>
        <div className="xl:col-span-4">
          <div className="md:border md:border-primary md:p-4 3xl:p-12 rounded-2xl max-w-[600px] mx-auto h-[500px]">
            <h4 className="text-center xl:text-left pt-10 mb-8">Contact Us</h4>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};
