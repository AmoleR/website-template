/*
  * This is the password reset form. Here the user can reset their password.
  ***********************************************************************************
  *                    The code in here should remain untouched!                    *
  *    To change the CSS please use the index.css and change the link in App.js.    *
  ***********************************************************************************
  * The only thing that could be changed is adding of classes. Those can be edited, but don't edit any of the main logic.
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../FirebaseCode';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <div class="inner contact">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" />
        <div class="contact-form">
            <form id="contact-us" onSubmit={this.onSubmit}>
                <div class="wow animated slideInLeft">
                  <div class="col-xs-12">
                    <h4>Email:</h4>
                    <input name="email" style={{width: "50%", minWidth: "600px"}} value={this.state.email} onChange={this.onChange} type="text" className="form" id="email" placeholder="Email" />
                    </div>
                </div>
                <div class="relative fullwidth col-xs-12">
                    <button disabled={isInvalid} type="submit" id="submit" name="submit" class="form-btn semibold">Send Email</button>
                </div>
                <div class="clear"></div>
                {error && <p>{error.message}</p>}
            </form>
        </div>
      </div>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
