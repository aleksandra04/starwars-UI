import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/index';
import { HashRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
<Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
document.getElementById('root'));
