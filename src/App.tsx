import './assets/styles/main.scss';
import Router from './routes';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import JWTManager from 'utils/jwt';
import AuthContextProvider from 'contexts/AuthContext';
import 'antd/dist/antd.min.css';
import client from 'utils/apollo';

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <Router />
          </I18nextProvider>
        </Provider>
      </AuthContextProvider>
    </ApolloProvider>
  );
}

export default App;
