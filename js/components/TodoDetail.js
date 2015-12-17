import React, { Component, PropTypes } from 'react'
import moment from 'moment'

class TodoDetail extends Component {
  render() {
    let {viewingTodo} = this.props;
    if (viewingTodo) {
      return (
        <div className="todo-detail">
          <p>Viewing:</p>
          <p> {viewingTodo.title} - {moment(viewingTodo.due_date).format('L')} ({viewingTodo.id}) </p>
        </div>
      );
    }
    return false;
  }
}

TodoDetail.propTypes = {
  viewingTodo: PropTypes.any,
}

export default TodoDetail;
