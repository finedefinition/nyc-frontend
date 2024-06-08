type CloseSvg = {
  color: string;
};

const CloseSvg = ({ color }: CloseSvg) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="#fff"
  >
    <path
      fill={color}
      d="M18 6a1 1 0 0 0-1.414 0L12 10.586 7.414 6A1 1 0 0 0 6 7.414L10.586 12 6 16.586A1 1 0 0 0 7.414 18L12 13.414 16.586 18A1 1 0 0 0 18 16.586L13.414 12 18 7.414A1 1 0 0 0 18 6Z"
    />
  </svg>
);
export default CloseSvg;
