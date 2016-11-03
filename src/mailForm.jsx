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
    if (!email || !message) {
      alert("Enter message");
      return;
    }
    this.props.messageSend({email: email, message: message});
    return true;
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
                      forced_root_block: false,
                      plugins: 'link image code template importcss fullpage',
                      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
                      templates: [
                          {title: 'Some title 1', description: 'Some desc 1', url: 'http://localhost:8080/template.html'}
                        ]
                    }}
                    onChange={this.handleEditorChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <button type="submit" className="btn waves-effect waves-light" name='action'>
                    Send
                    <i className="material-icons right">send</i>
                  </button>
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
