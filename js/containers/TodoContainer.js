import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import TodoList from '../components/TodoList'
import TodoForm from '../components/TodoForm'
import TodoDetail from '../components/TodoDetail'

import {
  createTodo,
  viewTodo,
  updateTodo,
  deleteTodo
} from '../actions/todoActions'

class TodoContainer extends Component {
  _renderLoading() {
    if (!this.props.isFetching) {
      return false
    }
    return (
      <div>Loading..</div>
    );
  }

  _renderError() {
    if (!this.props.error) {
      return false
    }
    return (
      <div>{JSON.stringify(this.props.error)}</div>
    );
  }

  render() {
    let {dispatch, todos, viewingTodo, updatingTodoId} = this.props;
    return (
      <div className="todo-container">
        {this._renderLoading.bind(this)()}
        {this._renderError.bind(this)()}
        <TodoDetail todos={todos} viewingTodo={viewingTodo}/>
        <TodoList
          todos={todos}
          updatingTodoId={updatingTodoId}
          viewTodo={(todo, viewing) => dispatch(viewTodo(todo, viewing))}
          updateTodo={(todo, updating) => dispatch(updateTodo(todo, updating))}
          deleteTodo={(todo) => dispatch(deleteTodo(todo))}
          />
        <TodoForm onSave={(newTodo) => {dispatch(createTodo(newTodo))}}/>
      </div>
    );
  }
}

TodoContainer.propTypes = {
  todos: PropTypes.array.isRequired,
  viewingTodo: PropTypes.any,
  updatingTodoId: PropTypes.any,
  isFetching: PropTypes.bool,
  error: PropTypes.any,
}

function select(state) {
  return state.todosReducer;
}

export default connect(select)(TodoContainer);
