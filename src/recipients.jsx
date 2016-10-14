import React from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router';

var Header = require('./header.jsx');

var RecipientsList = React.createClass({
  deleteUser: function(delUser) {
    var self = this;
    return function(e) {
      e.preventDefault();
      if (!delUser) {
        alert("error del user");
        return;
      }
      self.props.delUser({email: delUser});
    };
  },
  render: function() {
    var isData = this.props.data.length != 0;
    var self = this;
    var recipients = isData ? this.props.data.items : null;
    var recItems = isData ? recipients.map(function(subscriber, i) {
      console.log(subscriber, i);
      return (
        <tr key={i}>
          <td>
            {subscriber.address}
          </td>
          <td>
            {subscriber.name}
          </td>
          <td>
            <a className="btn-floating waves-effect waves-light red darken-4"
               onClick={self.deleteUser(subscriber.address)}>
               <i className="material-icons">delete</i>
            </a>
          </td>
        </tr>
      );
    }) : null;
    return (
      <div className="row">
        <table className="bordered white grey-text text-darken-3 z-depth-1">
          <thead>
            <tr>
              <th data-field="email">Email</th>
              <th data-field="name">Name</th>
              <th data-field="delete">Delete</th>
            </tr>
          </thead>
          <tbody>
            {recItems}
          </tbody>
        </table>
      </div>
    );
  }
});

var AddUsrForm = React.createClass({
  getInitialState: function() {
    return {nuser: []};
  },
  inputHandler: function(e) {
    var nuser = this.state.nuser || {};
    var name = e.target.name;
    nuser[name] = e.target.value;
    this.setState({nuser: nuser});
    console.log(this.state.nuser);
  },
  addSubscr: function() {
    var email = this.state.nuser.email;
    var name = this.state.nuser.name;
    if(!email || !name) {
      alert("Enter email or name!");
      return;
    };
    this.props.email({email: email, name: name});
  },
  render: function() {
    return (
      <div>
        <div className="row">
          <div className="input-field col s6">
            <input id="email" type="email" name="email" value={this.state.nuser.email || ''} onChange={this.inputHandler}/>
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col s6">
            <input id="name" type="text" name="name" value={this.state.nuser.name || ''} onChange={this.inputHandler}/>
            <label htmlFor="name">Name</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <a href="#" className="waves-effect waves-light btn" onClick={this.addSubscr}>Add to list</a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = React.createClass({
  removefromList: function(email) {
    var self = this;
    console.log('del user!!', email);
    var url = "/delete";
    $.ajax({
      url: url,
      dataType: 'json',
      type: "POST",
      data: email,
      success: function(data) {
        self.getEmailList();
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  getEmailList: function() {
    console.log('get list!!');
    var url = "/maillist";
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  addSubscriber: function(data) {
    var url = "/addusr";
    var self = this;
    $.ajax({
      url: url,
      dataType: 'json',
      type: "POST",
      data: data,
      success: function(data) {
        self.getEmailList();
        console.log("ADDDD!!", data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.getEmailList();
  },
  render: function() {
    return(
      <div>
        <Header />
        <div className="row">
          <div className="col s6 offset-s3">
            <div className="card white grey-text text-darken-3">
              <AddUsrForm email={this.addSubscriber}/>
            </div>
            <RecipientsList data={this.state.data} delUser={this.removefromList}/>
          </div>
        </div>
      </div>
    );
  }
});
