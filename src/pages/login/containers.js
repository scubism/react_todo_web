import React from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router'

if (process.env.BROWSER) {
  require("./style.css");
}


export default class LoginPage extends React.Component {
  signUp() {
    browserHistory.push('/home');
  }

  render() {
    return (
      <div className="login">
        <h1 className="heading">Login Page</h1>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/todo">Try Todo Sample</Link>
          </li>
        </ul>
      </div>
    );
  }
}
