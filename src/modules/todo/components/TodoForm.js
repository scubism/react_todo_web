import React from 'react'
import { provideHooks } from 'redial'
import { reduxForm } from 'redux-form'
import autobind from 'autobind-decorator'
import Loader from 'react-loaders'
import moment from 'moment'
import DayPicker, { DateUtils } from 'react-day-picker'
import { CompactPicker } from 'react-color';
import { updateTodo } from '../actions';

// Library styling
if (process.env.BROWSER) {
  require("react-day-picker/lib/style.css")
}

const fields = [
  'id',
  'title',
  'due_date',
  'color',
  'marked',
]

const validate = values => {
  const errors = {}
  if (values.title == "") {
    errors.title = 'Required'
  }
  return errors
}
@autobind
class _TodoForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showDueDateSelector: false,
      showColorSelector: false,
    }
  }

  _handleSubmit(values) {
    return new Promise((resolve, reject) => {
      this.props.dispatch(this._submitAction(values, resolve, reject));
    });
  }

  _handleDay(event, data) {
    let { fields: {due_date} } = this.props
    due_date.onChange(data && data.getTime()/1000 || 0);

    this.setState({"showDueDateSelector": false});
  }

  _handleColor(data) {
    let { fields: {color} } = this.props
    color.onChange(data && data.hex || "");

    this.setState({"showColorSelector": false});
  }

  render() {
    const { fields: {id, title, due_date, color, marked}, values, handleSubmit, error } = this.props;
    return(
      <form
        className="todo-form"
        onSubmit={handleSubmit(values => this._handleSubmit(values))}
        >
        <table>
          <tbody>
            <tr>
              <td className="label">Title:</td>
              <td className={title.touched && (title.error && " has-error" || " has-success")}>
                <span className="error">{title.error}</span>
                <input
                  className="form-control"
                  type="text"
                  autoFocus="true"
                  {...title}
                  />
              </td>
            </tr>
            <tr>
              <td className="label">Due Date:</td>
              <td>
                <div style={{display: !this.state.showDueDateSelector ? "block" : "none"}}>
                  <span className="due-date-value"
                    onClick={(() => {this.setState({"showDueDateSelector": true});}).bind(this)}
                    >
                    {due_date.value ? moment.unix(due_date.value).format('YYYY-MM-DD') : '####-##-##'}
                  </span>
                </div>
                <div style={{display: this.state.showDueDateSelector ? "block" : "none"}}>
                  <span
                    className="value-clear"
                    onClick={((e) => {this._handleDay(e, 0);})}
                    >[x]</span>
                  <DayPicker
                    style={{display: this.state.showDueDateSelector ? "block" : "none"}}
                    {...due_date}
                    modifiers={{
                      selected: day => DateUtils.isSameDay(moment.unix(due_date.value ? due_date.value : Date.now()/1000 ).toDate(), day)
                    }}
                    initialMonth={ moment.unix(due_date.value ? due_date.value : Date.now()/1000).toDate() }
                    onDayClick={ this._handleDay}
                    />
                </div>
              </td>
            </tr>
            <tr>
              <td className="label">Color:</td>
              <td>
                <div style={{display: !this.state.showColorSelector ? "block" : "none"}}>
                  <div className="color-value" style={{background: color.value}}
                    onClick={(() => {this.setState({"showColorSelector": true});})}
                    >
                  </div>
                </div>
                <div style={{display: this.state.showColorSelector ? "block" : "none"}}>
                  <span
                    className="value-clear"
                    onClick={((e) => {this._handleColor("");})}
                    >[x]</span>
                  <CompactPicker
                    {...color}
                    color={ color.value ? color.value : '#000000' }
                    onChange={this._handleColor}
                    />
                </div>
              </td>
            </tr>
            <tr>
              <td className="label">Marked:</td>
              <td>
                <input
                  className="marked-input"
                  {...marked}
                  id="marked"
                  type="checkbox"
                  checked={ (marked.value == 1) ? 'checked' : '' }
                  />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="form-footer">
          <button type="submit">Submit</button>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    )
  }
}

@reduxForm({
  form: 'TodoUpdateForm',
  fields,
  validate
},
state => ({
  initialValues: state.todo.viewedTodo,
}))
export class TodoUpdateForm extends _TodoForm {
  _submitAction(values, resolve, reject) {
    const { resetForm, dispatch, history } = this.props;
    return updateTodo({
      id: values.id,
      data: Object.assign({}, values, {marked: values.marked ? 1 : 0}),
      resolve: () => {
        history.length > 2 ? history.goBack() : history.pushState(null, '/todos');
        resolve();
      },
      reject
    });
  }
}
