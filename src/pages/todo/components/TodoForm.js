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

const fields = [
  'id', 
  'title', 
  'due_date', 
  'color', 
  'marked', 
]

const validate = values => {
  const errors = {}
  if (values.title == "") {
    errors.title = 'Required'
  }
  return errors
}

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

  _handleCheckbox(event) {
    let data = this.state.form
    data[event.target.id] = event.target.checked ? 1 : 0
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

  _handleSubmit(props) {
    let data = this.state.form
    data['title'] = props.title
    this.props.dispatch({type: UPDATE_TODO.REQUEST, data: data, id: this.state.form.id})
  }

  render() {
    const { fields: {id, title, due_date, color, marked}, handleSubmit } = this.props
    let todo = this.state.form
    let error = this.state.error
    let styles = {
      form: {'border-color': error ? 'red' :'blue'}
    }
    return(
      <div>
        <p>ID: {id.value}</p>
        <p>Title: {title.value}</p>
        <p>Due Date: {due_date.value}</p>
        <p>Marked: {marked.value}</p>
        <p>Color: {color.value}</p>
        <form onSubmit={handleSubmit(props => this._handleSubmit(props))} style={styles.form}>
          <input
            id="title"
            type="text"
            autoFocus="true"
            {...title}
            name="title"
          />
          <div>{title.touched ? title.error : ''}</div>
          <br />
          Due Date: <span>{todo.due_date ? moment.unix(todo.due_date).format('L') : ''}</span>
          <br />
          <DayPicker 
            {...due_date} 
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
            onChange={this._handleCheckbox.bind(this)} 
          />
          <br />
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    )
  }
}
TodoForm = reduxForm({
  form: 'TodoForm',
  fields,
  validate
},// Map State to Props
state => ({
  initialValues: state.todoReducer.todo
}),
{ }// Map Dispatch to Props
)(TodoForm)

export default TodoForm
