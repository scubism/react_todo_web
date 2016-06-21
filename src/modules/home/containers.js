import React from "react";
import { Link } from 'react-router'

if (process.env.BROWSER) {
  require("./home.css");
}

export default class HomePage extends React.Component {
  render() {
    return (
      <div className="home">
        <h1>Todo Center</h1>
        <ul>
          <li>
            <Link to="/todos">Try Todo Sample</Link>
          </li>
        </ul>
        <p className="caption">
          This project is a sample prototype to build microservices.
          <br/>
          See the gitlab repository for details:
          <a target="_blank" href="https://github.com/scubism/todo_center">https://github.com/scubism/todo_center</a>
        </p>
      </div>
    );
  }
}
