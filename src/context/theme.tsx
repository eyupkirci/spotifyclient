import {createContext, FC, ReactNode, useState} from 'react';

type Theme = 'light' | 'dark';

export const ColorPalette = {
  light: {
    text: '#000000',
    backgorund: '#FFFFFF',
    border: '#000000',
    light: '',
  },
  dark: {
    text: '#FFFFFF',
    backgorund: '#000000',
    border: '#FFFFFF',
    light: '',
  },
};

type ThemeContext = {theme: Theme; colors: any; toggleTheme: () => void};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

export const ThemeProvider: FC<ThemeProviderProps> = ({children}: any) => {
  const [theme, setTheme] = useState<Theme>('light');
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  const colors = ColorPalette[theme];
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <ThemeContext.Provider value={{theme, colors, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
