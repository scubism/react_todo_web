import React from 'react';
import { Link } from 'react-router'

if (process.env.BROWSER) {
  require("./todo.css");
}

class TodoPage extends React.Component {

  render() {
    const { dispatch } = this.props;
    return (
      <div className="todo">
        <header><h1>todos</h1></header>
        <section>
          {this.props.children}
        </section>
        <footer>
          Back to <Link to="/">Home</Link>
        </footer>
      </div>
    );
  }
}

export default TodoPage
