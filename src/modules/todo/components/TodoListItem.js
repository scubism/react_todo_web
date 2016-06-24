import React from 'react'
import { Link } from 'react-router'
import Loader from 'react-loaders'

import { updateTodo, deleteTodo } from '../actions';

export default class TodoListItem extends React.Component {

  render() {
    const { todo, dispatch } = this.props;

    return (
      <li className={todo.marked ? 'completed' : ''}>
        <input className="toggle" type="checkbox"
          onChange={() => {console.log("todo")}} />
        <label>{todo.title}</label>
        <button className="destroy" onClick={() => {dispatch(deleteTodo({id: todo.id}))}} />
      </li>
    );
  }
}
