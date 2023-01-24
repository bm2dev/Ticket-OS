import { 
    useState, 
    createContext, 
    ReactNode, 
    Dispatch, 
    SetStateAction 
} from 'react';
//
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';


type TemaContextTypes = {
    darkMode: boolean,
    setDarkMode: Dispatch<SetStateAction<boolean>>,
}

export const TemaContext = createContext<TemaContextTypes>({
    darkMode: true,
    setDarkMode: () => { },
});

export default function TemaProvider({ children }: { children: ReactNode }) {

    const [darkMode, setDarkMode] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches);

    const baseTheme = createTheme({
        components: {
            MuiCssBaseline: {
                styleOverrides: (themeParam) => ({
                    body: {
                        '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                            width: 3,
                            height: 5,
                        },
                        '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
                            background: themeParam.palette.background.default,
                        },
                        '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                            background: themeParam.palette.text.secondary,
                            borderRadius: 5,
                        },
                        '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                            background: themeParam.palette.action.hover,
                        },
                    }
                }),
            }
        }
    });

    const darkTheme = createTheme({
        ...baseTheme,
        palette: {
            mode: 'dark',
            primary: { main: '#03a9f4' },
        },
    });

    const ligthTheme = createTheme({
        ...baseTheme,
        palette: {
            mode: 'light',
            primary: { main: '#0277bd' },
            background: {
                default: '#ffffff',
                paper: '#fafafa',
            }
        },
    });

    return (
        <TemaContext.Provider
            value={{ darkMode, setDarkMode }}
        >
            <ThemeProvider theme={darkMode ? darkTheme : ligthTheme}>
                <CssBaseline enableColorScheme />
                {children}
            </ThemeProvider>
        </TemaContext.Provider>
    );
}