/*
  * This is the user dashboard. Here the user can change their password.
  ***********************************************************************************
  *                    The code in here should remain untouched!                    *
  *    To change the CSS please use the index.css and change the link in App.js.    *
  ***********************************************************************************
  * The only thing that could be changed is adding of classes. Most of the actual code is done in ../PasswordForget/index.js.
*/

import React from 'react';
import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import PasswordChangeForm from '../PasswordChange';
import { withFirebase } from '../FirebaseCode';
import { compose } from 'recompose';

class AccountPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: "",
    };
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <h1>Account: {this.props.firebase.user(authUser.uid).username}</h1>
            <PasswordChangeForm email={authUser.email} />
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withFirebase,
  withAuthorization(condition, true),
  )(AccountPage);
