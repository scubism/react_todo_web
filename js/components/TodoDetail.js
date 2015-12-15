import React, { Component, PropTypes } from 'react'
import moment from 'moment'

class TodoDetail extends Component {
  render() {
    let {viewingTodo} = this.props;
    if (viewingTodo) {
      const todoColor = {
        color: viewingTodo.color
      }
      return (
        <div className="todo-detail">
          <p>Viewing:</p>
          <p style={todoColor}> {viewingTodo.title} - {viewingTodo.due_date > 0 && moment.unix(viewingTodo.due_date).format('L')} ({viewingTodo.id}) </p>
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
