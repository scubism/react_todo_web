import React from 'react';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import Loader from 'react-loaders'
import { listTodos } from '../actions';
import TodoInlineForm from './TodoInlineForm'
// import TodoListItem from './TodoListItem';

@provideHooks({
  fetch: ({ dispatch }) => dispatch(listTodos())
})
@connect((state) => {
  return {
    todos: state.todo.todos,
    fetchState: state.todo.fetchState[listTodos]
  };
})
export default class TodoList extends React.Component {
  render() {
    const { todos, fetchState } = this.props;
    return (
      <div className="todo-list">
        <TodoInlineForm />
        <div
          style={{display: fetchState.fetching ? 'block' : 'none'}}
          className="loader"
          >
          <Loader type="line-scale" active="true"/>
        </div>
        <div>
          {todos.map((todo, index) => {
            return (
              <div key={index}>
                {todo.title}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
