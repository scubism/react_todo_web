import React from 'react';

class TodoDetail extends React.Component {

  render() {
    const { todo } = this.props;
    return (
      <div className="todo-detail">
        TODO
      </div>
    );
  }
}

export default TodoDetail;
