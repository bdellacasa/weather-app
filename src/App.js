import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import ApplicationRouter from "./router/Router";
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <ApplicationRouter/>
    </Provider>
  );
}

export default App;