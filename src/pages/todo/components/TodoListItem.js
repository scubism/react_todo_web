import React from 'react';
import { Link } from 'react-router'

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isEditing: false}
  }
  
  componentDidUpdate() {
    this.refs.textbox.focus()
  }
  _showInput() {
    this.setState({isEditing: true})
  }

  _hideInput() {
    this.setState({isEditing: false})
  }

  render() {
    const { todo } = this.props;
    const { isEditing } = this.state;
    const style = {
      label: {display: !isEditing ? 'block' : 'none'},
      textbox: {display: isEditing ? 'block' : 'none'},
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
