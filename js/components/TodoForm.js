import React, { Component, PropTypes } from 'react'
import DateWidget from '../widgets/DateWidget'
import moment from 'moment'
import { deepEqual } from 'assert'

class TodoForm extends Component {

  _submitForm() {
    let {title, due_date} = this.state

    this._save(title, due_date)

    if (!this.props.todo) {
      this.setState({ title: '', due_date: '' })
    }
  }

  _onChange(e) {
    this.setState({[e.target.name]: e.target.value })
  }

  _save(title, due_date) {
    let newTodo = Object.assign({}, this.props.todo, {
      title: title,
      due_date: due_date
    })
    this.props.onSave(newTodo)
  }

  _setSelectedDate(date) {
    this.setState({due_date: date})
  }

  constructor(props, context) {
    super(props, context);

    let {todo} = this.props;

    this.state = {
      title: todo ? todo.title : '',
      due_date: todo ? todo.due_date : ''
    }

    this._setSelectedDate = this._setSelectedDate.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !isObjectEqual(nextProps.todo, this.props.todo) ||
      !isObjectEqual(nextState, this.state)
    );
  }

  render() {
    return (
      <div className="todo-form">
        Title:
        <input
          onSave={ this.props.onSave }
          type="text"
          autoFocus="true"
          value={ this.state.title }
          name="title"
          onChange={this._onChange.bind(this)}/>
        <br />
        Due Date: <span>{this.state.due_date ? moment(this.state.due_date).format('L') : ''}</span>
        <input
          type="hidden"
          name="due_date"
          value={ this.state.due_date ? this.state.due_date : '' }
          autoFocus="true"
          onChange={ this._onChange.bind(this) }/>
        <br />
        <DateWidget
          inputValue={ this.state.due_date ? this.state.due_date : '' }
          setSelectedDate={ this._setSelectedDate }/>
        <br />
        <button
          onSave={ this.props.onSave }
          onClick={ this._submitForm.bind(this) }>
          Submit
        </button>
      </div>
    );
  }
}

TodoForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  todo: PropTypes.object
}

export default TodoForm;

function isObjectEqual(a, b) {
  try {
    deepEqual(a, b);
  } catch (error) {
    if (error.name === "AssertionError") {
      return false;
    }
    throw error;
  }
  return true;
}
