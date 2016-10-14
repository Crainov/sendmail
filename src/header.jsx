import React from 'react';
import { Link } from "react-router";

module.exports = React.createClass({
  render: function() {
    return (
      <nav>
        <div className="nav-wrapper light-blue darken-4">
          <Link to="/" className="brand-logo">Mail Sender</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/">Write message</Link></li>
            <li><Link to="/recipients">Subscr List</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
});
