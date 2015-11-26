import React, { Component, PropTypes } from 'react'

class TodoForm extends Component {

  _onKeyDown(e) {
    const title = e.target.value.trim()
    if (e.which === 13) {
      this._save(title);
      if (!this.props.todo) {
        this.setState({ title: '' })
      }
    }
  }

  _onBlur(e) {
    if (this.props.todo) {
      this._save(e.target.value);
    }
  }

  _onChange(e) {
    this.setState({ title: e.target.value })
  }

  _save(title) {
    let newTodo = Object.assign({}, this.props.todo, {
      title: title,
    });
    this.props.onSave(newTodo)
  }

  constructor(props, context) {
    super(props, context);

    let {todo} = this.props;
    this.state = {
      title: todo ? todo.title : ''
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
        <input
          onSave={this.props.onSave}
          type="text"
          autoFocus="true"
          value={this.state.title}
          onBlur={this._onBlur.bind(this)}
          onChange={this._onChange.bind(this)}
          onKeyDown={this._onKeyDown.bind(this)}/>
      </div>
    );
  }
}

TodoForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  todo: PropTypes.object
}

export default TodoForm;
