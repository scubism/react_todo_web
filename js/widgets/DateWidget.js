import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import DayPicker, { DateUtils } from 'react-day-picker'

export const MONGO_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSSSZ'

export default class DateWidget extends Component {

  static propTypes = {
    inputValue: React.PropTypes.string,
    callback: React.PropTypes.func
  }

  static defaultProps = {
    inputValue: ''
  }

 constructor(props, context) {
    super(props, context);

    let selectedDate = this.props.inputValue ? moment(this.props.inputValue) : moment()
    let selectedMonth = moment(this.props.inputValue, MONGO_DATE_FORMAT).toDate()

    this.state = {
      value: selectedDate.format(MONGO_DATE_FORMAT),
      month: selectedMonth,
      calendar_display: false
    }
  }

  _calendarIconClick() {
    this.setState({calendar_display: true})
  }

  handleDayClick(e, day) {
    this.setState({
      value: moment(day).format(MONGO_DATE_FORMAT),
      month: day,
      calendar_display: false
    })
  }

  showCurrentDate() {
    this.refs.daypicker.showMonth(this.state.month)
  }

  render() {
    const selectedDay = moment(this.state.value, MONGO_DATE_FORMAT, true).toDate()
    return (
      <div className="datePicker-wrapper">
        <i
          className="fa fa-calendar-check-o datePicker-icon"
          onClick={this._calendarIconClick.bind(this)}>
        </i>
        <input
          type="hidden"
          value={ this.state.value }
          onChange={ this.props.setSelectedDate(this.state.value) }/>
        {
          this.state.calendar_display &&
          <DayPicker
            className="datePicker"
            ref="daypicker"
            initialMonth={this.state.month}
            modifiers={{
              selected: day => DateUtils.isSameDay(selectedDay, day)
            }}
            onDayClick={this.handleDayClick.bind(this)} />
        }
      </div>
    );
  }

}
