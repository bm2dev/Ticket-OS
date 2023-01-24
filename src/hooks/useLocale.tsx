import { useContext } from 'react';
//
import { LocaleContext } from '../context/Locale';

export default function useLocale() {
    const { localetext, locale, setLocale } = useContext(LocaleContext);

    return { localetext, locale, setLocale };
}
