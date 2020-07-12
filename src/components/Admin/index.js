/*
  * This is the administrator dashboard. This can be accessed at `ROUTES.ADMIN` (see ../../constants.routes.js for more information) and every user can be managed.
  * This page is only visible to administrators. This also provides a details link for each user that allows the administrator to change their permission level.
  * Furthermore, clicking on the heading will hide/show the list of users inside.
*/

import React, { Component } from 'react';
import { compose } from 'recompose';
import { Switch, Route, Link } from 'react-router-dom';

import { withFirebase } from '../FirebaseCode';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

import './index.css';

class UserListBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],
    };
  }
  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
        user: true,
        test_taker: true,
        admin: true,
        mod: true
      });
    });

    this.getRole = this.getRole.bind(this);
    this.getArray = this.getArray.bind(this);
    this.toggleObject = this.toggleObject.bind(this);
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  getRole(user) {
    if (user.roles[ROLES.ADMIN]) {
      return 'Admin';
    }
    if (user.roles[ROLES.MOD]) {
      return 'Moderator';
    }
    if (user.roles[ROLES.TEST_TAKER]) {
      return 'Test Taker';
    }
    return 'User';
  }

  getArray(parameter) {
    const { users } = this.state;
    let arr = [];
    for (let i = 0; i < users.length; i ++) {
      if (this.getRole(users[i]) === parameter) {
        arr.push(users[i]);
      }
    }
    return arr;
  }

  toggleObject(string) {
    if (string === 'User') {
      this.setState({user: !this.state.user});
    }
    if (string === 'Test Taker') {
      this.setState({test_taker: !this.state.test_taker});
    }
    if (string === 'Admin') {
      this.setState({admin: !this.state.admin});
    }
    if (string === 'Moderator') {
      this.setState({mod: !this.state.mod});
    }
  }

  render() {
    const loading = this.state.loading;
    let admin, mod, test_taker, user = [];
    admin = this.getArray('Admin');
    mod = this.getArray('Moderator');
    test_taker = this.getArray('Test Taker');
    user = this.getArray('User');
    return (
      <div>
        <button className="click-button" onClick={() => this.toggleObject('Admin')}><h2> List of Administrators</h2></button><br />
        {loading && <div>Loading ...</div>}
        <ul style={{display: this.state.admin ? "inline" : "none" }}>
          {admin.map(user => (
            <li key={user.uid}>
              <span>
                <strong>E-Mail:</strong> {user.email}
              </span><br />
              <span>
                <strong>Name:</strong> {user.username}
              </span><br />
              <span>
                <strong>Role:</strong> {this.getRole(user)}
              </span><br />
              <span>
                <Link to={`${ROUTES.ADMIN}/${user.uid}`}>
                Details
                </Link>
              </span>
            </li>
          ))}
        </ul>
        <button className="click-button" onClick={() => this.toggleObject('Moderator')}><h2> List of Moderators</h2></button><br />
        {loading && <div>Loading ...</div>}
        <ul style={{display: this.state.mod ? "inline" : "none" }}>
          {mod.map(user => (
            <li key={user.uid}>
              <span>
                <strong>E-Mail:</strong> {user.email}
              </span><br />
              <span>
                <strong>Name:</strong> {user.username}
              </span><br />
              <span>
                <strong>Role:</strong> {this.getRole(user)}
              </span><br />
              <span>
                <Link to={`${ROUTES.ADMIN}/${user.uid}`}>
                Details
                </Link>
              </span>
            </li>
          ))}
        </ul>
        <button className="click-button" onClick={() => this.toggleObject('Test Taker')}><h2> List of Enrolled Test Takers</h2></button><br />
        {loading && <div>Loading ...</div>}
        <ul style={{display: this.state.test_taker ? "inline" : "none" }}>
          {test_taker.map(user => (
            <li key={user.uid}>
              <span>
                <strong>E-Mail:</strong> {user.email}
              </span><br />
              <span>
                <strong>Name:</strong> {user.username}
              </span><br />
              <span>
                <strong>Role:</strong> {this.getRole(user)}
              </span><br />
              <span>
                <Link to={`${ROUTES.ADMIN}/${user.uid}`}>
                Details
                </Link>
              </span>
            </li>
          ))}
        </ul>
        <button className="click-button" onClick={() => this.toggleObject('User')}><h2>List of Users</h2></button><br />
        {loading && <div>Loading ...</div>}
        <ul style={{display: this.state.user ? "inline" : "none" }}>
          {user.map(user => (
            <li key={user.uid}>
              <span>
                <strong>E-Mail:</strong> {user.email}
              </span><br />
              <span>
                <strong>Name:</strong> {user.username}
              </span><br />
              <span>
                <strong>Role:</strong> {this.getRole(user)}
              </span><br />
              <span>
                <Link to={`${ROUTES.ADMIN}/${user.uid}`}>
                Details
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class UserItemBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      user: null,
      isPromotable: false,
      isDemotable: false,
      id: '',
    };

    this.getRole = this.getRole.bind(this);
    this.promote = this.promote.bind(this);
    this.demote = this.demote.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase
    .user(this.props.match.params.id)
    .on('value', snapshot => {
      let user = snapshot.val();
      this.setState({
        user: user,
        loading: false,
        id: this.props.match.params.id
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  getRole(user) {
    if (user.roles[ROLES.ADMIN]) {
      return 'Admin';
    }
    if (user.roles[ROLES.MOD]) {
      return 'Moderator';
    }
    if (user.roles[ROLES.TEST_TAKER]) {
      return 'Test Taker';
    }
    return 'User';
  }

  promote() {
    const user = this.state.user;
    const roles = user.roles;
    const currentRole = this.getRole(user);
    if (currentRole === 'Admin') {
      return;
    }
    if (currentRole === 'Moderator') {
      roles[ROLES.ADMIN] = 'ADMIN';
    }
    else if (currentRole === 'Test Taker') {
      roles[ROLES.MOD] = 'MOD';
    }
    else if (currentRole === 'User') {
      this.props.firebase.initTestTaker(this.state.id);
      roles[ROLES.TEST_TAKER] = 'Test Taker';
    }
    this.props.firebase.updateRoles(this.state.id, roles);
    return;
  }

  demote() {
    const user = this.state.user;
    const roles = user.roles;
    const currentRole = this.getRole(user);
    if (currentRole === 'Admin') {
      return;
    }
    if (currentRole === 'Moderator') {
      delete roles[ROLES.MOD];
    }
    else if (currentRole === 'Test Taker') {
      this.props.firebase.destrTestTaker(this.state.id);
      delete roles[ROLES.TEST_TAKER];
    }
    else if (currentRole === 'User') {
      return;
    }
    this.props.firebase.updateRoles(this.state.id, roles);
    return;
  }

  render() {
    const { user, loading } = this.state;
    let isPromotable, isDemotable = false;
    if (user) {
      isPromotable = (this.getRole(user) === 'Admin') ? false : true;
      isDemotable = (this.getRole(user) === 'User' || this.getRole(user) === 'Admin') ? false : true;
    }
    return (
      <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" />
        <h2>User ({user && user.username}{(!loading && !user) && <span>Nonexistent</span>})</h2>
        {loading && <div>Loading ...</div>}
        {user && (
          <div>
            <span>
              <strong>E-Mail:</strong>&nbsp; {user.email}
            </span><br />
            <span>
              <strong>Username:</strong>&nbsp; {user.username}
            </span><br />
            <span>
              <strong>Role:</strong>&nbsp; {this.getRole(user)}
            </span><br />
          </div>
        )}
        {(!loading && !user) && <div>It helps if your user exists in the database. Let's get you back to the <Link to={ROUTES.ADMIN}>admin dashboard.</Link></div>}
        {isPromotable && <button className = "prom-btn semibold" onClick={this.promote}>Promote</button>}
        {isDemotable && <button className = "dem-btn semibold" onClick={this.demote}>Demote</button>}
      </div>
    );
  }
}

const UserList = withFirebase(UserListBase);
const UserItem = withFirebase(UserItemBase);

const AdminPage = () => (
  <div>
    <h1>Admin Dashboard</h1>
    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>
  </div>
);

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase,
  )(AdminPage);
