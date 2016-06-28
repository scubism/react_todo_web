import React from 'react';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import Loader from 'react-loaders'
import { listTodos, createTodo, updateTodo, deleteTodo, moveTodo } from '../actions';
import { TodoInlineCreateForm } from './TodoInlineForm'
import TodoListItem from './TodoListItem';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@provideHooks({
  fetch: ({ dispatch, store }) => dispatch(
    listTodos({
      reject: (e) => {alert(e);},
      store
    }))
})
@connect((state) => {
  return {
    todos: state.todo.todos,
    fetchState: state.todo.fetchState,
    focusedTodo: state.todo.focusedTodo,
  };
})
@DragDropContext(HTML5Backend)
export default class TodoList extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {stagedTodos: null}
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.todos !== nextProps.todos) {
      this.state = Object.assign({}, this.state, {stagedTodos: nextProps.todos});
    }
  }

  _beginDrag(dragIndex) {
    this.setState({stagedTodos: this.props.todos});
  }

  _moveItem(dragIndex, hoverIndex) {
    let todos = this.state.stagedTodos || this.props.todos;

    let converted = todos.map(
      (todo, index) => {
        if (index == dragIndex) {
          return todos[hoverIndex];
        } else if (index == hoverIndex) {
          return todos[dragIndex];
        } else {
          return todo
        }
      });
    this.setState({stagedTodos: converted});
  }

  _dropItem(dragIndex) {
    let todos = this.state.stagedTodos;
    this.props.dispatch(moveTodo(todos[dragIndex], todos, {
      reject: ((e) => { alert(e); this.setState({stagedTodos: null});}).bind(this),
    }));
  }

  _dropCanceled(dragIndex) {
    this.setState({stagedTodos: null});
  }

  render() {
    const { todos, fetchState, focusedTodo, dispatch } = this.props;
    let stagedTodos = this.state.stagedTodos || todos;
    const _beginDrag = this._beginDrag.bind(this);
    const _dropCanceled = this._dropCanceled.bind(this);
    const _moveItem = this._moveItem.bind(this);
    const _dropItem = this._dropItem.bind(this);

    return (
      <div className="todo-list">
        <div key="loader"
          style={{display: (
            fetchState[listTodos].fetching ||
            fetchState[createTodo].fetching ||
            fetchState[updateTodo].fetching ||
            fetchState[deleteTodo].fetching
          ) ? 'block' : 'none'}}
          className="loader"
          >
          <Loader type="line-scale" active="true"/>
        </div>
        <TodoInlineCreateForm key="create-form" />
        <ul key="items" className="todo-list-items">
          {stagedTodos.map((todo, index) => {
            return (
              <TodoListItem
                key={todo.id}
                index={index}
                todo={todo}
                dispatch={dispatch}
                beginDrag={_beginDrag}
                dropCanceled={_dropCanceled}
                moveItem={_moveItem}
                dropItem={_dropItem}
                editing={focusedTodo && focusedTodo.id == todo.id}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
