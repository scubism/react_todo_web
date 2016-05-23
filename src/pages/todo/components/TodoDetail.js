import React from 'react';
import { provideHooks, trigger } from 'redial';
import { connect } from 'react-redux';
import { DETAIL_TODOS } from '../actions';

@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch({'type': DETAIL_TODOS.REQUEST})
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
        TODO
      </div>
    );
  }
}

export default TodoDetail;
