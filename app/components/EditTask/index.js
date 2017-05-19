import React, { Component } from 'react'
import moment from 'moment'

import {
  Button,
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
      date: new Date(),
      expanded: false
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

  _clearDate() {
    this.setState({
      dateSelected: false
    })
  }

  _getDatePickerHeight(event) {
    this.setState({
      datePickerHeight: event.nativeEvent.layout.width
    })
  }

  _onExpand() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render() {
    const noDueDateTitle = "Set Reminder"
    const dueDateSetTitle = "Due on " + this.state.formatedDate
    return (
      <View style={ styles.editTaskContainer }>

        <View
          style={ [
            styles.expandableCellContainer,
            { maxHeight: this.state.expanded? this.state.datePickerHeight : 40}
          ]}
        >
          <ExpandableCell
            title={ this.state.dateSelected ? dueDateSetTitle : noDueDateTitle }
            expanded={ this.state.expanded }
            onPress={ () => this._onExpand()}
          >
            <DatePickerIOS
              date={ this.state.date }
              onDateChange={date => this._onDateChange(date)}
              onLayout={event => this._getDatePickerHeight(event)}
              style={ styles.datePicker }
            />
          </ExpandableCell>
        </View>

        <View style={styles.clearDateButtonContainer} >
          <Button
            color={ '#B44743' }
            disabled={ this.state.dateSelected ? false : true }
            onPress={ () => this._clearDate()}
            title={ 'Clear Date' }
          />
        </View>
      </View>
    )
  }
}