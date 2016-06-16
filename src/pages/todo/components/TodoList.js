import React from 'react';
import { provideHooks, trigger } from 'redial';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import Loader from 'react-loaders'
import { LIST_TODOS, CREATE_TODO } from '../actions';
import TodoListItem from './TodoListItem';

if (process.env.BROWSER) {
  require("loaders.css/loaders.min.css")
}

@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch({type: LIST_TODOS.REQUEST})
})
@connect((state) => {
  return {
    todos: state.todoReducer && state.todoReducer.todos || [],
    fetchState: state.todoReducer || state.todoReducer.fetchState || {}
  };
})
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      editing: false,
      error: false,
      form: {
        title: ''
      }
    }
  }

  componentDidUpdate() {
    this.refs.textbox.focus()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.fetchState[LIST_TODOS.BASE].fetching) {
      this.setState({loader: true})
    } else {
      this.setState({loader: false})
    }
    if(nextProps.fetchState[CREATE_TODO.BASE]) {
      const {error, fetching} = nextProps.fetchState[CREATE_TODO.BASE];
      if (!error && !fetching && this.state.editing) {
        this.setState({form: {'title': ''}})
        this.setState({editing: false})
      } else if (error && !fetching && this.state.editing) {
        this.setState({error: true})
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
    } else {
      // Show error status
      this.setState({error: true})
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
    const { editing, error, loader } = this.state;
    const styles = {
      space: {display: !editing ? 'block' : 'none'},
      form: {
        display: editing ? 'block' : 'none'
      },
      textbox: {
        'border-color': error ? 'red' :'blue'
      },
      loader: {
        display: loader ? 'block' : 'none'
      }
    }
    return (
      <div className="todo-list">
        <div style={styles.loader}>
          <Loader type="pacman" active="true"/>
        </div>
        {todos.map((todo, index) => {
          return (
            <div key={index}>
              <TodoListItem
                todo={todo}
                dispatch={this.props.dispatch}
                fetchState={this.props.fetchState}
              />
            </div>
          );
        })}
        <span style={styles.space} className="space-click" onClick={this._showForm.bind(this)}></span>
        <div ref="todoForm" style={styles.form} onSubmit={this._submitForm.bind(this)} >
          <input
            id="title"
            type="text"
            ref="textbox"
            style={styles.textbox}
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
