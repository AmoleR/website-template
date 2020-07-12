/*
  * Here is the menu. This is a hamburger menu that opens options.
  * The default template is presented, and in addition, there are two classes you must do: NavigationAuth (when user signed in) and NavigationNonAuth.
*/

import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
//Feel free to change the line directly below to change your logo file type to the proper one
import logo from './images/logo.png';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';

//Don't change this.
const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

/*
  * The NavigationAuth is a functional component that allows a signed in user to view a custom menu.
  * An important note is that you should only edit the code in the nav tag, unless you're feeling a bit more bold. However, I suggest that you do not tamper with any of the functions outside of that.
  * To display a new column, use the following code:
  ```
  <div className="col">
    <h3><Link onClick={this.hasMoved} to={ROUTES.YOUR_PATH}>YOUR HEADER</Link></h3>
    <ul>
      <li><Link onClick={this.hasMoved} to={ROUTES.YOUR_PATH}>Your Page</Link></li>
      <li><Link onClick={this.hasMoved} to={ROUTES.YOUR_PATH}>Your Page</Link></li>
    </ul>
  </div>
  ```
  Feel free to add as many elements in a column. The sign out button can be accessed in '../SignOut/index.js'.
  * In addition, there custom admin, moderator, student, and user menus. Typically, the higher level role can access all features of the lower level role.
*/
class NavigationAuth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false
    };
    this.onClick = this.onClick.bind(this);
    this.hasMoved = this.hasMoved.bind(this);
  }

  onClick() {
    this.setState({ isActive: !this.state.isActive });
  }

  hasMoved() {
    this.setState({isActive: false});
  }
  render() {
    const isActive = this.state.isActive;
    return (
      <div id="menu-container" >
        <div className="hero">
        <div style={{textAlign: "right", height: "0px", zIndex: "1000", paddingRight: "2em"}}>
          <Link onClick={this.hasMoved} to={ROUTES.LANDING}><img alt="Logo" src={logo} /></Link>
        </div>
          <header id="masthead" className = {isActive ? "is-active" : ""} role="banner">
          <div style={{textAlign: "left", height: "0px", zIndex: "1000", paddingLeft: "2.5em"}}>
          <button onClick={this.onClick} className = {isActive ? "hamburger hamburger--boring is-active" : "hamburger hamburger--boring"} type="button">
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
            <span className="hamburger-label">Menu</span>

              </button>
          </div>
            <div style={{paddingLeft: "2.5em"}}>
              <nav id="site-nav" className = {isActive ? "is-active" : ""} role="navigation">
                  <div className="col">
                    <Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}><h3>First Column</h3></Link>
                    <ul>
                      <li><Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}>First Link</Link></li>
                      <li><Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}>Second Link</Link></li>
                      <li><Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}>Third Link</Link></li>
                    </ul>
                  </div>
                  <div className="col">
                    <Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}><h3>Second Column</h3></Link>
                    <ul>
                      <li><Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}>First Link</Link></li>
                      <li><Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}>Second Link</Link></li>
                      <li><Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}>Third Link</Link></li>
                    </ul>
                  </div>
                  {
                    //The third column is the user column - this functionality is not available in NavigationNonAuth
                  }
                  <div className="col">
                    <h3><Link onClick={this.hasMoved} to={ROUTES.HOME}>Home</Link></h3>
                    <ul>
                      <li><Link onClick={this.hasMoved} to={ROUTES.ACCOUNT}>Change Password</Link></li>
                      <li><Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}>Second Link</Link></li>
                      <li><Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}>Third Link</Link></li>
                    </ul>
                  </div>
                  <div className="col">
                    <h3><SignOutButton /></h3>
                  </div>
              </nav>
            </div>
            {!!this.props.authUser.roles[ROLES.STUDENT] && (
                <div style={{paddingLeft: "2.5em"}}>
                <nav id="site-nav" className = {isActive ? "is-active" : ""} role="navigation">

                    {!!this.props.authUser.roles[ROLES.ADMIN] && (
                      <div className="col">
                        <Link onClick={this.hasMoved} to={ROUTES.ADMIN}><h3>Admin</h3></Link>
                        <ul>
                          <li><Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}>First Link</Link></li>
                          <li><Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}>Second Link</Link></li>
                          <li><Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}>Third Link</Link></li>
                        </ul>
                      </div>
                    )}
                  {!!this.props.authUser.roles[ROLES.MOD] && (
                        <div className="col">
                          <Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}><h3>Moderator</h3></Link>
                          <ul>
                            <li><Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}>First Link</Link></li>
                            <li><Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}>Second Link</Link></li>
                            <li><Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}>Third Link</Link></li>
                          </ul>
                        </div>
                  )}
                    <div className="col">
                      <Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}><h3>Test Taker</h3></Link>
                      <ul>
                        <li><Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}>First Link</Link></li>
                        <li><Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}>Second Link</Link></li>
                        <li><Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}>Third Link</Link></li>
                      </ul>
                    </div>
                </nav>
              </div>
            )}
          </header>
        </div>
      </div>
    );
  }
}

/*
  * The NavigationAuth is a functional component that allows a guest to view a custom menu.
  * An important note is that you should only edit the code in the nav tag, unless you're feeling a bit more bold. However, I suggest that you do not tamper with any of the functions outside of that.
  * To display a new column, use the following code:
  ```
  <div className="col">
    <h3><Link onClick={this.hasMoved} to={ROUTES.YOUR_PATH}>YOUR HEADER</Link></h3>
    <ul>
      <li><Link onClick={this.hasMoved} to={ROUTES.YOUR_PATH}>Your Page</Link></li>
      <li><Link onClick={this.hasMoved} to={ROUTES.YOUR_PATH}>Your Page</Link></li>
    </ul>
  </div>
  ```
  Feel free to add as many elements in a column. The sign in button can be accessed in '../SignIn/index.js'.
  * There are no custom admin, moderator, student, and user menus. The user isn't actually signed in!
*/

class NavigationNonAuth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({ isActive: !this.state.isActive });
  }

  render() {
    const isActive = this.state.isActive;
    return (
      <div id="menu-container" >
        <div className="hero">
        <div style={{textAlign: "right", height: "0px", zIndex: "1000", paddingRight: "2em"}}>
          <Link onClick={this.hasMoved} to={ROUTES.LANDING}><img id="logo" alt="MAST Logo" src={logo}/></Link>
        </div>
          <header id="masthead" className = {isActive ? "is-active" : ""} role="banner">
          <div style={{textAlign: "left", height: "0px", zIndex: "1000", paddingLeft: "2.5em"}}>
          <button onClick={this.onClick} className = {isActive ? "hamburger hamburger--boring is-active" : "hamburger hamburger--boring"} type="button">
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
            <span className="hamburger-label">Menu</span>

              </button>
          </div>
            <div style={{paddingLeft: "2.5em"}}>
              <nav id="site-nav" className = {isActive ? "is-active" : ""} role="navigation">
                  <div className="col">
                    <Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}><h3>First Column</h3></Link>
                    <ul>
                      <li><Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}>First Link</Link></li>
                      <li><Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}>Second Link</Link></li>
                      <li><Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}>Third Link</Link></li>
                    </ul>
                  </div>
                  <div className="col">
                    <Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}><h3>Second Column</h3></Link>
                    <ul>
                      <li><Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}>First Link</Link></li>
                      <li><Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}>Second Link</Link></li>
                      <li><Link onClick={this.hasMoved} to={ROUTES.NULL_PATH}>Third Link</Link></li>
                    </ul>
                  </div>
                  <div className="col">
                    <h3><Link onClick={this.hasMoved} to={ROUTES.SIGN_IN}>Sign In</Link></h3>
                  </div>
              </nav>
            </div>
          </header>
        </div>
      </div>
    );
  }
}

export default Navigation;
