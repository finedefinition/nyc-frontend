'use client';

import Custom404 from './not-found';

type Props = {
  error: Error;
}

const error = ({ error }: Props) => {
  // eslint-disable-next-line no-console
  console.log(error.message);
  return (
    <>
      <Custom404 />
    </>
  );
};

export default error;
