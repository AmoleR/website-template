/*
  * This is the sign up form. Here the user can sign up.
  ***********************************************************************************
  *                    The code in here should remain untouched!                    *
  *    To change the CSS please use the index.css and change the link in App.js.    *
  ***********************************************************************************
  * The only thing that could be changed is adding of classes. Those can be edited, but don't edit any of the main logic.
  * Oh yeah, you could change the default user to a student. Go to the onSubmit function to see that.
*/

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import { withFirebase } from '../FirebaseCode';

import * as ROLES from '../../constants/roles';

const SignUpPage = () => (
  <div style={{"padding-left": "5em", "padding-right": "5em", "padding-top": "1em", "padding-bottom": "1em"}}>
    <h1>Sign Up for an Account!</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    const roles = {};
    /*
     * If you want to change the default user to student, add the line
     ```
     roles[ROLES.STUDENT] = ROLES.STUDENT;
     ```
    */

    roles[ROLES.USER] = ROLES.USER;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            roles
          });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      /*
        * Right here if you want to change the default user to student, add the line
        this.props.firebase.initStudent(authUser.user.id);
      */
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
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
    return (
      <div class="inner contact">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" />
        <div class="contact-form">
            <form id="contact-us" onSubmit={this.onSubmit}>
                <div class="wow animated slideInLeft">
                  <div class="col-xs-12">
                      <h4>Name:</h4>
                      <input name="username" style={{width: "50%", minWidth: "600px"}} value={username} onChange={this.onChange} id="mail" className="form" type="text" placeholder="Full Name" />
                      <h4>Email:</h4>
                      <input name="email" style={{width: "50%", minWidth: "600px"}} value={email} onChange={this.onChange} id="mail" className="form" type="text" placeholder="Email Address" />
                      <h4>Password:</h4>
                      <input name="passwordOne" style={{width: "50%", minWidth: "600px"}} value={passwordOne} onChange={this.onChange} type="password" className="form" id="password" placeholder="Password" />
                      <h4>Confirm Password:</h4>
                      <input name="passwordTwo" style={{width: "50%", minWidth: "600px"}} value={passwordTwo} onChange={this.onChange} type="password" className="form" id="password" placeholder="Confirm Password" />
                    </div>
                </div>
                <div class="relative fullwidth col-xs-12">
                    <button disabled={isInvalid} type="submit" id="submit" name="submit" class="form-btn semibold">Sign Up</button>
                </div>
                <div class="clear"></div>
                {error && <p>{error.message}</p>}
            </form>
        </div>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
