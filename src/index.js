/*
  ***********************************************************************************
  *                    The code in here should remain untouched!                    *
  *               Under NO CIRCUMSTANCES should this code be changed!               *
  ***********************************************************************************
*/


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Firebase, { FirebaseContext } from './components/FirebaseCode';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
