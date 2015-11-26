import React, { Component, PropTypes } from 'react'

class TodoDetail extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.todos !== this.props.todos ||
      nextProps.viewingTodo !== this.props.viewingTodo
    );
  }

  render() {
    let {todos, viewingTodo} = this.props;
    if (viewingTodo) {
      return (
        <div className="todo-detail">
          Viewing: {viewingTodo.title} ({viewingTodo.id})
        </div>
      );
    }
    return false;
  }
}

TodoDetail.propTypes = {
  todos: PropTypes.array.isRequired,
  viewingTodo: PropTypes.any,
}

export default TodoDetail;
