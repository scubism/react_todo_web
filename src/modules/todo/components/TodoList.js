import React from 'react';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import Loader from 'react-loaders'
import { listTodos, createTodo, updateTodo, deleteTodo } from '../actions';
import { TodoInlineCreateForm, TodoInlineUpdateForm } from './TodoInlineForm'
import TodoListItem from './TodoListItem';

@provideHooks({
  fetch: ({ dispatch, store }) => dispatch(
    listTodos({
      reject: (e) => {alert(e.message);},
      store
    }))
})
@connect((state) => {
  return {
    todos: state.todo.todos || [],
    fetchState: state.todo.fetchState,
    focusedTodo: state.todo.focusedTodo,
  };
})
export default class TodoList extends React.Component {
  render() {
    const { todos, fetchState, focusedTodo, dispatch } = this.props;

    return (
      <div className="todo-list">
        <div key="loader"
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
        <TodoInlineCreateForm key="create-form" />
        <ul key="items" className="todo-list-items">
          {todos.map((todo, index) => {
            if (focusedTodo && focusedTodo.id == todo.id) {
              return (
                <TodoInlineUpdateForm key={index} initialValues={todo}/>
              )
            }
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
