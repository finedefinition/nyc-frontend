import { ClickableComponent } from '@/components/ClickableComponent/ClickableComponent';
import { socialMediaLinks } from '@/data/links/socialMediaLinks';

type Props = {
  color: string;
  footer?: boolean;
};

export const SocialMedia = ({ color, footer }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <span
        className={`text-2xl font-baiJ ${footer ? 'text-white' : 'text-black'}`}
      >
        Follow us
      </span>
      <div className="flex space-x-4">
        {socialMediaLinks.map(({ href, component: IconComponent }, index) => (
          <ClickableComponent
            key={index}
            href={href}
            target="_blank"
          >
            <IconComponent
              color={color}
              footer={footer}
            />
          </ClickableComponent>
        ))}
      </div>
    </div>
  );
};
