/*
  * Here's the form to submit a file.
  * The idea is the direct url (ROUTES.SUBMIT) is going to be a navigation page, like to navigate to SMO Problem 1, 2, and 3, which will have unique IDs.
  * You have to manage to take care of submissions. The current database structure for submissions are:
      * requested - These are the tests that the user requested to take.
      * toGrade - These are the tests that can be still edited (during submission time).
      * completed - These are the tests that are graded with feedback. I provide little help here, while covering both of the other options carefully.
  * You also have to make sign up pages where you let the user self-register for contests, and then it automatically adds the contest submit url to the request. For example, if the user were to submit the 2020 SIME at /submit/2020-sime, then they would need '2020-sime': true inside the database.
*/

import React, { Component } from 'react';
import { compose } from 'recompose';
import { Switch, Route, Link } from 'react-router-dom';

import { withFirebase } from '../FirebaseCode';
import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import HomePage from '../Home';
import NotFoundPage from '../NotFoundPage';

class SubmitUnitBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      unit: null,
      id: '',
      file: null,
      error: '',
      success: '',
      downloadURL: '',
      downloading: true
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onResubmit = this.onResubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true, id: this.props.match.params.id });
    if(this.props.authUser.toGrade[this.props.match.params.id] || this.props.authUser.completed[this.props.match.params.id]) {
      this.props.firebase
      .getFileURL(this.props.authUser.uid, this.props.match.params.id)
      .then(url => {
        this.setState({
          downloadURL: url,
          downloading: false,
        });
      });
    }
  }

  onSubmit(event, uid) {
    console.log(uid);
    this.props.firebase.getFile(uid, this.state.id).put(this.state.file)
    .on('state_changed', snapshot => {}, error => {
      console.log(error);
    });
    this.props.firebase.requested(uid).once('value', snapshot => {
      let requested = snapshot.val();

      delete requested[this.state.id];
      requested["total"] = requested.total - 1;

      this.props.firebase.requested(uid).set(requested);
    });
    this.props.firebase.toGrade(uid).once('value', snapshot => {
      let toGrade = snapshot.val();

      toGrade[this.state.id] = true;
      toGrade["total"] = toGrade.total + 1;

      this.props.firebase.toGrade(uid).update(toGrade);
    });
    this.setState({ success: "Submitted! Reload the page." });
    event.preventDefault();
  }

  onResubmit(event, uid) {
    console.log(uid);
    this.props.firebase.getFile(uid, this.state.id).put(this.state.file)
    .on('state_changed', snapshot => {}, error => {
      console.log(error);
    });
    this.setState({ success: "Submitted! Reload the page." });
    event.preventDefault();
  }

  onChange(event) {
    if (!event.target.files[0]) {
      return;
    }
    if(event.target.files[0].size > 5000000) {
      this.setState({ error: "File Size Too Big!" });
      console.log("File Size Too Big");
      return;
    }
    if (event.target.files[0]) {
      this.setState({ file: event.target.files[0] });
    }
    console.log(event.target.files[0]);
    event.preventDefault();
  }

  getUrl() {

  }

  render() {
    const {unit, loading} = this.state;
    const isInvalid = !this.state.file;
    console.log(this.state.file);
    return (
      <div>
      <AuthUserContext.Consumer>
      {
        authUser => authUser.requested[this.props.match.params.id] ? (
          <div>
            {loading ? <h1>Loading...</h1> : (
              <div>
                <h1>Submit {this.props.match.params.id}</h1>
                <h2>The maximum submission size is 5 MB. If you exceed this value, use a PDF Compressor to shrink the size.</h2>
                <div className="inner contact">
                  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" />
                  <div className="contact-form">
                      <form id="contact-us" onSubmit={event => this.onSubmit(event, authUser.uid)}>
                          <div className="wow animated slideInLeft">
                            <div className="col-xs-12">
                                <h4>Upload Solutions:</h4>
                                <input name="email" style={{width: "50%", minWidth: "600px"}} onChange={this.onChange} id="mail" className="form" type="file" placeholder="File" accept=".pdf" />
                                <h3>{this.state.file && <span>File size: {this.state.file.size} Bytes</span>}</h3>
                                <h3 style={{color: "red"}}>{this.state.error}</h3>
                                <h3 style={{color: "green"}}>{this.state.success}</h3>
                              </div>
                          </div>
                          <div className="relative fullwidth col-xs-12">
                              <button disabled={isInvalid} type="submit" id="submit" name="submit" className="form-btn semibold">Submit!</button>
                          </div>
                          <div className="clear"></div>
                      </form>
                  </div>
                </div>
              </div>
          )}
          </div>
        ) : authUser.toGrade[this.props.match.params.id] ? (
          <div>
            <h1>
            {loading ? <span>Loading</span> : <span>Welcome back {authUser.name}</span>}
            </h1>
            Download your solutions file at {this.state.downloading ? <i>Loading...</i> : <a href={this.state.downloadURL}>this link</a>}.
            <h1>Resubmit {this.props.match.params.id}</h1>
            <h2>The maximum submission size is 5 MB. If you exceed this value, use a PDF Compressor to shrink the size.</h2>
            <div className="inner contact">
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" />
              <div className="contact-form">
                  <form id="contact-us" onSubmit={event => this.onResubmit(event, authUser.uid)}>
                      <div className="wow animated slideInLeft">
                        <div className="col-xs-12">
                            <h4>Upload Solutions:</h4>
                            <input name="email" style={{width: "50%", minWidth: "600px"}} onChange={this.onChange} id="mail" className="form" type="file" placeholder="File" accept=".pdf" />
                            <h3>{this.state.file && <span>File size: {this.state.file.size} Bytes</span>}</h3>
                            <h3 style={{color: "red"}}>{this.state.error}</h3>
                            <h3 style={{color: "green"}}>{this.state.success}</h3>
                          </div>
                      </div>
                      <div className="relative fullwidth col-xs-12">
                          <button disabled={isInvalid} type="submit" id="submit" name="submit" className="form-btn semibold">Submit!</button>
                      </div>
                      <div className="clear"></div>
                  </form>
              </div>
            </div>
          </div>
        )
        : authUser.completed[this.props.match.params.id] ? (
          <div>
            <h1>
            {loading ? <span>Loading</span> : <span>Welcome back {authUser.name}</span>}
            </h1>
            Download your solutions file at {this.state.downloading ? <i>Loading...</i> : <a href={this.state.downloadURL}>this link</a>}.
            <div id="grader-feedback">
              {
                //Presumably you should add grader feedback here. I'll implement that later.
              }
            </div>
          </div>
        ) : <NotFoundPage />
      }
      </AuthUserContext.Consumer>
      </div>
    );
  }
}

const pageCondition = authUser => !!authUser && (!!authUser.requested[this.props.match.params.id] || !!authUser.toGrade[this.props.match.params.id] || !!authUser.completed[this.props.match.params.id]);
const SubmitUnit = compose(withFirebase, withAuthorization(pageCondition))(SubmitUnitBase);

const SubmitPage = () => (

    <AuthUserContext.Consumer>
    {authUser => {
      return (
      <Switch>
        <Route exact path={ROUTES.SUBMIT} component={() => <HomePage />} />
        <Route exact path={ROUTES.SUBMIT_DETAILS} component={() => <SubmitUnit authUser={authUser}/>} />
      </Switch>
    )}}

  </AuthUserContext.Consumer>
);

const condition = authUser =>
  authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase,
)(SubmitPage);
