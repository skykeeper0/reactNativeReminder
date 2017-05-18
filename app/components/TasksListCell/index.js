import React, { Component, PropTypes } from 'react'

import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native'

export default class TasksListCell extends Component {
  static PropTypes = {
    completed: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    onLongPress: PropTypes.func.isRequired,
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)

  }

  render() {
    const completed = this.props.completed? 'line-through' : 'none'
    const styles = StyleSheet.create({
      text: {
        textDecorationLine: completed,
        backgroundColor: '#ffebcd'
      }
    })
    return (
      <View>
        <TouchableHighlight
          onPress={()=> this.props.onPress()}
          onLongPress={() => this.props.onLongPress()}
          underlayColor={'#D5DBDE'}
        >
          <Text style={styles.text}>{this.props.text}</Text>
        </TouchableHighlight>
      </View>
    )
  }
}