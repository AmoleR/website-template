/*
  * This is the sign in form. Here the user can sign in.
  ***********************************************************************************
  *                    The code in here should remain untouched!                    *
  *    To change the CSS please use the index.css and change the link in App.js.    *
  ***********************************************************************************
  * The only thing that could be changed is adding of classes. Those can be edited, but don't edit any of the main logic.
*/

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import './index.css';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../FirebaseCode';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div style={{"padding-left": "5em", "padding-right": "5em", "padding-top": "1em", "padding-bottom": "1em"}}>
    <h1>Sign In To Your Account!</h1><br /><br /><br />
    <SignInForm /><br /><br />
    <SignUpLink />
    <PasswordForgetLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
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
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div class="inner contact">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" />
        <div class="contact-form">
            <form id="contact-us" onSubmit={this.onSubmit}>
                <div class="wow animated slideInLeft">
                  <div class="col-xs-12">
                      <h4>Email:</h4>
                      <input name="email" style={{width: "50%", minWidth: "600px"}} value={email} onChange={this.onChange} id="mail" className="form" type="text" placeholder="Email Address" />
                      <h4>Password:</h4>
                      <input name="password" style={{width: "50%", minWidth: "600px"}} value={password} onChange={this.onChange} type="password" className="form" id="password" placeholder="Password" />
                    </div>
                </div>
                <div class="relative fullwidth col-xs-12">
                    <button disabled={isInvalid} type="submit" id="submit" name="submit" class="form-btn semibold">Sign In</button>
                </div>
                <div class="clear"></div>
                {error && <p>{error.message}</p>}
            </form>
        </div>
      </div>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
