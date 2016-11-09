import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

var Routes = require ('./routes.jsx');

var css = require ('./styles/main.scss');

ReactDOM.render(
  <Routes history={browserHistory} />,
  document.getElementById('react-app')
);
