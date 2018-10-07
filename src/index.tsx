import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AppReducer, IAppState, initialState } from './reducers/appReducer';

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    FB: any
    fbAsyncInit(): void;
  }
}

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
