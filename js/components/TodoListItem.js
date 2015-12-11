import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'

import TodoForm from './TodoForm'

const ItemTypes = {
  BOX: 'box'
};


const itemSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const itemTarget = {
  drop(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    props.dropItem(dragIndex);
  },

  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveItem(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

class _TodoListItem extends Component {

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
      nextProps.updating !== this.props.updating ||
      nextProps.isDragging !== this.props.isDragging
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

      const { isDragging, connectDragSource, connectDragPreview, connectDropTarget } = this.props;

      return connectDropTarget(connectDragPreview(
        <div style={{opacity:isDragging ? 0 : 1}} className="todo-list-item">
          {connectDragSource(
            <div className="drag-handle" />
          )}
          <label>{todo.title} - {moment(todo.due_date).format('L')}</label>
          <div className="actions">
            <Link to={"/todos/" + todo.id}>[view]</Link>
            <div className="action" onClick={this._onUpdateClick.bind(this)}>[update]</div>
            <div className="action" onClick={this._onDeleteClick.bind(this)}>[delete]</div>
          </div>
        </div>
      ));
    }
  }
}

const TodoListItem = DropTarget(
  ItemTypes.BOX, itemTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(
  DragSource(
    ItemTypes.BOX, itemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }))(_TodoListItem)
)

TodoListItem.propTypes = {
  todo: PropTypes.object.isRequired,
  updating: PropTypes.bool.isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
}

export default TodoListItem;
