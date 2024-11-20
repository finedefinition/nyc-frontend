import Spinner from '@/components/Shared/Spinner';

export default function Loading() {
  return (
    <div className="flex flex-col items-center">
      <h3>Loading Yacht Page...</h3>
      <Spinner />
    </div>
  );
}
