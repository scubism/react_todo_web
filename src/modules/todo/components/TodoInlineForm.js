import React from 'react'
import { reduxForm } from 'redux-form'
import { createTodo } from '../actions'

const fields = [
  'id',
  'title',
  'due_date',
  'color',
  'marked',
]

class _TodoInlineForm extends React.Component {

  componentDidMount() {
    this.refs.titleInput.focus();
  }

  _handleSubmit(values) {
    const { resetForm } = this.props;
    const titleInput = this.refs.titleInput;

    return new Promise((resolve, reject) => {
      if (!values.title) {
        reject({title: 'Please input a title.', _error: "Submit validation failed."});
        return;
      }

      if (!values.id) {
        this.props.dispatch(createTodo({
          data: values,
          resolve: () => { resetForm(); titleInput.focus(); resolve(); },
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
      <form onSubmit={handleSubmit(values => this._handleSubmit.bind(this)(values))}
            onBlur={() => {console.log("todo")}}>
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

@reduxForm({
  form: 'TodoInlineCreateForm',
  fields
})
export class TodoInlineCreateForm extends _TodoInlineForm {}


@reduxForm({
  form: 'TodoInlineUpdateForm',
  fields
})
export class TodoInlineUpdateForm extends _TodoInlineForm {}
