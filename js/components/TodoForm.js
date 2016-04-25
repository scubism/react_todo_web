import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import DateWidget from '../widgets/DateWidget'
import SimpleColorPicker from '../widgets/react-simplecolorpicker'

class TodoForm extends Component {

  _submitForm() {
    let {title, due_date, color, marked} = this.state

    due_date = parseInt(due_date)

    this._save(title, due_date, color, marked)

    if (!this.props.todo) {
      this.setState({ title: '', due_date: '', color: '', marked: 0 })
    }
  }

  _onChange(e) {
    this.setState({[e.target.name]: e.target.value })
  }

  _onChangeDate(day) {
    this.setState({due_date: day})
  }

  _onChangeColor(color) {
    this.setState({color: color})
  }
  
  _onChangeMarked() {
    this.setState({marked: this.state.marked == 1 ? 0 : 1})
  }
  _save(title, due_date, color, marked) {
    let newTodo = Object.assign({}, this.props.todo, {
      title: title,
      due_date: due_date,
      color: color,
      marked: marked
    })
    this.props.onSave(newTodo)
  }

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

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.todo !== this.props.todo ||
      nextState !== this.state
    );
  }
  
  submitWhenEnter(event) {
    if (event.keyCode !== 13) {
      return;
    }
    event.preventDefault();
    this._submitForm();
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
          onKeyDown={this.submitWhenEnter.bind(this)}
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
        <input
          type="hidden"
          name="color"
          value={ this.state.color ? this.state.color : null }/>
        <SimpleColorPicker
          selectedColor={ this.state.color ? this.state.color : null }
          onChange={ this._onChangeColor.bind(this)}/>
        <input
          type="hidden"
          name="marked"
          value={ this.state.marked }/>
        <input
          type="checkbox"
          checked={ this.state.marked }
          onChange={ this._onChangeMarked.bind(this) }/>
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
