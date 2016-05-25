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
        <p>ID: {todo.id}</p>
        <p>Title: {todo.title}</p>
        <p>Due Date: {todo.due_date}</p>
        <p>Sort Order: {todo.sort_order}</p>
        <p>Group Id: {todo.todo_groups_id}</p>
        <p>Marked: {todo.marked}</p>
      </div>
    );
  }
}

export default TodoDetail;
