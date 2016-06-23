import React from 'react';
import { provideHooks, trigger } from 'redial';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import Loader from 'react-loaders'
import { LIST_TODOS, CREATE_TODO } from '../actions';
import TodoListItem from './TodoListItem';

@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch({type: LIST_TODOS.REQUEST})
})
@connect((state) => {
  return {
    todos: state.todoReducer && state.todoReducer.todos || [],
    fetchState: state.todoReducer || state.todoReducer.fetchState || {}
  };
})
export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    // TODO to redux form
    this.state = {
      error: false,
    }
  }

  componentDidUpdate() {
    this.refs.titleInput.focus()
  }

  _validate(values) {
    if(values.title == "") {
      return false
    }
    return true
  }

  _createTodo() {
    let values = {
      title: this.refs.titleInput.value
    }
    if(this._validate(values)) {
      this.setState({error: false});
      this.props.dispatch({
        type: CREATE_TODO.REQUEST,
        data: values,
        resolve: (() => { this.refs.titleInput.value = ""; }).bind(this),
        reject: (() => { this.setState({error: true}); }).bind(this),
      })
    } else {
      // Show error status
      this.setState({error: true})
    }
  }

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
        <div>
          <input
      	    ref="titleInput"
            className={"new-todo" + (this.state.error ? " error" : "")}
            style={styles.titleInput}
            placeholder="What needs to be done?"
            onBlur={this._createTodo.bind(this)}
            onKeyDown={(() => {
              if (event.keyCode == 13) {
                event.preventDefault();
                this._createTodo.bind(this)();
              }
            }).bind(this)}
          />
        </div>
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
