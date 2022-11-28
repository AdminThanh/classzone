import {
  ApolloProvider
} from '@apollo/client';
import 'antd/dist/antd.min.css';
import AuthContextProvider from 'contexts/AuthContext';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import client from 'utils/apollo';
import './assets/styles/main.scss';
import i18n from './i18n';
import Router from './routes';

console.log('processs');
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
