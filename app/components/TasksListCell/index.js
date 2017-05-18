import React, { Component } from 'react'

import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native'

export default class TasksListCell extends Component {
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