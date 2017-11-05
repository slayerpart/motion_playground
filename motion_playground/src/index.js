import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {
  compose,
  createStore,
} from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers.js'

function isProduction() {
  return process.env.NODE_ENV !== 'development';
}

function makeStore(initialState: ReduxStateType) {
  let enhancer;

  if (!isProduction()) {
    enhancer = compose(
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    );
  } else {
    enhancer = compose();
  }

  return createStore(reducers, initialState, enhancer);
}

const store = makeStore({});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
