type NumberDisplayProps = {
  size: string;
  font: string;
  color: string;
  additionalClasses?: string;
  children: React.ReactNode;
};

export const NumberDisplay = ({
  size,
  font,
  color,
  children,
  additionalClasses = '',
}: NumberDisplayProps) => {
  return (
    <span
      className={`flex items-center ${font} ${size} ${color} ${additionalClasses}`}
    >
      {children}
    </span>
  );
};
