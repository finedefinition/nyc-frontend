import { defaultTailwindColors } from '@/lib/tailwind/defaultTailwindColors';

export const themeConfig = {
  token: {
    fontFamily: 'var(--font-roboto)',
  },
  components: {
    Checkbox: {
      colorPrimary: defaultTailwindColors.secondary[100],
      colorPrimaryHover: defaultTailwindColors.secondary[100],
    },
    Select: {
      colorBorder: defaultTailwindColors.grey[100],
      activeBorderColor: defaultTailwindColors.primary,
      activeOutlineColor: 'transparent',
      hoverBorderColor: defaultTailwindColors.secondary[100],
      clearBg: defaultTailwindColors.grey[100],
      optionFontSize: 16,
      optionActiveBg: defaultTailwindColors.grey[20],
      optionSelectedBg: 'transparent',
      optionSelectedColor: defaultTailwindColors.secondary[100],
      fontSizeIcon: 20,
    },
    Slider: {
      handleActiveColor: defaultTailwindColors.grey[20],
      dotSize: 24,
      handleSize: 24,
      handleSizeHover: 24,
      handleColor: defaultTailwindColors.grey[20],
      railBg: defaultTailwindColors.grey[80],
      railHoverBg: defaultTailwindColors.primary,
      railSize: 2,
      trackBg: defaultTailwindColors.secondary[100],
      trackHoverBg: defaultTailwindColors.secondary[100],
    },
  },
};
