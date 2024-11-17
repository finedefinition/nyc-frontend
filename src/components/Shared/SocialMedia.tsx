import ClickableComponent from '@/components/ClickableComponent/ClickableComponent';
import Instagram from '@/components/SvgIcons/Instagram';
import Telegram from '@/components/SvgIcons/Telegram';
import WhatsApp from '@/components/SvgIcons/WhatsApp';

type Props = {
  color: string;
  footer?: boolean;
};

const socialMediaLinks = [
  {
    href: 'https://www.instagram.com/norseyachtcom/',
    component: Instagram,
  },
  {
    href: 'https://t.me/norseyacht',
    component: Telegram,
  },
  {
    href: 'https://chat.whatsapp.com/HEclUDIVs1h4Ht5hJzXu0Q',
    component: WhatsApp,
  },
];

const SocialMedia = ({ color, footer }: Props) => {
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

export default SocialMedia;
