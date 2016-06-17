import React from 'react'
import { Link } from 'react-router'
import Loader from 'react-loaders'
import { UPDATE_TODO, DELETE_TODO } from '../actions'

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        id: props.todo.id,
        title: props.todo.title,
        marked: props.todo.marked
      },
      editing: false,
      error: false
    }
  }

  componentDidUpdate() {
    this.refs.titleInput.focus()
  }

  componentWillReceiveProps(nextProps) {
    // Update section
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
        this.setState({error: false})
      } else if (error && !fetching) {
        this.setState({error: true})
      }
    }

    // Delete Section
    if(nextProps.fetchState[DELETE_TODO.BASE]) {
      const {error, fetching} = nextProps.fetchState[DELETE_TODO.BASE];
      if (!error && !fetching) {
        this.setState({editing: false})
        this.setState({error: false})
      } else if (error && !fetching) {
        this.setState({error: true})
      }
    }
  }

  _showInput() {
    this.setState({editing: true})
  }

  _isUnchanged(data) {
    let oldData = this.props.todo
    if(oldData.title !== data.title || oldData.marked !== data.marked) {
      return false
    }
    return true
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
          color: form.color,
          due_date: form.due_date,
          title: event.target.value,
          marked: form.marked
        }
        break;
    }

    if(this._isUnchanged(data)) {
      this.setState({editing: false})
      return;
    }

    if(this._validate(data)) {
      this.props.dispatch({type: UPDATE_TODO.REQUEST, data: data, id: form.id})
    } else {
      // Show error status
      this.setState({error: true})
    }
  }

  _deleteTodo() {
    const { form } = this.state
    this.props.dispatch({type: DELETE_TODO.REQUEST, id: form.id})
  }

  _handleChange(event) {
    let data = {
      id: this.state.form.id,
      marked: this.state.form.marked
    }
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
    const { todo, fetchState } = this.props;
    const { editing, form, error } = this.state;
    const styles = {
      fieldLabel: {
        display: !editing ? 'inline-block' : 'none',
        'text-decoration': (form.marked == 1) ? 'line-through' : 'none'
      },
      titleInput: {
        display: editing ? 'inline-block' : 'none',
        'border-color': error ? 'red' :'blue'
      },
      checked: (form.marked == 1) ? 'checked' : '',
      loader: {
        display: (fetchState[UPDATE_TODO.BASE] && fetchState[UPDATE_TODO.BASE].fetching || fetchState[DELETE_TODO.BASE] && fetchState[DELETE_TODO.BASE].fetching) ? 'block' : 'none'
      }
    }
    return (
      <div>
        <div style={styles.loader}>
          <Loader type="line-scale" active="true"/>
        </div>
        <input
          type="checkbox"
          checked={styles.checked}
          onClick={this._updateTodo.bind(this)}
        />
        <label style={styles.fieldLabel} onClick={this._showInput.bind(this)}>{todo.title} </label>
        <Link to={"/todos/" + todo.id}> >> </Link>
        <span onClick={this._deleteTodo.bind(this)} className='deleteBtn'> x </span>
        <input
	  ref="titleInput"
          type="text"
          style={styles.titleInput}
          value={form.title}
          onChange={this._handleChange.bind(this)}
          onBlur={this._updateTodo.bind(this)}
        />
      </div>
    );
  }
}

export default TodoListItem;
