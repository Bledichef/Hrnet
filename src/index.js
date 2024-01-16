import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from "react-redux"
import App from './App';
import store from "./app/store"
import "./app/styles/_index.scss"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)