import CardSkeleton from '@/components/Skeletons/CardSkeleton';

const YACHT_COUNT = 9;

export default function Loading() {
  return (
    <>
      <div className="flex w-full justify-between items-center px-5 md:px-16 py-4 md:py-6 xl:py-8">
        <div>
          <h4>Catalogue</h4>
        </div>
        <div className="flex space-x-2 sm:space-x-4 md:space-x-6 3xl:space-x-10">
          <div className="flex space-x-2 items-center">
            <div className="hidden sm:flex animate-pulse w-16 h-4 bg-grey-50 rounded" />
            <div className="animate-pulse w-6 h-6 bg-grey-50 rounded-full" />
          </div>
          <div className="flex space-x-2 items-center">
            <div className="animate-pulse w-20 h-4 bg-grey-50 rounded" />
            <div className="animate-pulse w-24 h-4 bg-grey-50 rounded" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 px-5 md:px-16">
        {Array.from({ length: YACHT_COUNT }, (_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </>
  );
}
