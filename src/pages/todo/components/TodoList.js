import React from 'react';
import { provideHooks, trigger } from 'redial';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { LIST_TODOS, CREATE_TODO } from '../actions';
import TodoListItem from './TodoListItem';

@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch({type: LIST_TODOS.REQUEST})
})
@connect((state) => {
  return {
    todos: state.todoReducer && state.todoReducer.todos || []
  };
})
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      form: { 
        title: '' 
      }
    }
  }

  componentDidUpdate() {
    this.refs.textbox.focus()
  }

  _validateData(data) {
    if(data.title == "") {
      return false
    }
    return true
  }

  _submitForm() {
    // Handle submit
    if(this._validateData(this.state.form)) {
      this.props.dispatch({type: CREATE_TODO.REQUEST, data: this.state.form})
    }
    this.setState({form: {'title': ''}})
    this.setState({isEditing: false})
  }

  _showForm() {
    this.setState({isEditing: true})
  }

  _submitWhenEnter(event) {
    if (event.keyCode !== 13) {
      return;
    }
    event.preventDefault();
    this._submitForm();
  }

  _handleChange(event) {
    let data = {}
    data[event.target.id] = event.target.value
    this.setState({form: data})
  }

  render() {
    const { todos } = this.props;
    const { isEditing } = this.state;
    const style = {
      space: {display: !isEditing ? 'block' : 'none'},
      textbox: {display: isEditing ? 'block' : 'none'}
    }
    return (
      <div className="todo-list">
        {todos.map((todo, index) => {
          return (
            <div key={index}>
              <TodoListItem 
                todo={todo}
              />
            </div>
          );
        })}
        <span style={style.space} className="space-click" onClick={this._showForm.bind(this)}></span>
        <div ref="todoForm" style={style.textbox} onSubmit={this._submitForm.bind(this)} >
          <input 
            id="title"
            type="text" 
            ref="textbox" 
            onBlur={this._submitForm.bind(this)} 
            onKeyDown={this._submitWhenEnter.bind(this)} 
            onChange={this._handleChange.bind(this)}
            value={this.state.form.title}
          />
        </div>
      </div>
    );
  }
}

export default TodoList;
