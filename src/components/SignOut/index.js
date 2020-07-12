/*
  * This is the sign out form. Here the user can sign out.
  ***********************************************************************************
  *                    The code in here should remain untouched!                    *
  *    To change the CSS please use the index.css and change the link in App.js.    *
  ***********************************************************************************
  * The only thing that could be changed is adding of classes. Those can be edited, but don't edit any of the main logic.
*/

import React from 'react';
import './index.css';
import { withFirebase } from '../FirebaseCode';

const SignOutButton = ({ firebase }) => (
  <div className = "link-button" type="button" onClick={firebase.doSignOut}>
    <a href="/home"><h3>Sign Out</h3></a>
  </div>
);

export default withFirebase(SignOutButton);
