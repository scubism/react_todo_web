import React from 'react'
import { provideHooks, trigger } from 'redial'
import { connect } from 'react-redux'
import { VIEW_TODO } from '../actions'
import TodoForm from './TodoForm'

@provideHooks({
  fetch: ({ dispatch, params: { todoId } }) => dispatch({type: VIEW_TODO.REQUEST, id: todoId})
})
@connect((state) => {
  return {
    todo: state.todoReducer && state.todoReducer.todo || null
  };
})

class TodoDetail extends React.Component {

  _renderEmpty() {
    return (
      <div className="todo-detail">
      </div>
    );
  }
  render() {
    const { todo } = this.props;
    if(!todo) {
      return this._renderEmpty.bind(this)();
    }
    return (
      <div className="todo-detail">
        <p>ID: {todo.id}</p>
        <p>Title: {todo.title}</p>
        <p>Due Date: {todo.due_date}</p>
        <p>Sort Order: {todo.sort_order}</p>
        <p>Group Id: {todo.todo_groups_id}</p>
        <p>Marked: {todo.marked}</p>
        <TodoForm 
          todo={todo} 
          dispatch={this.props.dispatch}
        />
      </div>
    );
  }
}

export default TodoDetail;
