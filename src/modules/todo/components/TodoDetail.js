import React from 'react'
import { provideHooks } from 'redial'
import { reduxForm } from 'redux-form'
import Loader from 'react-loaders'
import { viewTodo } from '../actions';
import { connect } from 'react-redux';
import { TodoUpdateForm } from './TodoForm';
import { Link } from 'react-router'

@provideHooks({
  fetch: ({ dispatch, params: { id }, store }) => dispatch(viewTodo({id: id, store}))
})
@connect((state) => {
  return {
    viewedTodo: state.todo.viewedTodo,
    fetchState: state.todo.fetchState,
  };
})
export default class TodoDetail extends React.Component {
  render() {
    const { viewedTodo, fetchState, history } = this.props;
    if (fetchState[viewTodo].fetching) {
      return (
        <div key="loader" className="loader">
          <Loader type="line-scale" active="true"/>
        </div>
      )
    }
    if (!viewedTodo) {
      return <div />
    }
    return(
      <div className="todo-detail">
        <Link  className="back-link" to={"/todos"}>{"< Back"}</Link>
        <h1>{viewedTodo.title}</h1>
        <hr />
        <TodoUpdateForm history={history}/>
      </div>
    )
  }
}
