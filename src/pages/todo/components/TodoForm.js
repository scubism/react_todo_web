import React from 'react'
import {reduxForm} from 'redux-form'
import moment from 'moment'
import DayPicker from 'react-day-picker'
import ColorPicker from 'react-simple-colorpicker'
import { UPDATE_TODO } from '../actions'


class TodoForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    let {todo} = this.props;
    this.state = {
      title: todo ? todo.title : '',
      due_date: todo ? todo.due_date : '',
      color: todo ? todo.color : '',
      marked: todo ? todo.marked : 0
    }
  }
  render() {
    return(
      <form>
        <input
          type="text"
          autoFocus="true"
          value={ this.state.title }
          name="title"/>
        <br />
        Due Date: <span>{this.state.due_date ? moment.unix(this.state.due_date).format('L') : ''}</span>
        <input
          type="hidden"
          name="due_date"
          value={ this.state.due_date ? this.state.due_date : '' }/>
        <br />
        <DayPicker
          selected={ this.state.due_date ? this.state.due_date : null } 
          />
        <br />
        <input
          type="hidden"
          name="color"
          value={ this.state.color ? this.state.color : null }/>
        <ColorPicker
          selectedColor={ this.state.color ? this.state.color : null }/>
        <input
          type="checkbox"
          checked={ this.state.marked }/>
        <button>
          Submit
        </button>
      </form>
    )
  }
}

export default TodoForm