import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';

ReactDOM.render(
  // https://github.com/Semantic-Org/Semantic-UI-React/issues/4050
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>
  document.getElementById('root')
);
