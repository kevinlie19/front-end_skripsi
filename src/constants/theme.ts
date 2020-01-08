import { DefaultTheme } from 'exoflex';

import { COLORS } from './colors';
import { FONT_NAMES } from './fonts';

const FontTheme = {
  default: {
    normal: {
      name: FONT_NAMES.SourceSansProRegular,
    },
    medium: {
      name: FONT_NAMES.SourceSansProSemiBold,
    },
    bold: {
      name: FONT_NAMES.SourceSansProBold,
    },
  },
  italic: {
    normal: {
      name: FONT_NAMES.SourceSansProItalic,
    },
  },
};

export const ColorTheme = {
  ...DefaultTheme.colors,
  primary: COLORS.grapefruit,
  error: COLORS.grapefruit,
  white: COLORS.white,
  placeHolder: COLORS.darkGrey,
  black: COLORS.black,
};

export const CustomTheme = {
  ...DefaultTheme,
  colors: ColorTheme,
  fonts: {
    ...DefaultTheme.fonts,
    ...FontTheme,
  },
};
