import React from "react";
import { Link } from 'react-router'

if (process.env.BROWSER) {
  require("./home.css");
}

export default class HomePage extends React.Component {
  render() {
    return (
      <div className="home">
        <header><h1>Todo Center</h1></header>
        <section>
          <ul>
            <li>
              <Link to="/todos">Try Todo Sample</Link>
            </li>
          </ul>
        </section>
        <footer>
          This project is a sample prototype to build microservices.
          <br/>
          See the repository:
          <a target="_blank" href="https://github.com/scubism/todo_center">https://github.com/scubism/todo_center</a>
        </footer>
      </div>
    );
  }
}
