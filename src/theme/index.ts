import { createContext } from 'react';

export const DARK_MODE_THEME = {
  primary: '#9E339F',
  backgroundMain: '#222222',
  backgroundAccent: '#141414',
  textInactive: '#fff',
};

export const themeContext = createContext(DARK_MODE_THEME);

export const { Provider } = themeContext;
