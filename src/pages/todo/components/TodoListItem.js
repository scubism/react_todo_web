import React from 'react'
import { Link } from 'react-router'
import { UPDATE_TODO } from '../actions'

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: { 
        id: props.todo.id,
        title: props.todo.title,
        marked: props.todo.marked
      },
      editing: false
    }
  }
  
  componentDidUpdate() {
    this.refs.textbox.focus()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.fetchState[UPDATE_TODO.BASE]) {
      const {error, fetching} = nextProps.fetchState[UPDATE_TODO.BASE];
      if (!error && !fetching) {
        this.setState({
          form: {
            id: nextProps.todo.id,
            title: nextProps.todo.title,
            marked: nextProps.todo.marked
          }
        })
        this.setState({editing: false})
      }
    }
  }

  _showInput() {
    this.setState({editing: true})
  }

  _updateTodo(event) {
    const { form } = this.state
    let data
    switch (event.target.type) {
      case 'checkbox':
        data = {
          id: form.id,
          title: form.title,
          marked: event.target.checked ? 1 : 0
        }
        break;
      case 'text':
        data = {
          id: form.id,
          title: event.target.value
        }
        break;
    }
    if(this._validate(data)) {
      this.props.dispatch({type: UPDATE_TODO.REQUEST, data: data, id: form.id})
    }
  }

  _handleChange(event) {
    let data = {
      id: this.state.form.id
    }
    data[event.target.id] = event.target.value
    this.setState({form: data})
  }

  _validate(data) {
    if(data.title == "") {
      this.setState({editing: false})
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
        'text-decoration': (form.marked == 1) ? 'line-through' : 'none'
      },
      textbox: {display: editing ? 'inline-block' : 'none'},
      checked: (form.marked == 1) ? 'checked' : ''
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
