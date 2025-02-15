import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/semantic.min.css';
import './css/bootstrap.min.css';
import './css/appliationadmin.min.css';
import './css/appStyle.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from "redux";
import reducer from "./store/reducer";
import { Provider } from "react-redux";

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
