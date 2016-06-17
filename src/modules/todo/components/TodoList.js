import React from 'react';
import { provideHooks, trigger } from 'redial';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import Loader from 'react-loaders'
import { LIST_TODOS, CREATE_TODO } from '../actions';
import TodoListItem from './TodoListItem';

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
      editing: false,
      error: false,
      form: {
        title: ''
      }
    }
  }

  componentDidUpdate() {
    this.refs.titleInput.focus()
  }

  componentWillReceiveProps(nextProps) {
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

  _showCreateForm() {
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
    const { todos, fetchState } = this.props;
    const { editing, error } = this.state;
    const styles = {
      createBtn: {display: !editing ? 'block' : 'none'},
      createForm: {
        display: editing ? 'block' : 'none'
      },
      titleInput: {
        'border-color': error ? 'red' :'blue'
      },
      loader: {
        display: (fetchState[LIST_TODOS.BASE] && fetchState[LIST_TODOS.BASE].fetching) ? 'block' : 'none'
      }
    }
    return (
      <div className="todo-list">
        <div style={styles.loader}>
          <Loader type="line-scale" active="true"/>
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
        <div style={styles.createBtn} className="createBtn" onClick={this._showCreateForm.bind(this)}>&nbsp;+&nbsp;</div>
        <div style={styles.createForm} onSubmit={this._submitForm.bind(this)} >
          <input
	    id="title"
	    ref="titleInput"
            type="text"
            style={styles.titleInput}
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
