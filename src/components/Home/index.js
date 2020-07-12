/*
  * This is the user home here. Feel free to just include the landing page (which is the default)!
  * More customizations can be done here - this is only visible to signed-in users.
*/

import React from 'react';
import './index.css';
import { compose } from 'recompose';
import { withFirebase } from '../FirebaseCode';
import { Link } from 'react-router-dom';
import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import * as ROUTES from '../../constants/routes.js';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    //If you're using some firebase, add it here
  }

  componentWillMount() {
    //If you're using some firebase, unmount it here
  }

  getCurrentUnits(requested) {
    let arr = [];
    if (this.state.loading || !this.state.units) {
      return arr;
    }
    for (const property in requested) {
      if (property === 'total') {
        continue;
      }
      for (let i = 0; i < this.state.units.length; i ++) {
        if (this.state.units[i].uid === property) {
          arr.push(this.state.units[i]);
          break;
        }
      }
    }
    return arr;
  }

  render() {
    return (
      <AuthUserContext.Consumer>
      {
        authUser => (
          <div>
            The user homepage is a beautiful page.
          </div>
        )
      }
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withFirebase,
  withAuthorization(condition),
  )(HomePage);
