/*
  * This is the main homepage. Feel free to add an index.css here and customize this!
  * To use the index.css file, just do
  ```
  import './index.css';
  ```
  before the class declaration.
*/

import React from 'react';

class Landing extends React.Component {
  render() {
    return(
      <div>
        The public homepage that <b>any user</b>, signed in or not, can access.
      </div>
    );
  }
}

export default Landing;
