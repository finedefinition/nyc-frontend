import React from 'react';
import ContactForm from '../MainPageContent/ContactSection/ContactForm';

const YachtPageSkeleton = () => {
  return (
    <div className="w-full px-5 md:px-16 py-4 md:py-6 xl:py-8">
      <div className="grid space-x-2 gap-x-6 xl:grid-cols-12 xl:mb-6">
        <div className="xl:col-start-1 xl:col-end-9 xl:flex h-6 2xl:h-9 bg-grey-50 rounded animate-pulse" />
        <div className="h-6 2xl:h-9 bg-grey-50 rounded animate-pulse" />
        <div className="flex gap-2 xl:col-start-9 xl:col-end-13 xl:justify-items-end">
          <div className="animate-pulse w-20 h-4 bg-grey-50 rounded" />
          <div className="animate-pulse w-20 h-4 bg-grey-50 rounded" />
        </div>
      </div>
      <div className="grid gap-x-6 xl:grid-cols-12">
        <div className="xl:col-start-1 xl:col-end-9">Yacht</div>
        <div className="md:border md:border-primary md:p-4 md:rounded-2xl xl:col-start-9 xl:col-end-13">
          <h4 className="text-primary text-center xl:text-left pt-10 mb-8">
            Contact Us
          </h4>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default YachtPageSkeleton;
