import React from 'react';

import TinyMCE from 'react-tinymce';

var MailForm = React.createClass({
  getInitialState: function() {
    return {email: "bot@kanboard.projtest.info", message: ""};
  },
  handleEditorChange: function(e) {
    this.setState({message: e.target.getContent()});
  },
  inputHandler: function(e) {
    this.setState({email: e.target.value});
  },
  submitHandler: function(e) {
    e.preventDefault();
    var email = this.state.email.trim();
    var message = this.state.message.trim();
    alert(message);
    if (!email || !message) {
      alert("Enter message");
      return;
    }
    this.props.messageSend({email: email, message: message});
    this.setState({email: "", message: ""});
    return false;
  },
  render: function() {
    return (
      <form className="mail-form" onSubmit={this.submitHandler}>
        <div className="row">
          <div className="col s6 offset-s3">
            <div className="card teal lighten-5">
              <div className="row">
                <div className="input-field col s12">
                  <input type="email" name="email" value={this.state.email || ''} onChange={this.inputHandler}/>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <TinyMCE
                    content="<p>This is the initial content of the editor</p>"
                    config={{
                      plugins: 'link image code',
                      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                    }}
                    onChange={this.handleEditorChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <button type="submit" className="btn waves-effect waves-light" name='action'>
                    Submit
                    <i className="material-icons right">send</i>
                  </button>
                  <a className="btn" onClick="Materialize.toast('I am a toast', 4000)">Toast</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
});

module.exports = MailForm;
