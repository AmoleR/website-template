/*
  * Welcome to this React App which is a simple authentication along with Firebase. Contact me at rama.amol@icloud.com if you have any questions.
  * There are many things in consideration. Here are a few guidelines:
    * To create a NEW PAGE, create a new folder inside components which you can use to identify your page, and create an index.js file inside. Then use the starter code:
    ```
    import React from 'react';

    class YourPage extends React.Component {
      constructor(props) {
        super(props);
      }

      componentDidMount() {

      }

      componentWillUnmount() {

      }

      render() {
        return (
          <div>
            Inside here, you can put all of the JSX code that you wish. That basically means that you can not add script tags here, nor change the identities of the title, head, etc.<br />
            To see those, please check out ../../public/index.html and change those there. You can also opt to change favicon.ico to your website's favicon.<br />
            Finally, note one important distinction: every opening tag has to have a closing tag. In particular, a regular br tag has to have a closing tag as well.<br />
          </div>
        );
      }
    }

    export default YourPage;
    ```
    Note that you should change all instances of YourPage to your own title. After that, navigate back here and right before the line
    ```
    class App extends React.Component {
    ```
    put the line
    ```
    import YourPage from '../YourLocation';
    ```
    Finally, navigate into the Switch component, and right before the line:
    ```
    <Route component={NotFoundPage} />
    ```
    place
    ```
    <Route path={ROUTES.YOUR_PATH} component={YourPage} />
    ```
    Then, to finish up, go into '../../constants/routes.js' and add the line:
    ```
    export const YOUR_PATH = '/your-url';
    ```
    Happy coding after this! You set up a new page at that url!
*/

import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import SubmitPage from '../SubmitFile';
import NotFoundPage from '../NotFoundPage';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      },
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return(
      <div>
        <Router>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" />
            <Navigation />
            <div style={{padding: "2em"}}>
              <Switch>
                <Route exact path={ROUTES.LANDING} component={LandingPage} />
                <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                <Route exact path={ROUTES.CUSTOM_LANDING} component={LandingPage} />
                <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                <Route path={ROUTES.HOME} component={HomePage} />
                <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                <Route path={ROUTES.ADMIN} component={AdminPage} />
                <Route path={ROUTES.SUBMIT} component={SubmitPage} />
                <Route component={NotFoundPage} />
              </Switch>
              </div>
        </Router>
      </div>
    );
  }
}

export default withAuthentication(App);
