import React from 'react'
import { Link } from 'react-router'
import Loader from 'react-loaders'
import { UPDATE_TODO, DELETE_TODO } from '../actions'

export default class TodoListItem extends React.Component {

  _updateTodo(event) {
  }

  _deleteTodo() {
    //this.props.dispatch({type: DELETE_TODO.REQUEST, id: form.id})
  }

  render() {
    const { todo, fetchState } = this.props;
    const styles = {
      fieldLabel: {
        //display: !editing ? 'inline-block' : 'none',
        //'text-decoration': (form.marked == 1) ? 'line-through' : 'none'
      },
      titleInput: {
        //display: editing ? 'inline-block' : 'none',
        //'border-color': error ? 'red' :'blue'
      },
      //checked: (form.marked == 1) ? 'checked' : '',
      color: {
        'background-color': todo.color
      }
    }
    return (
      <div>
        <span className='colorSymbol' style={styles.color}>
        </span>
        <input
          type="checkbox"
          checked={styles.checked}
          //onClick={this._updateTodo.bind(this)}
        />
        <label
          style={styles.fieldLabel}
          //onClick={this._showInput.bind(this)}
          >{todo.title} </label>
        <Link to={"/todos/" + todo.id}> >> </Link>
        <span onClick={this._deleteTodo.bind(this)} className='deleteBtn'> x </span>
      </div>
    );
  }
}
