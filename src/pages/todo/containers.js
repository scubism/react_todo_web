import React from 'react';
import { browserHistory } from 'react-router';
import { provideHooks } from 'redial';
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
    todos: state.todoReducer.todos
  };
})
class TodoPage extends React.Component {

  render() {
    const { todos } = this.props;
    console.log(todos)
    return (
      <div className="todo">
        {todos.map((todo, index) => {
          return <div>{todo.title}</div>
        })}
      </div>
    );
  }
}

export default TodoPage
