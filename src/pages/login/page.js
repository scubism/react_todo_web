import React from 'react';
import { browserHistory } from 'react-router';

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
        <p className="lead">Create an account to get started!</p>
        <button className="signUpButton" onClick={this.signUp}>Sign up</button>
      </div>
    );
  }
}
