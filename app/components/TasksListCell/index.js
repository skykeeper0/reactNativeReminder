import React, { Component, PropTypes } from 'react'

import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native';

import styles from './styles';

export default class TasksListCell extends Component {
  static PropTypes = {
    completed: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    onLongPress: PropTypes.func.isRequired,
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    formattedDate: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

  }

  _getDueDate() {
    if (this.props.formattedDate && !this.props.completed) {
      return 'Due ' + this.props.formattedDate
    }

    return ''
  }

  render() {
    const completed = this.props.completed? 'line-through' : 'none'
    return (
      <View style={styles.tasksListCellContainer}>
        <TouchableHighlight
          onPress={()=> this.props.onPress()}
          onLongPress={() => this.props.onLongPress()}
          underlayColor={'#D5DBDE'}
        >
          <View style={styles.tasksListCellTextRow}>
            <Text 
              style={[
                      styles.taskNameText,
                      {textDecorationLine: completed}
                    ]}
            >{this.props.text}</Text>
            <Text style={styles.dueDateText}>{this._getDueDate()}</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}