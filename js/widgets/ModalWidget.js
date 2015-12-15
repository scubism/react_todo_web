import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'

export class ModalWidget extends Component {

    static modalStyle = {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
      },
      content: {
        position: 'absolute',
        top: '40px',
        left: '40px',
        right: '40px',
        bottom: '40px',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px',
        width: '500px',
        height: '500px'
      }
    };

    static propTypes = {
      content: PropTypes.string,
      isOpen: PropTypes.bool,
      element: PropTypes.string
    }

    static defaultProps = {
      content: '',
      isOpen: false,
      element: '#modal'
    }

    constructor(props, context) {
      super(props, context);

      let { isOpen, element } = this.props

      this.state = { modalIsOpen: isOpen }
      Modal.setAppElement(element);
    }

    openModal() {
      this.setState({modalIsOpen: true});
    }

    closeModal() {
      this.setState({modalIsOpen: false});
    }

    handleModalCloseRequest() {
      this.setState({modalIsOpen: false});
    }

    render() {
      let { content } = this.props
      return (
        <div>
          <Modal
            closeTimeoutMS={150}
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.handleModalCloseRequest.bind(this)}
            style={ModalWidget.modalStyle}>
            <div>{content}</div>
          </Modal>
        </div>
      );
    }
}

export default ModalWidget;
