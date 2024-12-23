import Spinner from '../Shared/Spinner';

const FullScreenLoader = () => {
  return (
    <div className="h-screen w-screen-0 opacity-75">
      <Spinner />
      {/* <div className="flex inset-0 justify-center items-center h-full opacity-75">
      </div> */}
    </div>
  );
};

export default FullScreenLoader;
