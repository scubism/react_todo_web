import React, { Component, PropTypes }  from 'react'
import classNames from 'classnames'

const NODE_WIDTH = 18
const NODE_MARGIN = 5
const NUM_ROW = 2
const DEFAULT_COLOR = '#C0C0C0'

export class SelectedColorInput extends Component {
  render() {
    let {mainClass, selectedColor} = this.props
    let colorInputClass = classNames(mainClass, {
      icon: true
    })
    let inputStyle = {
      backgroundColor: selectedColor
    }

    return <div
      className="selected-color"
      onClick={this.props.onClick}>
      <span
        className={colorInputClass}
        title={selectedColor}
        style={inputStyle}
        tabIndex="0"
        role="button">
      </span>
    </div>
  }
}

export class ColorDrawer extends Component {
  _onClick(color) {
    this.props.onColorClick(color)
  }

  render() {
    let {mainClass, selectedColor, colors} = this.props
    let colorDrawerClass = classNames(mainClass, {
      picker: true,
      fontawesome: true
    })
    let colorDrawerStyle = {
      width: Math.round(colors.length / NUM_ROW * (NODE_WIDTH + NODE_MARGIN)),
      display: 'inline'
    }

    return <span
      className={colorDrawerClass}
      style={colorDrawerStyle}>
      <div>
        {
          colors.map(function(color, i) {
            return (
              <span
                className="color"
                title={color}
                style={{backgroundColor: color}}
                tabIndex="0"
                role="button"
                key={i}
                onClick={this._onClick.bind(this, color)}>
              </span>
            )
          }, this)
        }
      </div>
    </span>
  }
}

export class SimpleColorPicker extends Component {

  static propTypes = {
    colors: PropTypes.array.isRequired,
    mainClass: PropTypes.string,
    selectedColor: PropTypes.string
  }

  static defaultProps = {
    colors: [
      DEFAULT_COLOR,
      '#ac725e',
      '#d06b64',
      '#f83a22',
      '#fa573c',
      '#ff7537',
      '#ffad46',
      '#42d692',
      '#16a765',
      '#7bd148',
      '#b3dc6c',
      '#fbe983',
      '#fad165',
      '#92e1c0',
      '#9fe1e7',
      '#9fc6e7',
      '#4986e7',
      '#9a9cff',
      '#b99aff',
      '#cabdbf',
      '#cca6ac',
      '#f691b2',
      '#cd74e6',
      '#a47ae2',
      '#72bcde',
      '#ffffff'
    ],
    mainClass: 'simplecolorpicker',
    selectedColor: DEFAULT_COLOR
  }

  constructor(props, context) {
    super(props, context)

    this.state = {
      displayDrawer: false,
      selectedColor: this.props.selectedColor
    }
  }

  _displayDrawer() {
    this.setState({displayDrawer: !this.state.displayDrawer})
  }

  _selectColor(color) {
    this.setState({
      selectedColor: color,
      displayDrawer: false
    }, this.props.onChange(color))
  }

  render() {
    let {mainClass, colors, selectedColor} = this.props

    return <div className="simplecolorpicker-wrapper">
      <SelectedColorInput
        mainClass={mainClass}
        selectedColor={selectedColor}
        onClick={this._displayDrawer.bind(this)}/>
      {
        this.state.displayDrawer &&
        <ColorDrawer
          mainClass={mainClass}
          colors={colors}
          onColorClick={this._selectColor.bind(this)}/>
      }
    </div>
  }
}

export default SimpleColorPicker
