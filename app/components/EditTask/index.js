import React, { Component } from 'react'
import moment from 'moment'

import {
  Text,
  View,
  DatePickerIOS
} from 'react-native'

import ExpandableCell from '../ExpandableCell'
import styles from './styles'

export default class EditTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date()
    }
  }

  _onDateChange(date) {
    this.setState({
      date,
      expanded : true,
      formatedDate: this._formatDate(date)
    })
  }

  _formatDate(date) {
    return moment(date).format('lll')
  }

  _getComponentDimensions(event) {
    console.log(event.nativeEvent.layout)
  }

  render() {
    const noDueDateTitle = "Set Reminder"
    const dueDateSetTitle = "Due on " + this.state.formatedDate
    return (
      <View style={ styles.editTaskContainer }>
        <ExpandableCell title={ this.state.dateSelected ? dueDateSetTitle : noDueDateTitle }>
          <DatePickerIOS
            date={ this.state.date }
            onDateChange={date => this._onDateChange(date)}
            onLayout={event => this._getComponentDimensions(event)}
            style={ styles.datePicker }
          />
        </ExpandableCell>
      </View>
    )
  }
}