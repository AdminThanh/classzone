import './assets/styles/main.scss';
import Router from './routes';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Router />
        </I18nextProvider>
      </Provider>
    </div>
  );
}

export default App;
