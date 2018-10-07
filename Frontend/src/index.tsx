import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/app/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AppReducer, IAppState, initialState } from './reducers/appReducer';

const store = createStore<IAppState, any, any, any>(
  AppReducer,
  initialState,
  composeWithDevTools(applyMiddleware())
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
