import React from 'react';
import classNames from 'classnames';

import { Link } from 'react-router';

var Header = require('./header.jsx');

var UserOptions = React.createClass({
  getInitialState: function() {
    return {options: this.props.subscriber.vars};
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({options: nextProps.subscriber.vars});
    // console.log('will recieve', nextProps.subscriber.vars, this.state.options.company);
  },
  inputHandler: function(e) {
    var options = this.state.options || {};
    var name = e.target.name;
    options[name] = e.target.value;
    this.setState({options: options});
    // console.log(this.props.subscriber.vars.company);
  },
  render: function() {
    var options = this.state.options;
    return (
      <div className="input-field">
        <input type="text" name="company" value={options.company} onChange={this.inputHandler}></input>
      </div>
    );
  }
});


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
  addOption: function(updUser) {
    var self = this;
    return function(e) {
      e.preventDefault();
      if (!updUser) {
        alert("error del user");
        return;
      }
      self.props.updUser({user: updUser});
    };
  },
  render: function() {
    var isData = this.props.data.length != 0;
    var self = this;
    var recipients = isData ? this.props.data.items : null;
    var recItems = isData ? recipients.map(function(subscriber, i) {
      // console.log(subscriber, i);
      return (
        <tr key={i}>
          <td>
            {subscriber.address}
          </td>
          <td>
            {subscriber.name}
          </td>
          <td>
            <UserOptions subscriber={subscriber}/>
          </td>
          <td>
            <a className="btn-floating waves-effect waves-light green darken-1"
               onClick={self.addOption(subscriber)}>
              <i className="material-icons">system_update_alt</i>
            </a>
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
              <th data-field="vars">Company</th>
              <th className="actions" data-field="delete">Update</th>
              <th className="actions" data-field="delete">Delete</th>
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
    return {nuser: {vars: {}}};
  },
  inputHandler: function(e) {
    var name = e.target.name;
    var nuser = this.state.nuser || {};
    if (name === "company") {
      nuser.vars[name] = e.target.value;
      this.setState({nuser: nuser});
    }else{
      nuser[name] = e.target.value;
      this.setState({nuser: nuser});
    }
    // console.log(this.state.nuser);
  },
  addSubscr: function() {
    var email = this.state.nuser.email;
    if(!email) {
      alert("Enter email!");
      return;
    };
    this.props.email({user: this.state.nuser});
    this.setState({nuser: {vars: {}}});
  },
  render: function() {
    return (
      <div>
        <div className="row">
          <div className="input-field col s4">
            <input id="email" type="email" name="email" value={this.state.nuser.email || ''} onChange={this.inputHandler}/>
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col s4">
            <input id="name" type="text" name="name" value={this.state.nuser.name || ''} onChange={this.inputHandler}/>
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field col s4">
            <input id="company" type="text" name="company" value={this.state.nuser.vars.company || ''} onChange={this.inputHandler}/>
            <label htmlFor="company">Company</label>
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
  getInitialState: function() {
    return {data: [], preloader: true};
  },
  removefromList: function(email) {
    this.setState({preloader: true});
    var self = this;
    // console.log('del user!!', email);
    var url = "/delete";
    $.ajax({
      url: url,
      dataType: 'json',
      type: "POST",
      data: email,
      success: function(data) {
        self.getEmailList();
        // console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this),
      complete: function() {
        this.setState({preloader: false});
      }.bind(this)
    });
  },
  getEmailList: function() {
    // console.log('get list!!');
    this.setState({preloader: true});
    var url = "/maillist";
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
        this.addAlert('List downloaded sucessfull');
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this),
      complete: function() {
        this.setState({preloader: false});
      }.bind(this)
    });
  },
  addSubscriber: function(data) {
    var url = "/addusr";
    this.setState({preloader: true});
    $.ajax({
      url: url,
      dataType: 'json',
      type: "POST",
      data: data,
      success: function(data) {
        this.getEmailList();
        // console.log("ADDDD!!", data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this),
      complete: function() {
        this.setState({preloader: false});
      }.bind(this)
    });
  },
  updateUsr: function(data) {
    this.setState({preloader: true});
    var url = "/updusr";
    $.ajax({
      url: url,
      dataType: 'json',
      type: "POST",
      data: data,
      success: function(data) {
        this.getEmailList();
        console.log("Update!!", data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this),
      complete: function() {
        this.setState({preloader: false});
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.getEmailList();
    console.log(Materialize);
  },
  addAlert: function(text) {

  },
  render: function() {
    return(
      <div>
        <Header />
        <div className={classNames("b-preloader", {active: this.state.preloader} )}>
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s6 offset-s3">
            <div className="card white grey-text text-darken-3">
              <AddUsrForm email={this.addSubscriber}/>
              <a href="#" onClick={this.addAlert}>asdfasdfasfasdfasdf</a>
            </div>
            <RecipientsList data={this.state.data} delUser={this.removefromList} updUser={this.updateUsr}/>
          </div>
        </div>
      </div>
    );
  }
});
