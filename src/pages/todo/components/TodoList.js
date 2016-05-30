import React from 'react';
import { provideHooks, trigger } from 'redial';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { LIST_TODOS } from '../actions';

@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch({type: LIST_TODOS.REQUEST})
})
@connect((state) => {
  return {
    todos: state.todoReducer && state.todoReducer.todos || []
  };
})
class TodoList extends React.Component {

  render() {
    const { todos } = this.props;
    return (
      <div className="todo-list">
        {todos.map((todo, index) => {
          return (
            <div key={index}>
              <Link to={"/todos/" + todo.id}>{todo.title}</Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default TodoList;
