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
    todo: state.todoReducer && state.todoReducer.todo || null,
    fetchState: state.todoReducer || state.todoReducer.fetchState || {}
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
        <TodoForm 
          todo={todo} 
          dispatch={this.props.dispatch} 
          fetchState={this.props.fetchState}
        />
      </div>
    );
  }
}

export default TodoDetail;
