import React, { Component } from 'react'
import moment from 'moment'

import {
  Button,
  Text,
  View,
  DatePickerIOS,
  TextInput,
  Switch
} from 'react-native'

import ExpandableCell from '../ExpandableCell'
import styles from './styles'

export default class EditTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      expanded: false,
      formatedDate: 1,
      text: this.props.text,
      completed: this.props.completed
    }
  }

  _onDateChange(date) {
    this.setState({
      date,
      expanded : true,
      formatedDate: this._formatDate(date),
      dateSelected: true,
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

  _onTextChange(text) {
    this.setState({
      text
    })
  }
s
  _onTextSubmit() {
    this.props.changeText(this.state.text)
    this.setState({
      text: ''
    })
  }

  _onSwitch() {
    this.props.changeCompleted()
    this.setState({
      completed: !this.state.completed
    })
  }

  render() {
    console.log(this.props.text)
    const noDueDateTitle = "Set Reminder"
    const dueDateSetTitle = "Due on " + this.state.formatedDate
    return (
      <View style={ styles.editTaskContainer }>
        <View >
          <TextInput 
            autoCorrect={false}
            style={ styles.textInput }
            onChangeText={text => this._onTextChange(text)}
            onSubmitEditing={() => this._onTextSubmit()}
            value={this.state.text}
          />
        </View>

        <View>
          <Switch
            onValueChange={() => this._onSwitch()}
            value={this.state.completed}
          />
        </View>

        <View
          style={ [
            styles.expandableCellContainer,
            { maxHeight: this.state.expanded ? this.state.datePickerHeight : 40}
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