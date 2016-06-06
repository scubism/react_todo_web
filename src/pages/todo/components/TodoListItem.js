import React from 'react'
import { Link } from 'react-router'
import { UPDATE_TODO } from '../actions'

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: { 
        title: this.props.todo.title
      },
      editing: false
    }
  }
  
  componentDidUpdate() {
    this.refs.textbox.focus()
  }

  _showInput() {
    this.setState({editing: true})
  }

  _updateTodo(event) {
    const { todo } = this.props
    let data
    switch (event.target.type) {
      case 'checkbox':
        data = {
          title: todo.title,
          marked: (todo.marked == 1) ? 0 : 1
        }
        break;
      case 'text':
        data = {title: event.target.value}
        break;
    }
    if(this._validate(this.state.form)) {
      this.props.dispatch({type: UPDATE_TODO.REQUEST, data: data, id: todo.id})
    }
    this.setState({editing: false})
  }

  _handleChange(event) {
    let data = {}
    data[event.target.id] = event.target.value
    this.setState({form: data})
  }

  _validate(data) {
    if(data.title == "") {
      return false
    }
    return true
  }

  render() {
    const { todo } = this.props;
    const { editing, form } = this.state;
    const style = {
      label: {
        display: !editing ? 'inline-block' : 'none',
        'text-decoration': (todo.marked == 1) ? 'line-through' : 'none'
      },
      textbox: {display: editing ? 'inline-block' : 'none'},
      checked: (todo.marked == 1) ? 'checked' : ''
    }
    return (
      <div>
        <input 
          id='marked' 
          ref='marked' 
          type="checkbox" 
          checked={style.checked} 
          onClick={this._updateTodo.bind(this)} 
        />
      <label className='label' style={style.label} onClick={this._showInput.bind(this)}>{todo.title} <Link to={"/todos/" + todo.id}> >> </Link></label>
        <input 
          id="title" 
          ref='textbox' 
          type="text" 
          style={style.textbox} 
          value={form.title} 
          onChange={this._handleChange.bind(this)} 
          onBlur={this._updateTodo.bind(this)} 
        />
      </div>
    );
  }
}

export default TodoListItem;
