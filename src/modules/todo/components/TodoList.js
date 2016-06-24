import React from 'react';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import Loader from 'react-loaders'
import { listTodos, createTodo, updateTodo, deleteTodo } from '../actions';
import TodoInlineForm from './TodoInlineForm'
import TodoListItem from './TodoListItem';

@provideHooks({
  fetch: ({ dispatch }) => dispatch(listTodos())
})
@connect((state) => {
  return {
    todos: state.todo.todos,
    fetchState: state.todo.fetchState
  };
})
export default class TodoList extends React.Component {
  render() {
    const { todos, fetchState, dispatch } = this.props;
    return (
      <div className="todo-list">
        <div
          style={{display: (
            fetchState[listTodos].fetching ||
            fetchState[createTodo].fetching ||
            fetchState[updateTodo].fetching ||
            fetchState[deleteTodo].fetching
          ) ? 'block' : 'none'}}
          className="loader"
          >
          <Loader type="line-scale" active="true"/>
        </div>
        <TodoInlineForm />
        <ul className="todo-list-items">
          {todos.map((todo, index) => {
            return (
              <TodoListItem
                key={index}
                todo={todo}
                dispatch={dispatch}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
