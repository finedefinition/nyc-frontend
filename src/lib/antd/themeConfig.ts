import { defaultTailwindColors } from '@/lib/tailwind/defaultTailwindColors';
export const themeConfig = {
  token: {
    fontFamily: 'var(--font-roboto)',
  },
  components: {
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
  },
};
