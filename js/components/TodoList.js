import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import TodoListItem from './TodoListItem'

class _TodoList extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.todos !== this.props.todos ||
      nextProps.updatingTodoId !== this.props.updatingTodoId ||
      nextState.optimisticTodos !== this.state.optimisticTodos
    );
  }

  constructor(props, context) {
    super(props, context);
    this.moveItem = this.moveItem.bind(this);
    this.dropItem = this.dropItem.bind(this);
    this._getOptimisticTodos = this._getOptimisticTodos.bind(this);
    this.state = {optimisticTodos: null}
  }

  componentWillReceiveProps(nextProps) {
    this.state = {optimisticTodos: nextProps.todos}
  }

  dropItem(dragIndex) {
    let todos = this._getOptimisticTodos()

    this.props.moveTodo(todos[dragIndex], todos)
  }

  moveItem(dragIndex, hoverIndex) {
    let todos = this._getOptimisticTodos()

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

    this.setState({
      optimisticTodos: converted
    });
  }

  _getOptimisticTodos() {
    // Note that when go back by react router recreate this object without componentWillReceiveProps.
    let todos = this.state.optimisticTodos;
    if (todos == null) {
      todos = this.props.todos;
    }
    return todos;
  }

  render() {
    let {updatingTodoId, viewTodo, updateTodo, deleteTodo} = this.props;

    let todos = this._getOptimisticTodos()

    return (
      <div className="todo-list">
        {todos.map((todo, index) => {
          return (
            <TodoListItem
              key={todo.id}
              index={index}
              id={todo.id}
              todo={todo}
              moveItem={this.moveItem}
              dropItem={this.dropItem}

              updating={todo.id==updatingTodoId}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          );
        })}
      </div>
    );
  }
}
const TodoList = DragDropContext(HTML5Backend)(_TodoList)

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  updatingTodoId: PropTypes.any,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
}


export default TodoList;
