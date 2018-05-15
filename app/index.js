import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App'
import './app.global.css';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';


ReactDOM.render(
  <HashRouter>
    <App/>
  </HashRouter>
  ,
  document.getElementById('root'));
