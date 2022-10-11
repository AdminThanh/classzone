import './assets/styles/main.scss';
import Router from './routes';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <Router />
          </I18nextProvider>
        </Provider>
      </div>
    </ApolloProvider>
  );
}

export default App;
