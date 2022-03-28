import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import App from './components/App';
import reduxStore from './state/store';

ReactDOM.render((
  <ReduxProvider store={reduxStore}>
    <IntlProvider locale='en-CA'>
      <HashRouter>
        <App />
      </HashRouter>
    </IntlProvider>
  </ReduxProvider>
), document.getElementById("app"));
