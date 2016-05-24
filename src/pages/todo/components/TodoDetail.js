import React from 'react';
import { provideHooks, trigger } from 'redial';
import { connect } from 'react-redux';
import { DETAIL_TODOS } from '../actions';

@provideHooks({
  fetch: ({ dispatch, params: { todoId } }) => dispatch({'type': DETAIL_TODOS.REQUEST, id: todoId})
})
@connect((state) => {
  return {
    todo: state.todoReducer && state.todoReducer.todo || []
  };
})

class TodoDetail extends React.Component {

  render() {
    const { todo } = this.props;
    return (
      <div className="todo-detail">
        <p>{todo.id}</p>
        <p>{todo.title}</p>
      </div>
    );
  }
}

export default TodoDetail;
