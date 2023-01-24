import {
    SetStateAction,
    createContext,
    ReactNode,
    useEffect,
    useState,
    Dispatch,
} from 'react';
import moment from 'moment';
//
import { LocaleTextType, ptBr, en } from '../locale';
//
import 'moment/dist/locale/pt-br';

type LocaleContextTypes = {
    localetext: LocaleTextType,
    locale: string,
    setLocale: Dispatch<SetStateAction<string>>,
}

export const LocaleContext = createContext<LocaleContextTypes>({
    localetext: ptBr,
    locale: 'pt-br',
    setLocale: () => { },
});

export default function LocaleProvider({ children }: { children: ReactNode }) {

    const [locale, setLocale] = useState(() => navigator.language.startsWith('pt') ? 'pt-br' : 'en');

    const localetext = locale === 'pt-br' ? ptBr : en;

    useEffect(() => {
        moment.locale(locale);
        document.title = locale === 'pt-br' ? "Chamados OS" : 'Tickets OS';
    }, [locale]);

    return (
        <LocaleContext.Provider
            value={{ localetext, locale, setLocale }}
        >
            {children}
        </LocaleContext.Provider>
    );
}