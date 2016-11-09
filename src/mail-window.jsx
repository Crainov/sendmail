import React from 'react';
import { Link } from 'react-router';

var MailForm = require('./mailForm.jsx');
var Header = require('./header.jsx');
var Notify = require('./notify.jsx');

var MailWindow = React.createClass({
  getInitialState: function() {
    return {notify: {text: '', visible: false}}
  },
  onMessageSend: function(email) {
    var url="/send";
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: email,
      success: function(data) {
        console.log(data, "SUCCESS");
        this.addAlert(data.message);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  addAlert: function(text) {
    var notify = {};
    notify.text = text;
    notify.visible = true;
    this.setState({notify: notify});
  },
  render: function() {
    return (
      <div className="email-sender">
        <Notify notification_text={this.state.notify.text}/>
        <Header />
        {<MailForm messageSend={this.onMessageSend}/>}
      </div>
    );
  }
});

module.exports = MailWindow;
