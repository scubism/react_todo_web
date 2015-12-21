import React, { Component, PropTypes } from 'react'
import DateWidget from '../widgets/DateWidget'
import moment from 'moment'

class TodoForm extends Component {

  _submitForm() {
    let {title, due_date} = this.state

    due_date = parseInt(due_date)

    this._save(title, due_date)

    if (!this.props.todo) {
      this.setState({ title: '', due_date: '' })
    }
  }

  _onChange(e) {
    this.setState({[e.target.name]: e.target.value })
  }

  _onChangeDate(day) {
    this.setState({due_date: day})
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
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.todo !== this.props.todo ||
      nextState !== this.state
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
        Due Date: <span>{this.state.due_date ? moment.unix(this.state.due_date).format('L') : ''}</span>
        <input
          type="hidden"
          name="due_date"
          value={ this.state.due_date ? this.state.due_date : '' }/>
        <br />
        <DateWidget
          selected={ this.state.due_date ? this.state.due_date : null }
          onChange={ this._onChangeDate.bind(this) }/>
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
