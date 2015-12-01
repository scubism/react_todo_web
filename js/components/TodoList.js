import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import TodoListItem from './TodoListItem'

class TodoList extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.todos !== this.props.todos ||
      nextProps.updatingTodoId !== this.props.updatingTodoId
    );
  }

  render() {
    let {todos, updatingTodoId, viewTodo, updateTodo, deleteTodo} = this.props;
    return (
      <div className="todo-list">
        {todos.map((todo, index) => {
          return (
            <TodoListItem key={index} todo={todo} index={index}
              updating={todo.id==updatingTodoId}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          );
        })}
      </div>
    );
  }
}


TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  updatingTodoId: PropTypes.any,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
}


export default TodoList;
