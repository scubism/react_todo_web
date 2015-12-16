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

    _tryParseJSON(jsonString) {
      try {
        let obj = JSON.parse(jsonString);
        if (obj && typeof obj === 'object' && obj !== null) {
              return obj;
        }
      }
      catch (exception) { }
      return false;
    }

    _parseErrorMessage() {
      let error = this.props.error;
      let errorMessage = 'Unexpected Error';
      if (typeof error === 'string') {
        let errorObject = this._tryParseJSON.bind(this)(error);
        if (!errorObject) {
          errorMessage = error;
        } else {
          if (errorObject.hasOwnProperty('message')) {
            errorMessage = errorObject.message;
          }
        }
      } else if (typeof error === 'object' && error.hasOwnProperty('message')) {
        errorMessage = error.message;
      }
      return errorMessage;
    }

    _renderLoading() {
      if (!this.props.isFetching) {
        return false
      }
      return (
        <div className="loader-container">
          <Loader type='line-scale-party'/>
        </div>
      );
    }

    _renderError() {
      if (!this.props.error) {
        return false
      }
      let errorMessage = this._parseErrorMessage.bind(this)();
      return (
        <ModalWidget
          content={errorMessage}
          isOpen={true}
          element='#modal'/>
      );
    }

  render() {
    return (
      <div className="todo-container">
        {this._renderLoading.bind(this)()}
        {this._renderError.bind(this)()}
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
