import React from 'react'
import { provideHooks, trigger } from 'redial'
import Loader from 'react-loaders'
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
    const { todo, fetchState } = this.props;
    const styles = {
      loader: {display: (fetchState[VIEW_TODO.BASE] && fetchState[VIEW_TODO.BASE].fetching) ? 'block' : 'none'}
    }
    if(!todo) {
      return this._renderEmpty.bind(this)();
    }
    return (
      <div className="todo-detail">
        <div style={styles.loader}>
          <Loader type="line-scale" active="true"/>
        </div>
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
