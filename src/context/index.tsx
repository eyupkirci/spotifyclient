import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

export const ColorPalette = {
  light: {
    text: '#000000',
    contrast: '#FFFFFF',
    backgorund: '#FFFFFF',
    border: '#000000',
    light: '',
  },
  dark: {
    text: '#FFFFFF',
    contrast: '#000000',
    backgorund: '#000000',
    border: '#FFFFFF',
    light: '',
  },
};

interface User {
  user: {
    username: string;
  };
  token: string | null;
}

type Theme = 'light' | 'dark';
type AppContext = {
  theme: Theme;
  colors: any;
  toggleTheme: () => void;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  data: any[];
  setData: Dispatch<SetStateAction<any[]>>;
};
interface ThemeProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContext>({} as AppContext);

export const AppProvider: FC<ThemeProviderProps> = ({children}: any) => {
  const [theme, setTheme] = useState<Theme>('light');
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const [data, setData] = useState<any[]>([]);
  const [user, setUser] = useState<User>({
    user: {
      username: 'Taylor Swift',
    },
    token: 'abc',
  });

  const colors = ColorPalette[theme];
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <AppContext.Provider
      value={{theme, colors, toggleTheme, user, setUser, data, setData}}>
      {children}
    </AppContext.Provider>
  );
};
