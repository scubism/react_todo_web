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
    todos: state.todoReducer && state.todoReducer.todos || [],
    CREATE_TODO: state.todoReducer || null
  };
})
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      form: { 
        title: '' 
      }
    }
  }

  componentDidUpdate() {
    this.refs.textbox.focus()
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps[CREATE_TODO.BASE]) {
      const {error, fetching} = nextProps[CREATE_TODO.BASE];
      if (!error && !fetching && this.state.editing) {
        this.setState({form: {'title': ''}})
        this.setState({editing: false})
      }
    }
  }

  _validate(data) {
    if(data.title == "") {
      return false
    }
    return true
  }

  _submitForm() {
    // Handle submit
    if(this._validate(this.state.form)) {
      this.props.dispatch({type: CREATE_TODO.REQUEST, data: this.state.form})
    }
  }

  _showForm() {
    this.setState({editing: true})
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
    const { editing } = this.state;
    const style = {
      space: {display: !editing ? 'block' : 'none'},
      textbox: {display: editing ? 'block' : 'none'}
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
