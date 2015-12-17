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
        right: 'initial',
        bottom: 'initial',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px',
        minWidth: '200px',
        maxWidth: '90%',
        maxHeight: '80%'
      }
    }

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
      super(props, context)

      let { isOpen, element } = this.props

      this.state = { modalIsOpen: isOpen }
      Modal.setAppElement(element)
    }

    openModal() {
      this.setState({modalIsOpen: true})
    }

    handleModalCloseRequest() {
      this.setState({modalIsOpen: false})
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.isOpen !== this.state.modalIsOpen) {
        this.setState({modalIsOpen: this.props.isOpen})
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      return (
        nextProps.todo !== this.props.todo ||
        nextState !== this.state
      )
    }

    render() {
      let { content } = this.props

      return <div>
        <Modal
          closeTimeoutMS={150}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.handleModalCloseRequest.bind(this)}
          style={ModalWidget.modalStyle}>
          <div
            className="modal-header">
            <button
              className="close-btn"
              onClick={this.handleModalCloseRequest.bind(this)}>
              X
            </button>
          </div>
          <div
            className="modal-body">
            {content}
          </div>
        </Modal>
      </div>
    }
}

export default ModalWidget
