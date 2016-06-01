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
      hidden: true,
      form: { name: '' }
    }
  }

  componentDidUpdate() {
    this.refs.textbox.focus()
  }

  _submitForm(event) {
    // Handle submit
    console.log(event);
    this.setState({form: {name: ''}})
    this.setState({hidden: true})
  }

  _showForm() {
    this.setState({hidden: false})
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
    const { hidden } = this.state;
    const style = {
      display: hidden ? 'none' : 'block'
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
        <span onClick={this._showForm.bind(this)}>Add</span>
        <div ref="todoForm" style={style} onSubmit={this._submitForm.bind(this)} >
          <input 
            id="name"
            type="text" 
            ref="textbox" 
            onBlur={this._submitForm.bind(this)} 
            onKeyDown={this._submitWhenEnter.bind(this)} 
            onChange={this._handleChange.bind(this)}
            value={this.state.form.name}
          />
        </div>
      </div>
    );
  }
}

export default TodoList;
