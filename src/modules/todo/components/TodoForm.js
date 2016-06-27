import React from 'react'
import { provideHooks } from 'redial'
import { reduxForm } from 'redux-form'
import Loader from 'react-loaders'
import moment from 'moment'
import DayPicker, { DateUtils } from 'react-day-picker'
import { CompactPicker } from 'react-color';
import { viewTodo } from '../actions';

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

class _TodoForm extends React.Component {

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

  render() {
    const { fields: {id, title, due_date, color, marked}, values, handleSubmit, fetchState } = this.props

    return(
      <div>id={values.id} title={values.title}</div>
    )
  }
}


@provideHooks({
  fetch: ({ dispatch, params: { id }, store }) => dispatch(viewTodo({id: id, store}))
})
@reduxForm({
  form: 'TodoUpdateForm',
  fields,
  validate
},
state => ({
  initialValues: state.todo.viewedTodo,
  fetchState: state.todo.fetchState,
}))
export class TodoUpdateForm extends _TodoForm {}
