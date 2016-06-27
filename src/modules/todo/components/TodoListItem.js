import React from 'react'
import { Link } from 'react-router'
import Loader from 'react-loaders'

import { updateTodo, deleteTodo, focusTodo } from '../actions';

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
    const { todo, dispatch } = this.props;
    return (
      <li className={todo.marked ? 'completed' : ''}>
        <input className="toggle" type="checkbox" checked={todo.marked}
          onChange={this._onMarkChange.bind(this)} />
        <label onClick={() => {dispatch(focusTodo(todo))}}>{todo.title}</label>
        <button className="destroy" onClick={() => {dispatch(deleteTodo({id: todo.id}))}} />
        <Link className="to-detail" to={'/todos/' + todo.id} />
      </li>
    );
  }
}
