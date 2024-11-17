import { ButtonProps } from '@/interfaces/clickable.interface';

const ButtonComponent = ({
  type,
  disabled,
  onClick,
  className,
  children,
}: ButtonProps) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={className}
  >
    {children}
  </button>
);

export default ButtonComponent;
