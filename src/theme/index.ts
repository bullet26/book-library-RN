import { createContext, useContext } from 'react';

export const DARK_MODE_THEME = {
  primary: '#9E339F',
  backgroundMain: '#222222',
  backgroundAccent: '#141414',
  textInactive: '#fff',
  lighterBGC: '#333',
  fontDividerColor: '#cfcfd2',
  dark: '#000',
};

const themeContext = createContext(DARK_MODE_THEME);

export const { Provider } = themeContext;

export const colors = useContext(themeContext);
