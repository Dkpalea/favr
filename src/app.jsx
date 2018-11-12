/* eslint-env browser */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'firebase/firestore';
import './styles/styles.scss';
import AppRouter from './routers/AppRouters';
import store from './store/store';

// Setup react-redux so that connect HOC can be used
const App = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

render(<App />, document.getElementById(`app`));
