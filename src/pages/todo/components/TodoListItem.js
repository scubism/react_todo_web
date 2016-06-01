import React from 'react';
import { Link } from 'react-router'

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hidden: true}
  }
  
  componentDidUpdate() {
    this.refs.textbox.focus()
  }
  _showInput() {
    this.setState({hidden: false})
  }

  _hideInput() {
    this.setState({hidden: true})
  }

  render() {
    const { todo } = this.props;
    const { hidden } = this.state;
    const style = {
      label: {display: !hidden ? 'none' : 'block'},
      textbox: {display: hidden ? 'none' : 'block'},
    }
    return (
      <div>
        <label style={style.label} onClick={this._showInput.bind(this)}>{todo.title} <Link to={"/todos/" + todo.id}> >> </Link></label>
        <input ref='textbox' type="text" style={style.textbox} value={todo.title} onBlur={this._hideInput.bind(this)} />
      </div>
    );
  }
}

export default TodoListItem;
