import React from 'react'
import { Link } from 'react-router'
import Loader from 'react-loaders'
import autobind from 'autobind-decorator'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import { updateTodo, deleteTodo, focusTodo } from '../actions';
import { TodoInlineUpdateForm } from './TodoInlineForm'

const ItemTypes = {
  BOX: 'box'
};
const itemSource = {
  beginDrag(props) {
    props.beginDrag(props.id);
    return {
      id: props.id,
      index: props.index
    };
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      props.dropCanceled(props.id);
    }
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

@DropTarget(
  ItemTypes.BOX, itemTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource(
  ItemTypes.BOX, itemSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))
@autobind
export default class TodoListItem extends React.Component {

  _onMarkChange() {
    const { todo, dispatch } = this.props;
    dispatch(updateTodo({
      id: todo.id,
      data: Object.assign({}, todo, {marked: !todo.marked ? 1 : 0}),
      resolve: null,
      reject: () => { alert('update failed!'); }
    }));
  }

  render() {
    const { todo, editing, dispatch } = this.props;
    const { isDragging, connectDragSource, connectDragPreview, connectDropTarget } = this.props;

    let inner;
    if (editing) {
      inner = (<TodoInlineUpdateForm initialValues={todo}/>)
    } else {
      inner = (
        <div>
          {connectDragSource(<div className="drag-handle"/>)}
          <input className="toggle" type="checkbox" checked={todo.marked}
            onChange={this._onMarkChange} />
          <label onClick={() => {dispatch(focusTodo(todo))}}>{todo.title}</label>
          <button className="destroy" onClick={() => {dispatch(deleteTodo({id: todo.id}))}} />
          <Link className="to-detail" to={'/todos/' + todo.id} />
        </div>
      )
    }

    return connectDropTarget(connectDragPreview(
      <li
        className={todo.marked ? 'completed' : ''}
        style={{background: todo.color, opacity:isDragging ? 0 : 1}}
        >
        {inner}
      </li>
    ));
  }
}
