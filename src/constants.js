export const COLORS = {
  white: 'hsl(0deg 0% 100%)',
  gray: 'hsla(0deg 0% 89%)',
  offblack: 'hsl(0deg 0% 14%)',
  black: 'hsl(0deg 0% 8%)',
  green: 'hsl(153deg 71% 59%)',
  primary: 'hsla(49.33deg, 54.22%, 83.73%, 1)',
  purple: 'hsla(261deg, 59%, 70%, 1)',

};

export const WEIGHTS = {
  medium: 500,
  bold: 700,
};

export const BREAKPOINTS = {
  tabletMin: 800,
  laptopMin: 1100,
  desktopMin: 1500,
};

export const QUERIES = {
  tabletAndUp: `(min-width: ${BREAKPOINTS.tabletMin / 16}rem)`,
  laptopAndUp: `(min-width: ${BREAKPOINTS.laptopMin / 16}rem)`,
  desktopAndUp: `(min-width: ${BREAKPOINTS.desktopMin / 16}rem)`,
  tabletOnly: `
      (min-width: ${BREAKPOINTS.tabletMin / 16}rem) and
      (max-width: ${(BREAKPOINTS.laptopMin - 1) / 16}rem)`,
};
