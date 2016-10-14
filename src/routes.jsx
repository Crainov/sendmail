import React from 'react';

import { Router, Route } from 'react-router';

var Recipients = require('./recipients.jsx');
var MailWindow = require('./mail-window.jsx');

var App = function(props) {
  return (
    <Router {...props}>
        <Route path="/" component={MailWindow} />
        <Route path="/recipients" component={Recipients} />
    </Router>
  );
};


module.exports = App;
