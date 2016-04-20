import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import TodoList from '../components/TodoList'
import TodoForm from '../components/TodoForm'
import TodoDetail from '../components/TodoDetail'
import Loader from '../widgets/react-loaders'
import ModalWidget from '../widgets/ModalWidget'

import {
  createTodo,
  viewTodo,
  updateTodo,
  deleteTodo,
  moveTodo
} from '../actions/todoActions'

class _TodoLayout extends Component {

  _renderLoading() {
    return (
      <div className="loader-container">
        <Loader type='line-scale-party'/>
      </div>
    );
  }

  _renderError(error) {
    if (!error) {
      return false
    }
    return (
      <ModalWidget
        content={error}
        isOpen={true}
        element='#modal'/>
    );
  }

  render() {
    return (
      <div className="todo-container">
        {this.props.isFetching && this._renderLoading()}
        {this._renderError(this.props.error)}
        <div className={this.props.isFetching ? 'disabled' : ''}>{this.props.children}</div>
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
        { !updatingTodoId && <TodoForm onSave={(newTodo) => {dispatch(createTodo(newTodo))}}/> }
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
