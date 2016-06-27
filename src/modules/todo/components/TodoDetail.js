import React from 'react'
import { provideHooks } from 'redial'
import { reduxForm } from 'redux-form'
import Loader from 'react-loaders'
import { viewTodo } from '../actions';
import { connect } from 'react-redux';

//import { TodoUpdateForm } from './TodoForm';

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
    const { viewedTodo, fetchState } = this.props;
    if (!viewedTodo) {
      return <div />
    }
    return(
      <div>id={viewedTodo.id} title={viewedTodo.title} !</div>
    )
  }
}
