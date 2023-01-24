import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HashRouter } from 'react-router-dom';
//
import LocaleProvider from './context/Locale';
import AuthProvider from './context/Auth';
import TemaProvider from './context/Tema';
//
import AllRoutes from './routes';

function App() {
  return (
    <HashRouter>
      <LocaleProvider>
        <TemaProvider>
          <AuthProvider>
            <ToastContainer
              position='bottom-center'
              autoClose={5000}
              draggable
              theme='colored'
            />
            <AllRoutes />
          </AuthProvider>
        </TemaProvider>
      </LocaleProvider>
    </HashRouter>
  );
}

export default App;
