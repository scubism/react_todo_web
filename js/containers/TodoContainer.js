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
  render() {
    let {dispatch, todos, viewingTodoId, updatingTodoId} = this.props;
    return (
      <div className="todo-container">
        <TodoDetail todos={todos} viewingTodoId={viewingTodoId}/>
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
  viewingTodoId: PropTypes.any,
  updatingTodoId: PropTypes.any,
}

function select(state) {
  return state.todosReducer;
}

export default connect(select)(TodoContainer);
