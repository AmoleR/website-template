/*
  * This is the password change form. Here the user can change their password.
  ***********************************************************************************
  *                    The code in here should remain untouched!                    *
  *    To change the CSS please use the index.css and change the link in App.js.    *
  ***********************************************************************************
  * The only thing that could be changed is adding of classes. Those can be edited, but don't edit any of the main logic.
*/

import React, { Component } from 'react';

import { withFirebase } from '../FirebaseCode';

const INITIAL_STATE = {
  password: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

// const email = this.props.email;

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { password, passwordOne } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(this.props.email, password)
      .then(() => {
        this.props.firebase
        .doPasswordUpdate(passwordOne)
        .then(() => {
          this.setState({ ...INITIAL_STATE });
        })
        .catch(error => {
          this.setState({ error });
        });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { password, passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '' || password === '';

    return (
      <div class="inner contact">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" />
        <div class="contact-form">
            <form id="contact-us" onSubmit={this.onSubmit}>
                <div class="wow animated slideInLeft">
                  <div class="col-xs-12">
                    <h4>Old Password:</h4>
                    <input name="password" style={{width: "50%", minWidth: "600px"}} value={password} onChange={this.onChange} type="password" className="form" id="password" placeholder="Old Password" />
                    <h4>New Password:</h4>
                    <input name="passwordOne" style={{width: "50%", minWidth: "600px"}} value={passwordOne} onChange={this.onChange} type="password" className="form" id="password" placeholder="New Password" />
                    <h4>Confirm New Password:</h4>
                    <input name="passwordTwo" style={{width: "50%", minWidth: "600px"}} value={passwordTwo} onChange={this.onChange} type="password" className="form" id="password" placeholder="Confirm New Password" />
                    </div>
                </div>
                <div class="relative fullwidth col-xs-12">
                    <button disabled={isInvalid} type="submit" id="submit" name="submit" class="form-btn semibold">Change Password</button>
                </div>
                <div class="clear"></div>
                {error && <p>{error.message}</p>}
            </form>
        </div>
      </div>
    );
  }
}

export default withFirebase(PasswordChangeForm);
