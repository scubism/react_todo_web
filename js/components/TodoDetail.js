import React, { Component, PropTypes } from 'react'

class TodoDetail extends Component {
  render() {
    let {viewingTodo} = this.props;
    if (viewingTodo) {
      return (
        <div className="todo-detail">
          Viewing: {viewingTodo.title} ({viewingTodo.id})
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
