import React from 'react';

module.exports = React.createClass({
  updateNotific: function(text) {
    console.log('update', text)
  },
  render: function() {
    return (
      <div className="notific-wrapper">
        <div className='notific'>
          {this.props.notification_text}
        </div>
      </div>
    );
  }
});
