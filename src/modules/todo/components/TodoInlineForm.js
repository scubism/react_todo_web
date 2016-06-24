import React from 'react'
import { reduxForm } from 'redux-form'
import Loader from 'react-loaders'
import { createTodo } from '../actions'

const fields = [
  'id',
  'title',
  'due_date',
  'color',
  'marked',
]

@reduxForm({
  form: 'TodoInlineForm',
  fields
})
export default class TodoInlineForm extends React.Component {

  componentDidMount() {
    this.refs.titleInput.focus();
  }

  _handleSubmit(values) {
    const { resetForm } = this.props;
    return new Promise((resolve, reject) => {
      if (!values.title) {
        reject({title: 'Please input a title.', _error: "Submit validation failed."});
        return;
      }

      if (!values.id) {
        this.props.dispatch(createTodo({
          data: values,
          resolve: () => { resetForm(); resolve(); },
          reject
        }));
      } else {
        // TODO
        // Object.assign(action, {type: UPDATE_TODO.REQUEST, id: values.id});
        // this.props.dispatch(action);
      }
    });
  }

  render() {
    const { fields: {id, title, due_date, color, marked}, handleSubmit, submitting } = this.props
    return(
      <form onSubmit={handleSubmit(values => this._handleSubmit.bind(this)(values))} >
        <div>
          <input
            ref="titleInput"
            className={"new-todo" + (title.error ? " error" : "")}
            placeholder={title.error || "What needs to be done?"}
            disabled={submitting}
            {...title}
          />
        </div>
      </form>
    )
  }
}
