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
  user?: {
    username: string;
    userId: string;
    playlist?: any;
  };
  token?: string | null;
}

type Theme = 'light' | 'dark';
type AppContext = {
  theme?: Theme;
  colors?: any;
  toggleTheme?: () => void;
  user?: User;
  setUser?: Dispatch<SetStateAction<User>>;
  appData?: any[];
  setAppData?: Dispatch<SetStateAction<any[]>>;
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
  const [appData, setAppData] = useState<any[]>([]);
  const [user, setUser] = useState<User>({
    user: {
      username: 'Taylor Swift',
      userId: 'taylorswift',
    },
    token: 'abc',
  });

  const colors = ColorPalette[theme];
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <AppContext.Provider
      value={{theme, colors, toggleTheme, user, setUser, appData, setAppData}}>
      {children}
    </AppContext.Provider>
  );
};
