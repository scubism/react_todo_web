import React from 'react';
import { browserHistory } from 'react-router';

if (process.env.BROWSER) {
  require("./style.css");
}


export default class TodoPage extends React.Component {

  render() {
    return (
      <div className="todo">
        <div>todos..</div>
      </div>
    );
  }
}
