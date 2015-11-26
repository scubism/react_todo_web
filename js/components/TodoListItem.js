import React, { Component, PropTypes } from 'react'

import TodoForm from './TodoForm'

class TodoListItem extends Component {

  _onViewClick() {
    this.props.viewTodo(this.props.todo, true);
  }

  _onUpdateClick() {
    this.props.updateTodo(this.props.todo, true);
  }

  _onSaveTodo(newTodo) {
    this.props.updateTodo(newTodo, false);
  }

  _onDeleteClick() {
    this.props.deleteTodo(this.props.todo);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.todo !== this.props.todo ||
      nextProps.updating !== this.props.updating
    );
  }

  render() {
    let {todo, updating} = this.props;
    if (updating) {
      return (
        <TodoForm todo={todo}
          onSave={this._onSaveTodo.bind(this)}/>
      );
    } else {
      return (
        <div className="todo-list-item">
          <label>{todo.title}</label>
          <div className="actions">
            <div className="action" onClick={this._onViewClick.bind(this)}>[view]</div>
            <div className="action" onClick={this._onUpdateClick.bind(this)}>[update]</div>
            <div className="action" onClick={this._onDeleteClick.bind(this)}>[delete]</div>
          </div>
        </div>
      );
    }
  }
}

TodoListItem.propTypes = {
  todo: PropTypes.object.isRequired,
  updating: PropTypes.bool.isRequired,
  viewTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
}

export default TodoListItem;
