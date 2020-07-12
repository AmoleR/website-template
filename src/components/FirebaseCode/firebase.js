/*
  * Here, we connect the signed in (authUser) with the rest of the database and make this information available to the App.
  * To use firebase, do
  ```
  import { withFirebase } from '../FirebaseCode';
  ```
  Then, you can follow the next steps.
  * If you need to do anything with firebase, change the bottom
  ```
  export default YourPage;
  ```
  to
  ```
  export default withFirebase(yourPage);
  ```
  * Note that if you already have one operation (such as withAuthorization, see ../Session/index.js for more information), change it from
  ```
  export default withAuthorization(condition)(YourPage);
  ```
  to
  ```
  export default compose(
    withAuthorization(condition),
    withFirebase)(YourPage);
  ```
  (needs to also include `import compose from 'recompose';` before the class).
  * From there, any commands necessary can be called using this.props.firebase.command, where command should be defined below. The code to implement recieving a list from the database is:
  ```
  this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false
      });
    });
  ```
  This should go inside the componentDidMount() function. It is a general good idea to store this in the state, initializing the state (in the constructor) as:
  ```
  constructor(props) {
    super(props);

    this.state {
      users: null,
      loading: true
    }
    ...
  }
  ```
  The use of the loading command is so that you can display a Loading command when the data is still being fetched, and then later it is being used. Finally, make sure you unmount the listener, turning it off with:
  ```
  this.props.firebase.users().off();
  ```
  where instead of users, you should change it to the same command in the componentDidMount() component.
*/

import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyDYVwwnuK0gTQsEfTZj3LPZUOMcaQtGue0",
  authDomain: "mast-199.firebaseapp.com",
  databaseURL: "https://mast-199.firebaseio.com",
  projectId: "mast-199",
  storageBucket: "mast-199.appspot.com",
  messagingSenderId: "133479649085",
  appId: "1:133479649085:web:4604eb12e0200a10f0ff54",
  measurementId: "G-N8Y35YKEG3"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
    this.st = app.storage();
  }

  //Leave all of these lines untouched. The only one you should change has been highlighted below
  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
    url: "", //Edit this to be your website URL! This is the location you get redirected to after signing up.
  });

  // Don't touch the following lines of code. These are written such that we can connect the database to the Authentication.
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
        .once('value')
        .then(snapshot => {
          const dbUser = snapshot.val();
          // default empty roles
          if (!dbUser.roles) {
            dbUser.roles = {};
          }
          // merge auth and db user
          authUser = {
            uid: authUser.uid,
            email: authUser.email,
            emailVerified: authUser.emailVerified,
            providerData: authUser.providerData,
            ...dbUser,
          };
          next(authUser);
        });
      }
      else {
        fallback();
      }
  });

  /*
    * These are the default commands that should not be changed. To reference something inside the database, create a new arrow function such as:
    ```
    getSomething = (argument1, argument2, ...) => this.db.ref(`your-path-to-the-actual-location`);
    ```
    * Note that the database stores everything as a JSON file, so you will recieve objects as such.
    * In addition, to use arguments, you must escape them as ${argument1}.
    * Finally, to access a subobject, use a forward slash /.
  */
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');
  /*
    * The following command should never be used while in production, simply while in development.
    * Instead, while in production, create a specific function to access the firebase storage, such as
    ```
    getFile = (argument1, argument2, ...) => this.st.ref(`your-path-to-the-actual-location);
    ```
    * For example, one such function would be
    ```
    getSIMESubmission = (uid) => this.st.ref(`SIME/${uid}`);
    ```
  */
  fileStorage = () => this.st;
}

export default Firebase;
