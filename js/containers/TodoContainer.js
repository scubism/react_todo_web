import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import TodoList from '../components/TodoList'
import TodoForm from '../components/TodoForm'
import TodoDetail from '../components/TodoDetail'

import {
  createTodo,
  viewTodo,
  updateTodo,
  deleteTodo,
  moveTodo
} from '../actions/todoActions'


class _TodoLayout extends Component {

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
    return (
      <div className="todo-container">
        {this._renderLoading.bind(this)()}
        {this._renderError.bind(this)()}
        <div>{this.props.children}</div>
      </div>
    );
  }
}
export const TodoLayout = connect(state => ({
  isFetching: state.todosReducer.isFetching,
  error: state.todosReducer.error,
}))(_TodoLayout)

class _TodoIndex extends Component {
  render() {
    let {dispatch, todos, viewingTodo, updatingTodoId} = this.props;
    return (
      <div>
        <TodoList
          todos={todos}
          updatingTodoId={updatingTodoId}
          viewTodo={(todo, viewing) => dispatch(viewTodo(todo, viewing))}
          updateTodo={(todo, updating) => dispatch(updateTodo(todo, updating))}
          deleteTodo={(todo) => dispatch(deleteTodo(todo))}
          moveTodo={(todo, optimisticTodos) => dispatch(moveTodo(todo, optimisticTodos))}
          />
        <TodoForm onSave={(newTodo) => {dispatch(createTodo(newTodo))}}/>
      </div>
    )
  }
}
export const TodoIndex = connect(state => ({
  todos: state.todosReducer.todos,
  updatingTodoId: state.todosReducer.updatingTodoId,
}))(_TodoIndex);


class _TodoView extends Component {
  componentDidMount() {
    this.props.dispatch(viewTodo(this.props.params.todoId));
  }

  render() {
    return (
      <div>
        <Link to="/todos/">Go Back</Link>
        <TodoDetail viewingTodo={this.props.viewingTodo}/>
      </div>
    )
  }
}
export const TodoView = connect(state => ({
  viewingTodo: state.todosReducer.viewingTodo,
}))(_TodoView)
