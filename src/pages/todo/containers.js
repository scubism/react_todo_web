import React from 'react';
import { browserHistory } from 'react-router';
import { provideHooks, trigger } from 'redial';
import { connect } from 'react-redux';
import { listTodos } from './actions';

if (process.env.BROWSER) {
  require("./style.css");
}

@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(listTodos())
})
@connect((state) => {
  return {
    todos: state.todoReducer && state.todoReducer.todos || []
  };
})
class TodoPage extends React.Component {

  render() {
    const { todos, dispatch } = this.props;
    return (
      <div className="todo">
        {todos.map((todo, index) => {
          return <div>{todo.title}</div>
        })}
        <button onClick={() => {dispatch(listTodos())}}>refresh</button>
        <button onClick={() => {dispatch({type: 'INCREMENT_ASYNC'})}}>saga test</button>
      </div>
    );
  }
}

export default TodoPage
