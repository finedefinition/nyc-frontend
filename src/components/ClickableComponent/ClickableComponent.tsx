import { LinkProps, ButtonProps } from '@/interfaces/clickable.interface';
import LinkComponent from './LinkComponent';
import ButtonComponent from './ButtonComponent';

function isPropsForLinkElement(
  props: ButtonProps | LinkProps
): props is LinkProps {
  return 'href' in props;
}

const variantClasses = {
  button: 'text-white text-lg font-medium rounded-[56px] py-2.5 px-10',
  primary:
    'bg-primary hover:bg-secondary-100 active:bg-secondary-110 transition',
  secondary:
    'bg-secondary-100 hover:bg-secondary-110 active:bg-transparent active:text-secondary-110 active:border-2 active:border-secondary-110 active:border-solid transition',
  link: 'text-lg content-center hover:underline hover:text-secondary-100 transition',
  footer: 'text-white',
  text: 'text-secondary-100 underline font-normal hover:text-secondary-110 transition',
};

const ClickableComponent = (props: ButtonProps | LinkProps) => {
  const { children, variants, className } = props;

  const combinedClasses =
    `${variants?.map((variant) => variantClasses[variant]).join(' ') || ''} ${className || ''}`.trim();

  if (isPropsForLinkElement(props)) {
    return (
      <LinkComponent
        {...props}
        className={combinedClasses}
      >
        {children}
      </LinkComponent>
    );
  }
  return (
    <ButtonComponent
      {...props}
      className={combinedClasses}
    >
      {children}
    </ButtonComponent>
  );
};

export default ClickableComponent;
