import React from 'react'
import autobind from 'autobind-decorator'
import { reduxForm } from 'redux-form'
import { createTodo, updateTodo, focusTodo } from '../actions'

const fields = [
  'id',
  'title',
  'due_date',
  'color',
  'marked',
]
@autobind
class _TodoInlineForm extends React.Component {

  componentDidMount() {
    this.refs.titleInput.focus();
  }

  _handleSubmit(values) {
    return new Promise((resolve, reject) => {
      if (!values.title) {
        reject({title: 'Please input a title.', _error: "Submit validation failed."});
        return;
      }
      this.props.dispatch(this._submitAction(
        values,
        resolve,
        (e) => { alert(e); reject();}));
    });
  }

  render() {
    const { fields: {id, title, due_date, color, marked}, handleSubmit, submitting } = this.props
    return(
      <form className="todo-inline-form"
        onSubmit={handleSubmit(values => this._handleSubmit(values))}
        onBlur={this._onBlur}
        >
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
export class TodoInlineCreateForm extends _TodoInlineForm {
  _submitAction(values, resolve, reject) {
    const { resetForm } = this.props;
    const titleInput = this.refs.titleInput;
    return createTodo({
      data: values,
      resolve: () => { resetForm(); titleInput.focus(); resolve(); },
      reject
    });
  }

  _onBlur() {}
}


@reduxForm({
  form: 'TodoInlineUpdateForm',
  fields
})
@autobind
export class TodoInlineUpdateForm extends _TodoInlineForm {
  _submitAction(values, resolve, reject) {
    const { resetForm, dispatch } = this.props;
    return updateTodo({
      id: values.id,
      data: values,
      resolve: () => { resetForm(); dispatch(focusTodo(null)); resolve(); },
      reject
    });
  }
  _onBlur() {
    const { dispatch } = this.props;
    dispatch(focusTodo(null));
  }
}
