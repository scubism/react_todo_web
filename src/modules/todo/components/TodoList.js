import React from 'react';
import { provideHooks, trigger } from 'redial';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import Loader from 'react-loaders'
import { LIST_TODOS, CREATE_TODO } from '../actions';
import TodoListItem from './TodoListItem';
import TodoInlineForm from './TodoInlineForm'

@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch({type: LIST_TODOS.REQUEST})
})
@connect((state) => {
  return {
    todos: state.todoReducer.todos || [],
    fetchState: state.todoReducer.fetchState || {}
  };
})
export default class TodoList extends React.Component {
  render() {
    const { todos, fetchState } = this.props;

    const styles = {
      loader: {
        display: (fetchState[LIST_TODOS.BASE] && fetchState[LIST_TODOS.BASE].fetching) ? 'block' : 'none'
      }
    }
    return (
      <div className="todo-list">
        <div style={styles.loader}>
          <Loader type="line-scale" active="true"/>
        </div>
        <TodoInlineForm />
        {todos.map((todo, index) => {
          return (
            <div key={index}>
              <TodoListItem
                todo={todo}
                dispatch={this.props.dispatch}
                fetchState={this.props.fetchState}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
