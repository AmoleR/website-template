/*
  ***********************************************************************************
  *                    The code in here should remain untouched!                    *
  *               Under NO CIRCUMSTANCES should this code be changed!               *
  ***********************************************************************************
*/

import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';
import { withFirebase } from '../FirebaseCode';
import * as ROUTES from '../../constants/routes';
import NotFoundPage from '../NotFoundPage';

const withAuthorization = (condition) => Component => {
  class WithAuthorization extends React.Component {

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : <NotFoundPage />
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};

export default withAuthorization;
