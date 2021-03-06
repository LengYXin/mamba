// plugins 必须在前面
import './public-path';
import './plugins';
import './components';
import './assets/styles/patch.less';
import 'nprogress/nprogress.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import App from './layouts/main';
import reportWebVitals from './reportWebVitals';
ReactDOM.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
  ,
  document.getElementById('root'), () => {
    if (window.__MICRO_APP_ENVIRONMENT__) {
      React.AppConfig.onChangeAppSettings({ headerRender: false, menuRender: false })
    }
    React.$Mamba.Log.success('App Start', React.AppConfig, Router, React.$i18n, React.$Store)
  }
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
