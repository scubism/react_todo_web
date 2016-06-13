import React from 'react'
import {reduxForm} from 'redux-form'
import moment from 'moment'
import DayPicker, { DateUtils } from 'react-day-picker'
import { CompactPicker } from 'react-color';
import { UPDATE_TODO } from '../actions'

// Library styling
if (process.env.BROWSER) {
  require("react-day-picker/lib/style.css")
}

export const fields = [
  'id', 
  'title', 
  'due_date', 
  'color', 
  'marked', 
]

class TodoForm extends React.Component {
  constructor(props) {
    super(props)
    let {todo} = this.props
    this.state = {
      form: {
        id: todo ? todo.id : '',
        title: todo ? todo.title : '',
        due_date: todo ? todo.due_date : '',
        color: todo ? todo.color : '',
        marked: todo ? todo.marked : 0
      },
      error: false
    }
  }

// Update state when change record detail
  componentWillUpdate(nextProps, nextState) {
    if(this.props !== nextProps) {
      let { todo } = nextProps
      this.setState({
        form: {
          id: todo ? todo.id : '',
          title: todo ? todo.title : '',
          due_date: todo ? todo.due_date : '',
          color: todo ? todo.color : '',
          marked: todo ? todo.marked : 0
        },
        error: false
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.fetchState[UPDATE_TODO.BASE]) {
      const {error, fetching} = nextProps.fetchState[UPDATE_TODO.BASE];
      if (!error && !fetching) {
        this.setState({
          form: {
            id: nextProps.todo.id,
            title: nextProps.todo.title,
            due_date: nextProps.todo.due_date,
            color: nextProps.todo.color,
            marked: nextProps.todo.marked
          }
        })
        this.setState({error: false})
      } else if (error && !fetching) {
        this.setState({error: true})
      }
    }
  }

  _isUnchanged(data) {
    let oldData = this.props.todo
    if(oldData.title !== data.title || 
      oldData.due_date !== data.due_date || 
      oldData.color !== data.color || 
      oldData.marked !== data.marked) {
      return false
    }
    return true
  }

  _handleInput(event) {
    let data = this.state.form
    switch (event.target.type) {
      case 'checkbox':
        data[event.target.id] = event.target.checked ? 1 : 0
        break;
      case 'text':
        data[event.target.id] = event.target.value
        break;
    }
    this.setState({form: data})
  }

  _handleDay(event, day) {
    let data = this.state.form
    data['due_date'] = day.getTime()/1000
    this.setState({form: data})
  }

  _handleColor(color) {
    let data = this.state.form
    data['color'] = color.hex
    this.setState({form: data})
  }

  _handleSubmit() {
    if(this._isUnchanged(this.state.form)) {
      return;
    }
    if(this._validate(this.state.form)) {
      this.props.dispatch({type: UPDATE_TODO.REQUEST, data: this.state.form, id: this.state.form.id})
    } else {
      // Show error status
      this.setState({error: true})
      return false
    }
  }

  _validate(data) {
    if(data.title == "") {
      return false
    }
    return true
  }

  render() {
    const { fields: {id, title, due_date, color, marked} } = this.props
    let todo = this.state.form
    let error = this.state.error
    console.log(error)
    let styles = {
      form: {'border-color': error ? 'red' :'blue'}
    }
    return(
      <form onSubmit={this._handleSubmit.bind(this)} style={styles.form}>
        <input
          id="title"
          type="text"
          autoFocus="true"
          value={ todo.title }
          name="title"
          onChange={this._handleInput.bind(this)}
        />
        <br />
        Due Date: <span>{todo.due_date ? moment.unix(todo.due_date).format('L') : ''}</span>
        <br />
        <DayPicker 
          modifiers={{
            selected: day => DateUtils.isSameDay(moment.unix(todo.due_date).toDate(), day)
          }} 
          initialMonth={ moment.unix(todo.due_date).toDate() }
          onDayClick={ this._handleDay.bind(this) }
        />
        <br />
        <CompactPicker
          color={ todo.color ? todo.color : null } 
          onChange={this._handleColor.bind(this)}
        />
        Marked: 
        <input
          id="marked"
          type="checkbox"
          checked={ (todo.marked==1) ? 'checked' : '' }
          onChange={this._handleInput.bind(this)}
        />
        <br />
        <button type="submit">
          Submit
        </button>
      </form>
    )
  }
}
TodoForm = reduxForm({
  form: 'TodoForm',
  fields
},// Map State to Props
state => ({state}),
{ }// Map Dispatch to Props
)(TodoForm)

export default TodoForm