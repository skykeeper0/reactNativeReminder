import React, { Component } from 'react'

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
      date
    })
  }

  render() {
    return (
      <View style={ styles.editTaskContainer }>
        <ExpandableCell title={ 'Due on' }>
          <DatePickerIOS
            date={ this.state.date }
            onDateChange={date => this._onDateChange(date)}
            style={ styles.datePicker }
          />
        </ExpandableCell>
      </View>
    )
  }
}