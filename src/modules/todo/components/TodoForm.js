import React from 'react'
import {reduxForm} from 'redux-form'
import Loader from 'react-loaders'
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

@reduxForm({
  form: 'TodoForm',
  fields,
  validate
},
state => ({
  initialValues: state.todoReducer.todo
}))
export default class TodoForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      error: false,
      isSubmit: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.fetchState[UPDATE_TODO.BASE]) {
      const {error, fetching} = nextProps.fetchState[UPDATE_TODO.BASE];
      if (!error && !fetching && this.state.editing && this.state.isSubmit) {
        this.setState({editing: false})
        this.setState({isSubmit : false})
      } else if (error && !fetching && this.state.editing) {
        this.setState({error: true})
      }
    }
  }

  _handleCheckbox(event) {
    let { fields: {marked} } = this.props
    let data = event.target.checked ? 1 : 0
    marked.onChange(data)
  }

  _handleDay(event, data) {
    let { fields: {due_date} } = this.props
    due_date.onChange(data.getTime()/1000)
  }

  _handleColor(data) {
    let { fields: {color} } = this.props
    color.onChange(data.hex)
  }

  _showForm() {
    this.setState({editing : true})
  }

  _handleSubmit(data) {
    if(data.marked) {
      data['marked'] = 1
    } else {
      data['marked'] = 0
    }
    this.setState({isSubmit : true})
    this.props.dispatch({type: UPDATE_TODO.REQUEST, data: data, id: data.id})
  }

  render() {
    const { fields: {id, title, due_date, color, marked}, handleSubmit, fetchState } = this.props
    const { editing } = this.state
    const styles = {
      form: {display: editing ? 'block' : 'none'},
      info: {display: !editing ? 'block' : 'none'},
      loader: {display: (fetchState[UPDATE_TODO.BASE] && fetchState[UPDATE_TODO.BASE].fetching) ? 'block' : 'none'}
    }
    return(
      <div>
        <div style={styles.loader}>
          <Loader type="line-scale" active="true"/>
        </div>
        <b>{this.state.error ? 'Has error during fetching!!!' : ''}</b>
        <div style={styles.info}>
          <p>ID: {id.value}</p>
          <p>Title: {title.value}</p>
          <p>Due Date: {due_date.value}</p>
          <p>Marked: {marked.value ? 1 : 0}</p>
          <p>Color: {color.value}</p>
          <button onClick={this._showForm.bind(this)}>EDIT</button>
        </div>
        <form onSubmit={handleSubmit(data => this._handleSubmit(data))} style={styles.form}>
          <input
            id="title"
            type="text"
            autoFocus="true"
            {...title}
            name="title"
          />
          <div>{title.touched ? title.error : ''}</div>
          <br />
          Due Date: <span>{due_date.value ? moment.unix(due_date.value).format('L') : ''}</span>
          <br />
          <DayPicker 
            {...due_date} 
            modifiers={{
              selected: day => DateUtils.isSameDay(moment.unix(due_date.value ? due_date.value : Date.now()/1000 ).toDate(), day)
            }} 
            initialMonth={ moment.unix(due_date.value ? due_date.value : Date.now()/1000).toDate() } 
            onDayClick={ this._handleDay.bind(this) }
          />
          <br />
          <CompactPicker
            {...color}
            color={ color.value ? color.value : '#000000' } 
            onChange={this._handleColor.bind(this)}
          />
          Marked: 
          <input
            {...marked}
            id="marked" 
            type="checkbox" 
            checked={ (marked.value == 1) ? 'checked' : '' } 
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
