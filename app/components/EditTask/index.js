import React, { Component, PropTypes} from 'react'
import moment from 'moment'

import {
  Button,
  Text,
  View,
  DatePickerIOS,
  Switch,
  TextInput
} from 'react-native'

import ExpandableCell from '../ExpandableCell'
import styles from './styles'

export default class EditTask extends Component {
  // checking type of passed props
  static propTypes = {
    completed: PropTypes.bool.isRequired,
    due: PropTypes.string.isRequired,
    formattedDate: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    changeTaskCompletionStatus: PropTypes.func.isRequired,
    changeTaskDueDate: PropTypes.func.isRequired,
    changeTaskName: PropTypes.func.isRequired,
    clearTaskDueDate: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    console.log(this.props.formattedDate)

    this.state = {
      completed: this.props.completed,
      date: new Date(),
      expanded: false,
      formattedDate: 0
    }
  }

  _onDateChange(date) {
    this.setState({
      date,
      expanded : true,
      formattedDate: this._formatDate(date),
      dateSelected: true,
    })
    this.props.changeTaskDueDate(date, this._formatDate(date));
  }

  _formatDate(date) {
    return moment(date).format('lll')
  }

  _clearDate() {
    this.setState({
      dateSelected: false
    })
    this.props.clearTaskDueDate();
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

  // change the text value state by changing text
  _changeTextInputValue(text) {
    this.setState({
      text
    })
    this.props.changeTaskName(text);
  }

  _onSwitchToggle(completed){
    this.setState({
      completed
    })
    this.props.changeTaskCompletionStatus(completed);
  }

  render() {
    const noDueDateTitle = "Set Reminder"
    const dueDateSetTitle = "Due on " + this.state.formattedDate || this.props.formattedDate
    return (
      <View style={ styles.editTaskContainer }>
        <View>
          <TextInput
            autoCorrect= { false }
            onChangeText = { text => this._changeTextInputValue(text)}
            returnKeyType = { 'done' }
            style = { styles.textInput }
            value = { this.state.text }
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

        <View style={ styles.switchContainer }>
          <Text style={ styles.switchText }>Completed</Text>
          <Switch
            onValueChange={value => this._onSwitchToggle(value)}
            value={ this.state.completed }
          />
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