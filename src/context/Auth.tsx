import {
  createContext,
  useEffect,
  ReactNode,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
//
import useFirestore from '../hooks/useFirestore';
import useStorage from '../hooks/useStorage';
import useLocale from '../hooks/useLocale';
//
import { signInWithEmailAndPassword, signOut as signOutAuth } from "firebase/auth";
import { auth } from '../firebase-config';

type UserType = {
  uid: string,
  name: string,
  email: string,
  avatarUrl: null | string,
  accessLevel: number,
}

type AuthContextTypes = {
  user: UserType | { [key: string]: any } | null,
  loadingAuth: boolean,
  loadingSystem: boolean,
  signIn: (cpf: string, senha: string, useNavigation?: boolean) => void,
  signOut: () => void,
}

export const AuthContext = createContext<AuthContextTypes>({
  user: null,
  loadingAuth: false,
  loadingSystem: true,
  signIn: () => { },
  signOut: () => { },
});

export default function AuthProvider({ children }: { children: ReactNode }) {

  const { localetext } = useLocale();
  const navigate = useNavigate();
  const { getDoc } = useFirestore();

  const { getStorage, setStorage } = useStorage();

  const [loadingSystem, setLoadingSystem] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [user, setUser] = useState<UserType | { [key: string]: any } | null>(null);

  function signIn(email: string, password: string) {

    setLoadingAuth(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(async response => {
        const uid = response.user.uid;
        const user = await getDoc('users', uid);
        setStorage('usr', JSON.stringify(user));
        setUser(user);
        setLoadingAuth(false);
        navigate('/');
      })
      .catch(error => {
        const errorCode = error.code;
        setLoadingAuth(false);
        if(errorCode === 'auth/user-not-found') return toast.error(localetext.context.Auth.functions.signIn.errorToastTextUserNotFound);
        if(errorCode === 'auth/wrong-password') return toast.error(localetext.context.Auth.functions.signIn.errorToastTextWrongPassword);
        toast.error(`${localetext.context.Auth.functions.signIn.errorToastText} ${errorCode}`);
      });

  }

  function signOut() {
    signOutAuth(auth).then(() => {
      navigate('/login');
      localStorage.clear();
      setUser(null);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    //loadStorage()
    let usr = getStorage('usr');
    if (usr) { setUser(JSON.parse(usr)) };
    setLoadingSystem(false);
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingAuth,
        loadingSystem,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
