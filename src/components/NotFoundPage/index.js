/*
  * A very basic 404 page. Feel free to add images, css, and more text here.
  * A note is that if a user tries to access a page to which he does not have permission to access, he will see a 404 page instead.
  * This functionality helps protect the identity of the administrator pages.
*/

import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class NotFoundPage extends React.Component {
  render() {
    return(
      <div>
      Whoops! Looks like you landed on a page that doesn't actually exist.<br /><br />
      Click <Link to={ROUTES.LANDING}>here</Link> to return back home.
      </div>
    );
  }
}

export default NotFoundPage;
