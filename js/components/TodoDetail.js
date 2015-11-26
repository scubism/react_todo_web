import React, { Component, PropTypes } from 'react'

class TodoDetail extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.todos !== this.props.todos ||
      nextProps.viewingTodoId !== this.props.viewingTodoId
    );
  }

  render() {
    let {todos, viewingTodoId} = this.props;
    if (viewingTodoId) {
      let todo = todos.find(todo =>
          todo.id === viewingTodoId
        );
      if (todo) {
        return (
          <div className="todo-detail">
            Viewing: {todo.title} ({todo.id})
          </div>
        );
      }
    }
    return false;
  }
}

TodoDetail.propTypes = {
  todos: PropTypes.array.isRequired,
  viewingTodoId: PropTypes.any,
}

export default TodoDetail;
