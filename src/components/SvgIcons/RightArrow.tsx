type RightArrowProps = {
  className?: string;
};

export const RightArrow = ({ className }: RightArrowProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
  >
    <path
      className={className}
      d="M8.71 4.79a1 1 0 0 0 0 1.42l4.58 4.58a1.002 1.002 0 0 1 0 1.42l-4.58 4.58a1 1 0 1 0 1.41 1.42l4.59-4.59a3 3 0 0 0 0-4.24l-4.59-4.59a1 1 0 0 0-1.41 0Z"
    />
  </svg>
);
