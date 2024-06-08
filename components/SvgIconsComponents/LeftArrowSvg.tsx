type Props = {
  color: boolean;
};

const LeftArrowSvg = ({ color }: Props) => {
  const currColor = color ? '#E7801A' : '#D9D9D9';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
    >
      <path
        fill={currColor}
        d="M15.29 18.21a1.002 1.002 0 0 0 0-1.42l-4.58-4.58a1.002 1.002 0 0 1 0-1.42l4.58-4.58a1 1 0 1 0-1.41-1.42L9.29 9.38a3 3 0 0 0 0 4.24l4.59 4.59a1 1 0 0 0 1.41 0Z"
      />
    </svg>
  );
};
export default LeftArrowSvg;
