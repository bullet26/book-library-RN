import { createContext } from 'react';

export const DARK_MODE_THEME = {
  primary: '#9E339F',
  backgroundMain: '#222222',
  backgroundAccent: '#141414',
  textInactive: '#fff',
  lighterBGC: '#333',
  fontDividerColor: '#cfcfd2',
  dark: '#000',
};

export const themeContext = createContext(DARK_MODE_THEME);

export const { Provider } = themeContext;
