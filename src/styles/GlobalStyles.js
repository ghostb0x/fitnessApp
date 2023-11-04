'use client';
import { COLORS, WEIGHTS } from '@/constants';
import { createGlobalStyle } from 'styled-components';


const GlobalStyles = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
  font-size: 100%;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

/* DESIGN TOKENS */
html {
  --color-primary: ${COLORS.primary};
  --color-accent: ${COLORS.purple};
  --color-white: ${COLORS.white};
  --color-gray: ${COLORS.gray};
  --color-offblack: ${COLORS.offblack};
  --color-black: ${COLORS.black};
  --font-weight-medium: ${WEIGHTS.medium};
  --font-weight-bold: ${WEIGHTS.bold};
  --font-family: Helvetica , Arial, sans-serif;



  /* font shorthand follows pattern: 
  font-style font-weight font-size/line-height font-family */

  /* h1 style used on hero main text and also Projects and Contact section headings */
  --font-h1-desktop: normal var(--font-weight-bold) 5.5rem/5.5rem var(--font-family);
  --font-h1-tablet: normal var(--font-weight-bold) 4.5rem/4.5rem var(--font-family);
  --font-h1-mobile: normal var(--font-weight-bold) 2.5rem/2.5rem var(--font-family);

  /* h2 style used on skills area listings  */
  --font-h2-desktop: normal var(--font-weight-bold) 3rem/3.5rem var(--font-family);
  --font-h2-tablet: normal var(--font-weight-bold) 3rem/3.5rem var(--font-family);
  --font-h2-mobile: normal var(--font-weight-bold) 2rem/2.5rem var(--font-family);

  /* h3 style used on portfolio project names and "logo" name*/
  --font-h3: normal var(--font-weight-bold) 1.5rem/2rem var(--font-family);
  --font-h3-tablet-up: normal var(--font-weight-bold) 2rem/2rem var(--font-family);


  --font-link: normal var(--font-weight-bold) 1rem/1.625rem var(--font-family);

  --font-body-desktop: normal var(--font-weight-medium) 1.125rem/1.75rem var(--font-family);
  --font-body-tablet: normal var(--font-weight-medium) 1.125rem/1.75rem var(--font-family);
  --font-body-mobile: normal var(--font-weight-medium) 1.125rem/1.75rem var(--font-family);

  --font-project-tech: normal var(--font-weight-medium) 1.125rem/1.75rem var(--font-family);

  --font-form-fields: normal var(--font-weight-medium) 1rem/1.625rem var(--font-family);

  /* font-variant: normal "slashed-zero"; */

  /* Universal left and right padding  */
  --mobile-padding: 16px;
  --laptop-padding: clamp(2rem, 12vw - 3.25rem, 10rem);

}


/* GLOBAL STYLES */
*,
*:before,
*:after {
  box-sizing: border-box;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

#root {
  /*
    Create a stacking context, without a z-index.
    This ensures that all portal content (modals and tooltips) will
    float above the app.
  */
  isolation: isolate;
}

html {
  /*
    Silence the warning about missing Reach Dialog styles
  */
  --reach-dialog: 1;
}

html, body, #root {
  height: 100%;

}

body {
  background-color: var(--color-gray-100);  
}

/*
  Remove default button styles. We'll provide our own at the
  component level
*/
button {
  display: block;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}
`;

export default GlobalStyles;