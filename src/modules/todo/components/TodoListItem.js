import React from 'react'
import { Link } from 'react-router'
import Loader from 'react-loaders'

import { focusTodo, deleteTodo } from '../actions';

export default class TodoListItem extends React.Component {

  render() {
    const { todo, dispatch } = this.props;

    return (
      <li className={todo.marked ? 'completed' : ''}>
        <input className="toggle" type="checkbox" />
        <label onClick={() => {dispatch(focusTodo(todo))}}>{todo.title}</label>
        <button className="destroy" onClick={() => {dispatch(deleteTodo({id: todo.id}))}} />
      </li>
    );
  }
}
