import React from 'react';

if (process.env.BROWSER) {
  require("./todo.css");
}

class TodoPage extends React.Component {

  render() {
    const { dispatch } = this.props;
    return (
      <div className="todo">
        {this.props.children}
      </div>
    );
  }
}

export default TodoPage
