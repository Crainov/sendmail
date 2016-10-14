import React from 'react';
import { Link } from 'react-router';

var MailForm = require('./mailForm.jsx');
var Header = require('./header.jsx');

var MailWindow = React.createClass({
  onMessageSend: function(email) {
    var url="/send";
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: email,
      success: function(data) {
        console.log(data, "SUCCESS");
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="email-sender">
        <Header />
        {<MailForm messageSend={this.onMessageSend}/>}
      </div>
    );
  }
});

module.exports = MailWindow;
